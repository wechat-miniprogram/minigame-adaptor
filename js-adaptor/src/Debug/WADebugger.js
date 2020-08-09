import MiniGameAdaptor from '../MiniGameAdaptor.js';
import { onRootMonoBehaviourUpdate, offRootMonoBehaviourUpdate } from '../Extend/RootMonoBehaviour.js'
class WADebugger {
    constructor() {
    }
    static log(obj) {
        Logger.log(obj);
    }
    static warn(obj) {
        Logger.warn(obj);
    }
    static printActiveObject(root, includeChildren) {
        if (!root) {
            root = game.sceneRoot.transform.children[0];
        }
        if (includeChildren) {
            root.travelChild(c => {
                if (c.entity.active) {
                    console.log(c.entity);
                }
            })
        } else {
            root.children.forEach(c => {
                if (c.entity.active) {
                    console.log(c.entity);
                }
            })
        }
    }
    static get cameraPosition() {
        return MiniGameAdaptor.Camera.main.transform.position;
    }
    static rotateCamera(x, y, z) {
        MiniGameAdaptor.Camera.main.transform.Rotate(x, y, z);
    }
    static resetCameraBirdsEye() {
        MiniGameAdaptor.Camera.main.transform.ref.euler.x = 1;
        MiniGameAdaptor.Camera.main.transform.ref.position.x = -1;
        MiniGameAdaptor.Camera.main.transform.ref.position.y = 100;
        MiniGameAdaptor.Camera.main.transform.ref.position.z = -60;
    }
    static entitiesCount() {
        let count = 0;
        game.sceneRoot.transform.travelChild(c => {
            count++;
        })
        console.log(count);
    }
    static find(name) {
        if (!name) return null;
        let e;
        game.sceneRoot.transform.travelChild(c => {
            if (c.entity.name === name) {
                e = c.entity;
                return;
            }
        });
        return e;
    }
    static findFuzzy(name) {
        if (!name) return null;
        let e;
        game.sceneRoot.transform.travelChild(c => {
            if (c.entity.name.toUpperCase().indexOf(name.toUpperCase()) >= 0) {
                e = c.entity;
                return;
            }
        });
        return e;
    }
    static printPositionAndEulerAngles(entity) {
        if (typeof(entity) == 'string') {
            entity = WADebugger.find(entity);
        }
        if (entity && entity instanceof engine.Entity) {
            return entity.name + ": (" +
            entity.transform.worldPosition.x.toFixed(2) + ", " + entity.transform.worldPosition.y.toFixed(2) + ", " + entity.transform.worldPosition.z.toFixed(2) + ")\t(" +
            entity.transform.worldEuler.x.toFixed(2) * MiniGameAdaptor.Mathf.Rad2Deg + ", " + entity.transform.worldEuler.y.toFixed(2) * MiniGameAdaptor.Mathf.Rad2Deg + ", " + entity.transform.worldEuler.z.toFixed(2) * MiniGameAdaptor.Mathf.Rad2Deg + ")";
        }

        return "entity not exists";
    }
    static cameraDebugControlToggle() {
        _cameraDebugControl = !_cameraDebugControl;
    }

}
let Logger = {
    warnings: new Set(),
    logs:    new Set(),
    warn: function(obj) {
        if (!this.warnings.has(obj)) {
            this.warnings.add(obj);
            console.warn(obj);
        }
    },
    log: function(obj) {
        if (!this.logs.has(obj)) {
            this.logs.add(obj);
            console.log(obj);
        }
    }
}
// camera debug control
let origin = new MiniGameAdaptor.Vector3();
const sensitivity = 0.001;
let _cameraDebugControl = false;
let flag = false;
onRootMonoBehaviourUpdate((dt) => {
    if (_cameraDebugControl) {
        if (MiniGameAdaptor.Input.GetMouseButtonDown(0)) {
            if (!flag) {
                flag = true;
                origin = MiniGameAdaptor.Input.mousePosition.$clone();
            }
        }
        if (flag) {
            var dir = new MiniGameAdaptor.Vector3.$ctor2(
                (origin.x - MiniGameAdaptor.Input.mousePosition.x) * sensitivity,
                (origin.y - MiniGameAdaptor.Input.mousePosition.y) * sensitivity,
                0.0);
            var camPos = MiniGameAdaptor.Camera.main.transform.position;
            MiniGameAdaptor.Camera.main.transform.position = MiniGameAdaptor.Vector3.op_Addition(camPos.$clone(), dir.$clone());
        }
        if (MiniGameAdaptor.Input.GetMouseButtonUp(0)) {
            flag = false;
        }
    }
})
window.AdaptorDebugger = WADebugger;
