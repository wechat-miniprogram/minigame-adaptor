let Phys3D;
import {onRootMonoBehaviourUpdate} from '../Extend/RootMonoBehaviour'

try {
    if (typeof NativeGlobal !== 'undefined' && NativeGlobal.Phys3D) {
        Phys3D = NativeGlobal.Phys3D;
    } else if (__global && __global.require &&  __global.require('physicsEngine')) {
        Phys3D = __global.require('physicsEngine').Phys3D;
    }
    console.log('Phys3D', Phys3D)
} catch(e) {
    console.log('load Phys3D error', e)
}

class Physx {
    constructor() {
        try {
            if (!Phys3D) {
                console.error('当前环境不支持原生物理引擎，某些组件表现可能不符合预期')
                return;
            }

            if (window.physicsConfig) {
                console.log('当前已开启pvd调试模式：', window.physicsConfig)
            }

            this.Phys3dInstance = new Phys3D.PhysSystem(window.physicsConfig);

            console.log('Phys3dInstance', this.Phys3dInstance)
        } catch(e) {
            console.log(e)
        }

        this.rigidbodies = [];

        this.requestId = null;
        this.loopFunc = this.loop.bind(this)

        this.vec = new engine.Vector3();
    }

    addBody(body) {
        this.rigidbodies.push(body)
    }

    addStaticBodyForCollider(comp) {
        const entity = comp.entity;
        const pos = entity.transform.worldPosition;

        comp.rigidBody = new Phys3D.StaticRigidbody(physx.Phys3dInstance);
        comp.rigidBody.position = new Phys3D.RawVec3f(pos.x, pos.y, pos.z);
        comp.rigidBody.__sourceComp = comp;

        comp.nativeCollider.attachedRigidbody = comp.rigidBody;
        comp.gameObject.nativeRigidBody = comp.rigidBody;

        const quaternion = entity.transform.worldQuaternion;
        const RawQuaternion = new Phys3D.RawQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w)

        comp.rigidBody.rotation = RawQuaternion;
    }

    /**
     * 不管是刚体初始化还是后续通过API手动改变刚体的旋转，都需要将旋转结果同步到物理引擎
     */
    syncRotation(entity, body) {
        const quaternion = entity.transform.worldQuaternion;

        body.rotation = new Phys3D.RawQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    }

    /**
     * 不管是刚体初始化还是后续通过API手动改变刚体的旋转，都需要将位置同步到物理引擎
     */
    syncPosition(entity, body) {
        const pos = entity.transform.worldPosition;
        body.position = new Phys3D.RawVec3f(pos.x, pos.y, pos.z);
    }

    setEntityPosition(entity, pos) {
        const tran = entity.transform;
        let m;
        if (tran.parent) {
            m = tran.parent.worldMatrix.inverse();
        } else {
            m = tran.worldMatrix.inverse();
        }

        this.vec.x = pos.x;
        this.vec.y = pos.y;
        this.vec.z = pos.z;

        m.transformPoint(this.vec, tran.position);
    }

    simulate(dt) {
        let start = new Date();
        this.Phys3dInstance.Simulate(dt);
        const sim = new Date() - start;

        if (sim> 4) {
            console.warn('simulate update cost  for a long time: ', sim)
        }

        start = new Date();
        const len = this.rigidbodies.length;

        for (let i = 0; i < this.rigidbodies.length; i++ ) {
            const body = this.rigidbodies[i];
            const comp = body.__sourceComp;
            const entity = comp.entity;
            const pos = body.position;
            const rotation = body.rotation;

            if (entity) {
                // 如果实体销毁了，去除刚体引用，随GC自动释放
                if (entity.isDestroyed) {
                    console.log('entity isDestroyed')
                    this.rigidbodies.splice(i, 1);
                    i--;
                } else {
                    /**
                     * 物理引擎的适配要特别注意坐标系的换算
                     * 微信引擎和physx都是右手坐标系，而adaptor(Unity)是左手坐标系
                     * 如果需要从adaptor向physx设置坐标，有两种情况:
                     * 一种是直接取entity的坐标，因为坐标系一致，直接透传
                     * 一种是取adaptor的坐标，坐标系要取反，即x取反，如果是旋转的情况，x/w都要取反(从physx到adaptor同理）
                     *
                     * 为了可维护性，约定采取第一种方式，entity和physx进行交互，避免不必要的坐标换算
                     * 需要特别注意的是，adaptor的每个成员方法就不可避免要进行一个坐标换算再透传给physx了，比如：
                     *
                     * const RawVec3f =  new Phys3D.RawVec3f(-x, y, z);
                     * this.nativeRigidBody.AddForce(RawVec3f, MiniGameAdaptor.ForceMode.Force)
                     */

                    this.setEntityPosition(entity, pos);

                    const q = new engine.Quaternion();
                    q.x = rotation.x;
                    q.y = rotation.y;
                    q.z = rotation.z;
                    q.w = rotation.w;

                    entity.transform.quaternion = q;
                }
            }
        }

        const render = new Date() - start;
        /*if (len > 30) {
            console.log('render update cost', render, 'rigidbody count', len, 'simulate cost', sim)
        }*/
        /*if (render > 2 ) {
            console.log('render update cost', render)
        }*/
    }

    loop(dt) {
        if (this.rigidbodies && this.rigidbodies.length && MiniGameAdaptor.Physics.autoSimulation) {
            this.simulate(dt);
        }
    }
}

const physx = new Physx();

let count = 0;

// 跟随引擎的update执行Simulate逻辑
onRootMonoBehaviourUpdate((dt) => {
    physx.loop(dt);
});

const nativeColliderToAdaptorColliderMap = new WeakMap();

function bindEventForCollider(nativeCollider, gameObject) {
    /*nativeCollider.userData = gameObject;*/

    nativeCollider.onCollisionEnter = (other) => {
        const collision = new MiniGameAdaptor.Collision.$ctor1(other);

        gameObject.BroadcastMessage$2('OnCollisionEnter', other, MiniGameAdaptor.SendMessageOptions.DontRequireReceiver, collision);
    }

    nativeCollider.onCollisionExit = (other) => {
        const collision = new MiniGameAdaptor.Collision.$ctor1(other);
        gameObject.BroadcastMessage$3('OnCollisionExit', MiniGameAdaptor.SendMessageOptions.DontRequireReceiver, collision);
    }

    nativeCollider.onCollisionStay = (other) => {
        const collision = new MiniGameAdaptor.Collision.$ctor1(other);
        gameObject.BroadcastMessage$3('OnCollisionStay', MiniGameAdaptor.SendMessageOptions.DontRequireReceiver, collision);
    }

    nativeCollider.onTriggerExit = (other) => {
        const collider = nativeColliderToAdaptorColliderMap.get(other)
        gameObject.BroadcastMessage$3('onTriggerExit', MiniGameAdaptor.SendMessageOptions.DontRequireReceiver, collider);
    }

    nativeCollider.onTriggerEnter = (other) => {
        const collider = nativeColliderToAdaptorColliderMap.get(other.collider)
        // const collider = nativeColliderToAdaptorColliderMap.get(nativeCollider)
        gameObject.BroadcastMessage$3('onTriggerEnter', MiniGameAdaptor.SendMessageOptions.DontRequireReceiver, collider);
    }
}


export {Phys3D, physx, bindEventForCollider, nativeColliderToAdaptorColliderMap};

