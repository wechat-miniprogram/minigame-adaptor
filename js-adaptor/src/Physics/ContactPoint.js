import { engineColliderToAdaptorColliderMap } from '../Physics/Physx.js';

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";
    Bridge.define("MiniGameAdaptor.ContactPoint", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new MiniGameAdaptor.ContactPoint(); }
            }
        },
        props: {
            normal: {
                get: function () {
                    return this._normal;
                }
            },
            otherCollider: {
                get: function () {
                    return engineColliderToAdaptorColliderMap.get(this.nativeData.otherCollider);
                }
            },
            point: {
                get: function () {
                    return this._point;
                }
            },
            separation: {
                get: function () {
                    return this.nativeData.separation;
                }
            },
            thisCollider: {
                get: function () {
                    return engineColliderToAdaptorColliderMap.get(this.nativeData.thisCollider);
                }
            }
        },
        ctors: {
            ctor: function (nativeData) {
                this.$initialize();

                this.nativeData = nativeData || {};

                const _point = this.nativeData.point;
                this._point = new MiniGameAdaptor.Vector3.$ctor2(_point.x, _point.y, _point.z)._FlipX();

                const _normal = this.nativeData.normal;
                this._normal = new MiniGameAdaptor.Vector3.$ctor2(_normal.x, _normal.y, _normal.z)._FlipX();
            }
        },
        methods: {
            $clone: function (to) { return this; }
        }
    });
});
