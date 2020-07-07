let Phys3D;
import {onRootMonoBehaviourUpdate} from '../Extend/RootMonoBehaviour'

try {
    if (typeof NativeGlobal !== 'undefined' && NativeGlobal.Phys3D) {
        Phys3D = NativeGlobal.Phys3D;
    } else if (__global.require('physicsEngine')) {
        Phys3D = __global.require('physicsEngine').Phys3D;
    }
    console.log('Phys3D', Phys3D)
} catch(e) {
    console.log('load Phys3D error', e)
}

class Physx {
    constructor() {
        try {
            this.Phys3dInstance = new Phys3D.PhysSystem();
            console.log('Phys3dInstance', this.Phys3dInstance)
        } catch(e) {
            console.log(e)
        }

        this.rigidbodies = [];

        this.requestId = null;
        this.loopFunc = this.loop.bind(this)
    }

    addBody(body) {
        this.rigidbodies.push(body)
    }

    static delBody(body) {
        const index = this.rigidbodies.find(item => item === body)

        this.rigidbodies.splice(index, 1);
    }

    getLocalPosInEngine(pos) {
        const value = new MiniGameAdaptor.Vector3
        var m;
        if (this.ref.parent) {
            m = this.ref.parent.worldMatrix.inverse();
        } else {
            m = this.ref.worldMatrix.inverse();
        }

        var local = m.transformPoint(value._FlipX().ref);
        this.ref.position = local;

        if (!this.hasChanged) {
            this.hasChanged = true;
        }
    }

    simulate(dt) {
        let start = new Date();
        this.Phys3dInstance.Simulate(dt);
        const sim = new Date() - start;
        if (sim> 2 ) {
            console.log('simulate update cost', sim)
        }

        start = new Date();

        this.rigidbodies.forEach(body => {
            const comp = body.__sourceComp;
            const entity = comp.entity;
            const pos = body.position;
            const rotation = body.rotation;

            if (entity) {
                /*entity.transform.position.x = pos.x;
                entity.transform.position.y = pos.y;
                entity.transform.position.z = pos.z;*/

                comp.transform.position = new MiniGameAdaptor.Vector3.$ctor4(body.position)

                const q = new engine.Quaternion();
                q.x = rotation.x;
                q.y = rotation.y;
                q.z = rotation.z;
                q.w = rotation.w;

                entity.transform.quaternion = q;

                /*comp.transform.rotation = new MiniGameAdaptor.Quaternion.$ctor3(rotation)*/
            }
        })

        const render = new Date() - start;
        if (render > 2 ) {
            console.log('render update cost', render)
        }
    }

    loop(dt) {
        if (this.rigidbodies.length && MiniGameAdaptor.Physics.autoSimulation) {
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

/*setInterval(() => {
    physx.loop(30 / 1000);
}, 1000 / 30)*/

function bindEventForCollider(nativeCollider, gameObject) {
    nativeCollider.onCollisionEnter = (other) => {
        /*console.log('onCollisionEnter Collision', other)
        gameObject.BroadcastMessage('OnCollisionEnter');*/
    }

    nativeCollider.onCollisionExit = (other) => {
        /*gameObject.BroadcastMessage('OnCollisionExit');*/
    }

    nativeCollider.onCollisionStay = (other) => {
        /*gameObject.BroadcastMessage('OnCollisionStay');*/
    }

    nativeCollider.onTriggerExit= (other) => {
        /*gameObject.BroadcastMessage('onTriggerExit');*/
    }

    nativeCollider.onTriggerEnter = (other) => {
        /*gameObject.BroadcastMessage('onTriggerEnter');*/
    }
}

export {Phys3D, physx, bindEventForCollider};

