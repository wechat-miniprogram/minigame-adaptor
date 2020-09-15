import {physx, Phys3D, bindEventForCollider, nativeColliderToAdaptorColliderMap} from './Physx';

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";
    Bridge.define("MiniGameAdaptor.Collision", {
        props: {
            collider: {
                get: function () {
                    return nativeColliderToAdaptorColliderMap.get(this._collider);
                }
            },
            contactCount: {
                get: function () {
                    return this._contactCount;
                }
            },
            contacts: {
                get: function () {
                    return this._contacts;
                }
            },
            gameObject: {
                get: function () {
                    return this._gameObject;
                }
            },
            impulse: {
                get: function () {
                    return new MiniGameAdaptor.Vector3.$ctor3(this._nativeData.impulse)._FlipX();
                }
            },
            relativeVelocity: {
                get: function () {
                    return new MiniGameAdaptor.Vector3.$ctor3(this._nativeData.relative_velocity)._FlipX();
                }
            },
            rigidbody: {
                get: function () {
                    return nativeColliderToAdaptorColliderMap.get(this._collider).attachedRigidbody || null;
                }
            },
            transform: {
                get: function () {
                    return this._gameObject.transform;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            },

            // 通过native创建一个Collision
            $ctor1: function (nativeData) {
                this._nativeData = nativeData;

                this._collider = nativeData.collider;

                this._gameObject = this._collider.userData;

                this._contactCount = nativeData.contacts && this._nativeData.contacts.length || 0;

                this._contacts = nativeData.contacts.map(item => {
                    return new MiniGameAdaptor.ContactPoint.ctor(item);
                });
            }
        },
        methods: {
            GetContact: function (index) {
                return this._contacts[index];
            },
            GetContacts: function (contacts) {
                throw new System.Exception("not impl");
            },
            GetEnumerator: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});

