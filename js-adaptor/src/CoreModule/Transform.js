Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Transform", {
        inherits: [MiniGameAdaptor.Component, System.Collections.IEnumerable],
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
                }
            }
        },
        fields: {
            ref: null,
            _localPosition : null,
            _worldPosition : null,
            _localScale : null,
            _localEuler : null,
            _worldEuler : null,
            _localRotation: null,
            _worldRotation: null,
            _hasChanged : true
        },
        ctors: {
            ctor: function(transform) {
                if (transform instanceof engine.Transform3D) {
                    this.ref = transform;
                } else if (transform instanceof engine.Entity) {
                    this.ref = transform.transform;
                }
                MiniGameAdaptor.Component.ctor.call(this);


                // if (this.ref) {
                //     this._localPosition = new MiniGameAdaptor.Vector3.$ctor3(transform.position);
                //     this._worldPosition = new MiniGameAdaptor.Vector3.$ctor3(transform.worldPosition);
                //     this._localScale = new MiniGameAdaptor.Vector3.$ctor3(transform.scale);
                //     this._worldScale = new MiniGameAdaptor.Vector3.$ctor3(transform.worldScale);
                //     this._localEuler = new MiniGameAdaptor.Vector3.$ctor3(transform.euler);
                //     this._worldEuler = new MiniGameAdaptor.Vector3.$ctor3(transform.worldEuler);
                //     this._localRotation = new MiniGameAdaptor.Quaternion.$ctor2(transform.quaternion);
                //     this._worldRotation = new MiniGameAdaptor.Quaternion.$ctor2(transform.worldQuaternion);
                // }
            }
        },
        props: {
            childCount: {
                get: function () {
                    return this.ref.childrenCount;
                }
            },
            eulerAngles: {
                get: function () {
                    // this.ref.worldEuler 好像有问题
                    return new MiniGameAdaptor.Vector3.$ctor4(this.ref.euler)._Rad2Deg()._FlipX();
                },
                set: function (value) {
                    if (!value) { return; }
                    this.rotation = MiniGameAdaptor.Quaternion.Euler$1(value);

                    if (!this.hasChanged) {
                        this.hasChanged = true;
                    }
                }
            },
            forward: {
                get: function () {
                    return this.TransformDirection$1(MiniGameAdaptor.Vector3.forward);
                    // return MiniGameAdaptor.Quaternion.op_Multiply$1(this.rotation, MiniGameAdaptor.Vector3.forward).normalized;
                    // return new MiniGameAdaptor.Vector3.$ctor4(this.ref.forward)._FlipX();
                },
                set: function (value) {
                    this.rotation = MiniGameAdaptor.Quaternion.LookRotation(value);
                }
            },
            right: {
                get: function () {
                    return MiniGameAdaptor.Quaternion.op_Multiply$1(this.rotation, MiniGameAdaptor.Vector3.right).normalized;
                    // return this.TransformDirection$1(MiniGameAdaptor.Vector3.right);
                    // return new MiniGameAdaptor.Vector3.$ctor4(this.ref.right)._FlipX();
                },
                set: function (value) {
                    this.rotation = MiniGameAdaptor.Quaternion.FromToRotation(MiniGameAdaptor.Vector3.right, value);
                }
            },
            up: {
                get: function () {
                    return this.TransformDirection$1(MiniGameAdaptor.Vector3.up);
                    // return MiniGameAdaptor.Quaternion.op_Multiply$1(this.rotation, MiniGameAdaptor.Vector3.up).normalized;
                    // return new MiniGameAdaptor.Vector3.$ctor4(this.ref.up)._FlipX();
                },
                set: function (value) {
                    this.rotation = MiniGameAdaptor.Quaternion.FromToRotation(MiniGameAdaptor.Vector3.up, value);
                }
            },
            hasChanged: {
                get: function () {
                    return this._hasChanged;
                },
                set: function (value) {
                    this._hasChanged = value;
                }
            },
            hierarchyCapacity: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            hierarchyCount: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            localEulerAngles: {
                get: function () {
                    return new MiniGameAdaptor.Vector3.$ctor4(this.ref.euler)._FlipX()._Rad2Deg();
                },
                set: function (value) {
                    if (!value) { return; }
                    value = value.$clone()._Deg2Rad()._FlipX();
                    this.ref.euler = value.ref;
                    if (!this.hasChanged) {
                        this.hasChanged = true;
                    }

                }
            },
            localPosition: {
                get: function () {
                    return new MiniGameAdaptor.Vector3.$ctor4(this.ref.position)._FlipX();
                },
                set: function (value) {
                    // if (this.ref && this.ref.entity.name == "_Prefabs/Base/TRGameCamera") {
                    //     console.log(this.ref.entity.name + " ==> " + value);
                    //     if (Number.isNaN(value.x)) {
                    //         console.log('!!!');
                    //     }
                    // }
                    this.ref.position = value.$clone()._FlipX().ref;
                    if (!this.hasChanged) {
                        this.hasChanged = true;
                    }

                }
            },
            localRotation: {
                get: function () {
                    return new MiniGameAdaptor.Quaternion.$ctor3(this.ref.quaternion)._FlipXnW();
                },
                set: function (value) {
                    this.ref.quaternion = value.$clone()._FlipXnW().ref;
                    if (!this.hasChanged) {
                        this.hasChanged = true;
                    }

                }
            },
            localScale: {
                get: function () {
                    if(!this._localScale){
                        this._localScale = new MiniGameAdaptor.Vector3.$ctor3(this.ref.scale);
                    }
                    return this._localScale;
                },
                set: function (value) {
                    this.ref.scale = value.ref;
                    if (!this.hasChanged) {
                        this.hasChanged = true;
                    }
                }
            },
            localToWorldMatrix: {
                get: function () {
                    return new MiniGameAdaptor.Matrix4x4.$ctor3(this.ref.worldMatrix);
                },
                set: function() {
                    console.error("localToWorldMatrix readonly");
                }
            },
            lossyScale: {
                get: function () {
                    if(!this._worldScale){
                        this._worldScale = new MiniGameAdaptor.Vector3.$ctor3(this.ref.worldScale);
                    }
                    return this._worldScale;
                },
                set: function() {
                    console.error("lossyScale readonly");
                }
            },
            parent: {
                get: function () {
                    return MiniGameAdaptor.engineToAdaptorMap.get(this.ref.parent.entity).transform;
                },
                set: function (value) {
                    this.SetParent(value);
                }
            },
            position: {
                get: function () {
                    return new MiniGameAdaptor.Vector3.$ctor4(this.ref.worldPosition)._FlipX();
                },
                set: function (value) {
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
            },
            root: {
                get: function () {
                    let r = game.sceneRoot.transform._children[0];
                    let p = this.parent;
                    let old = this;
                    while(p.ref !== r) {
                        old = p;
                        p = p.parent;
                    }
                    return old;
                }
            },
            rotation: {
                get: function () {
                    return new MiniGameAdaptor.Quaternion.$ctor3(this.ref.worldQuaternion)._FlipXnW();
                },
                set: function (value) {
                    if (!value) { return; }
                    let local = this._worldQuaternionToLocal(value);
                    this.ref.quaternion = local._FlipXnW().ref;
                    if (!this.hasChanged) {
                        this.hasChanged = true;
                    }
                }
            },
            worldToLocalMatrix: {
                get: function () {
                    return this.localToWorldMatrix.inverse;
                },
                set: function() {
                    console.error("worldToLocalMatrix readonly");
                }
            }
        },
        methods: {
            // copied instance of worldSpaceRotation
            _worldQuaternionToLocal(worldSpaceRotation) {
                if (!worldSpaceRotation) {
                    throw new Error("_worldQuaternionToLocal parameter is nil.");
                }
                let parent = this.parent;
                if (!parent) {
                    return worldSpaceRotation.$clone();
                }
                let inverse = MiniGameAdaptor.Quaternion.Inverse(parent.rotation);
                return MiniGameAdaptor.Quaternion.op_Multiply(inverse, worldSpaceRotation);
            },
            DetachChildren: function () {
                let root = game.sceneRoot.transform._children[0];
                for (let index = 0; index < this.ref.childrenCount; index++) {
                    let t = MiniGameAdaptor.engineToAdaptorMap.get(this.ref._children[index].entity).transform;
                    t.SetParent(root);
                }
            },
            Find: function (n) {
                let result = this.ref.findChildByName(n);
                if (result) {
                    return MiniGameAdaptor.engineToAdaptorMap.get(result.entity).transform;
                }
                return null;
            },
            GetChild: function (index) {
                let go = MiniGameAdaptor.engineToAdaptorMap.get(this.ref._children[index].entity);
                if (go) {
                    return go.transform;
                }
                return null;
            },
            GetEnumerator: function () {
                throw new System.Exception("not impl");
            },
            System$Collections$IEnumerable$GetEnumerator: function () {
                throw new System.Exception("Exception");
            },
            GetSiblingIndex: function () {
                return this.ref.getSiblingIndex();
            },
            InverseTransformDirection: function (x, y, z) {
                return this.InverseTransformDirection$1(new MiniGameAdaptor.Vector3.$ctor2(x, y, z));
            },
            InverseTransformDirection$1: function (direction) {
                // let m = this.worldToLocalMatrix;
                // let dir = m.MultiplyVector(direction);
                // var scale = dir.magnitude / direction.magnitude;
                // return MiniGameAdaptor.Vector3.op_Division(dir, scale);
                let m = this.ref.worldMatrix.inverse();
                return new MiniGameAdaptor.Vector3.$ctor4(m.transformDirection(direction._FlipX().ref))._FlipX();
            },
            InverseTransformPoint: function (x, y, z) {
                return this.InverseTransformPoint$1(new MiniGameAdaptor.Vector3.$ctor2(x, y, z));
            },
            InverseTransformPoint$1: function (position) {
                // let m = this.worldToLocalMatrix;
                // return m.MultiplyPoint(position);
                let m = this.ref.worldMatrix.inverse();
                return new MiniGameAdaptor.Vector3.$ctor4(m.transformPoint(position._FlipX().ref))._FlipX();
            },
            InverseTransformVector: function (x, y, z) {
                return this.InverseTransformVector$1(new MiniGameAdaptor.Vector3.$ctor2(x, y, z));
            },
            InverseTransformVector$1: function (vector) {
                // let m = this.worldToLocalMatrix;
                // return m.MultiplyVector(vector);
                let m = this.ref.worldMatrix.inverse();
                return new MiniGameAdaptor.Vector3.$ctor4(m.transformVector(vector._FlipX().ref))._FlipX();
            },
            IsChildOf: function (parent) {
                let result = false;
                parent.ref._children.forEach(child => {
                    if (this.ref === child) {
                        result = true;
                        return;
                    }
                });
                return result;
            },
            LookAt: function (target) {
                this.LookAt$1(target, MiniGameAdaptor.Vector3.up);
            },
            LookAt$1: function (target, worldUp) {
                if (target) {
                    this.LookAt$3(target.position, worldUp);
                }
            },
            LookAt$2: function (worldPosition) {
                this.rotation = MiniGameAdaptor.Quaternion.LookRotation(MiniGameAdaptor.Vector3.op_Subtraction(worldPosition, this.position), MiniGameAdaptor.Vector3.up);
            },
            LookAt$3: function (worldPosition, worldUp) {
                this.rotation = MiniGameAdaptor.Quaternion.LookRotation(MiniGameAdaptor.Vector3.op_Subtraction(worldPosition, this.position), worldUp);
            },
            Rotate: function (xAngle, yAngle, zAngle) {
                this.Rotate$1(xAngle, yAngle, zAngle, MiniGameAdaptor.Space.Self);
            },
            Rotate$1: function (xAngle, yAngle, zAngle, relativeTo) {
                this.Rotate$5(new MiniGameAdaptor.Vector3.$ctor2(xAngle, yAngle, zAngle), relativeTo);
            },
            Rotate$2: function (eulers) {
                this.Rotate$5(eulers, MiniGameAdaptor.Space.Self);
            },
            Rotate$3: function (axis, angle) {
                this.Rotate$4(axis, angle, MiniGameAdaptor.Space.Self);
            },
            Rotate$4: function (axis, angle, relativeTo) {
                if (relativeTo === MiniGameAdaptor.Space.Self) {
                    this.__RotateAround$1(this.TransformDirection$1(axis), angle * MiniGameAdaptor.Mathf.Deg2Rad);
                } else {
                    this.__RotateAround$1(axis, angle * MiniGameAdaptor.Mathf.Deg2Rad);
                }
            },
            Rotate$5: function (eulers, relativeTo) {
                let rhs = MiniGameAdaptor.Quaternion.Euler$1(eulers);
                if (relativeTo === MiniGameAdaptor.Space.Self) {
                    this.localRotation = MiniGameAdaptor.Quaternion.op_Multiply(this.localRotation, rhs);
                } else {
                    // rotation = rotation * (Quaternion.Inverse(rotation) * eulerRot * rotation);
                    this.rotation = MiniGameAdaptor.Quaternion.op_Multiply(this.rotation,
                                        MiniGameAdaptor.Quaternion.op_Multiply(
                                            MiniGameAdaptor.Quaternion.op_Multiply(MiniGameAdaptor.Quaternion.Inverse(this.rotation), rhs),
                                                                            this.rotation));

                    // this.rotation = MiniGameAdaptor.Quaternion.op_Multiply(this.rotation, MiniGameAdaptor.Quaternion.op_Multiply(MiniGameAdaptor.Quaternion.op_Multiply(MiniGameAdaptor.Quaternion.Inverse(this.rotation), rhs), this.rotation));
                    // var tmp = MiniGameAdaptor.Quaternion.op_Multiply(MiniGameAdaptor.Quaternion.op_Multiply(MiniGameAdaptor.Quaternion.Inverse(this.rotation), rhs), this.rotation);
                    // if(!this.parent) {
                    //     this.localRotation = tmp;
                    // } else {
                    //     this.localRotation = MiniGameAdaptor.Quaternion.op_Multiply(this.parent.localRotation, this.localRotation);
                    // }
                    // this.ref.rotate(eulers.ref, true, true);
                }
            },
            RotateAround: function (point, axis, angle) {
                // MiniGameAdaptor.Debug.Log("A: " + point.ToString(10) + " " + axis.ToString(10) + " " + angle);
                let pos = this.position;
                // let pos = this.localPosition;
                let rot = MiniGameAdaptor.Quaternion.AngleAxis(angle, axis);
                // let pos = this.localPosition;

                let dir = MiniGameAdaptor.Vector3.op_Subtraction(pos, point);

                dir = MiniGameAdaptor.Quaternion.op_Multiply$1(rot, dir);
                // MiniGameAdaptor.Debug.Log("B: " + pos.ToString(10) + " " + rot.ToString(10) + " " + dir.ToString(10));
                this.position = MiniGameAdaptor.Vector3.op_Addition(point, dir);
                // MiniGameAdaptor.Debug.Log("C: " + this.position.ToString(10));
                // this.localPosition = MiniGameAdaptor.Vector3.op_Addition(point, dir);
                this.__RotateAround(rot);
            },
            __RotateAround$1: function(axis, angle) {
                let local = this.InverseTransformDirection$1(axis);
                let q = MiniGameAdaptor.Quaternion.__axisAngle2Quat(local, angle);
                this.localRotation = MiniGameAdaptor.Quaternion.Normalize(MiniGameAdaptor.Quaternion.op_Multiply(this.localRotation, q));
            },
            __RotateAround:function(rot) {
                let myRot = this.rotation;
                // let myRot = this.localRotation;
                // MiniGameAdaptor.Debug.Log("D: " + this.rotation.ToString(10));

                // Quaternion.Inverse(myRot) * rot * myRot
                let a = MiniGameAdaptor.Quaternion.Inverse(myRot);
                let b = MiniGameAdaptor.Quaternion.op_Multiply(a, rot);
                let res = MiniGameAdaptor.Quaternion.op_Multiply(b, myRot);
                // console.log("res: " + a.ToString(10) + " " + b.ToString(10) + " " + c.ToString(10));
                // let res = MiniGameAdaptor.Quaternion.op_Multiply(MiniGameAdaptor.Quaternion.op_Multiply(MiniGameAdaptor.Quaternion.Inverse(myRot), rot), myRot);
                // MiniGameAdaptor.Debug.Log("E: " + res.ToString(10));
                this.rotation = MiniGameAdaptor.Quaternion.op_Multiply(this.rotation, res);
                // this.localRotation = MiniGameAdaptor.Quaternion.op_Multiply(this.localRotation, res);
                // MiniGameAdaptor.Debug.Log("F: " + this.rotation.ToString(10));
                // this.localRotation = MiniGameAdaptor.Quaternion.op_Multiply(this.localRotation, res);
            },
            SetAsFirstSibling: function () {
                this.SetSiblingIndex(0);
            },
            SetAsLastSibling: function () {
                this.SetSiblingIndex(this.ref.parent._children.length - 1);
            },
            SetParent: function (p) {
                this.SetParent$1(p, true);
            },
            SetParent$1: function (parent, worldPositionStays) {
                // set one's parent to null means set its parent to the root
                if (parent === null) {
                    this.ref.parent.removeChild(this.ref);
                    game.sceneRoot.transform._children[0].addChild(this.ref);
                    return;
                }

                if (!worldPositionStays) {
                    this.position.x += parent.position.x;
                    this.position.y += parent.position.y;
                    this.position.z += parent.position.z;
                }
                this.ref.parent.removeChild(this.ref);
                parent.ref.addChild(this.ref);
            },
            SetPositionAndRotation: function (position, rotation) {
                // this.localPosition = position;
                // this.worldPosition = position;
                // this.rotation = rotation;
                // this.localRotation = rotation;
                this.position = position;
                this.rotation = rotation;
            },
            SetSiblingIndex: function (index) {
                this.ref.setSiblingIndex(index);
            },
            TransformDirection: function (x, y, z) {
                return this.TransformDirection$1(new MiniGameAdaptor.Vector3.$ctor2(x, y, z));
            },
            TransformDirection$1: function (direction) {
                // let m = this.localToWorldMatrix;
                // let dir = m.MultiplyVector(direction);
                // var scale = direction.magnitude !== 0 ? dir.magnitude / direction.magnitude : 0;
                // return MiniGameAdaptor.Vector3.op_Division(dir, scale);
                let m = this.ref.worldMatrix;
                return new MiniGameAdaptor.Vector3.$ctor4(m.transformDirection(direction._FlipX().ref))._FlipX();
            },
            TransformPoint: function (x, y, z) {
                return this.TransformPoint$1(new MiniGameAdaptor.Vector3.$ctor2(x, y, z));
            },
            TransformPoint$1: function (position) {
                // let m = this.localToWorldMatrix;
                let m = this.ref.worldMatrix;
                return new MiniGameAdaptor.Vector3.$ctor4(m.transformPoint(position._FlipX().ref))._FlipX();
                // return m.MultiplyPoint(position);
            },
            TransformVector: function (x, y, z) {
                return this.TransformVector$1(new MiniGameAdaptor.Vector3.$ctor2(x, y, z));
            },
            TransformVector$1: function (vector) {
                // let m = this.localToWorldMatrix;
                let m = this.ref.worldMatrix;
                return new MiniGameAdaptor.Vector3.$ctor4(m.transformVector(vector._FlipX().ref))._FlipX();
                // return m.MultiplyVector(vector);
            },
            Translate: function (x, y, z) {
                this.Translate$1(x, y, z, MiniGameAdaptor.Space.Self);
            },
            Translate$1: function (x, y, z, relativeTo) {
                this.Translate$4(new MiniGameAdaptor.Vector3.$ctor2(x, y, z), relativeTo);
            },
            Translate$2: function (x, y, z, relativeTo) {
                this.Translate$5(new MiniGameAdaptor.Vector3.$ctor2(x, y, z), relativeTo);
            },
            Translate$3: function (translation) {
                this.Translate$4(translation, MiniGameAdaptor.Space.Self);
            },
            // typeof(relativeTo) == MiniGameAdaptor.Space
            Translate$4: function (translation, relativeTo) {
                if (relativeTo === MiniGameAdaptor.Space.World) {
                    this.position = MiniGameAdaptor.Vector3.op_Addition(this.position, translation);
                } else{
                    this.position = MiniGameAdaptor.Vector3.op_Addition(this.position, this.TransformDirection$1(translation));
                    // this.localPosition = MiniGameAdaptor.Vector3.op_Addition(this.localPosition, translation);
                }
            },
            // typeof(relativeTo) == MiniGameAdaptor.Transform
            Translate$5: function (translation, relativeTo) {
                // relativeTo is null means relativeTo World
                if (!relativeTo) {
                    this.position = MiniGameAdaptor.Vector3.op_Addition(this.position, translation);
                } else {
                    this.position = MiniGameAdaptor.Vector3.op_Addition(relativeTo.position, relativeTo.TransformDirection$1(translation));
                    // this.localPosition = MiniGameAdaptor.Vector3.op_Addition(this.localPosition, translation);
                }
            },
            $clone: function (to) {
                throw new Error("Transform should not be cloned!");
                // var s = to || new MiniGameAdaptor.Transform();
                // s.x = this.x;
                // s.y = this.y;
                // s.z = this.z;
                // return s;
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.Transform')(MiniGameAdaptor.Transform);
Object.defineProperty(MiniGameAdaptor.Transform.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.Transform.prototype.__properties }
})
// MiniGameAdaptor.Transform.prototype.__properties.ref = { type: "Transform3D" };
