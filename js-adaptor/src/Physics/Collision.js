import { engineColliderToAdaptorColliderMap } from './Physx.js';

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";
    Bridge.define("MiniGameAdaptor.Collision", {
        props: {
            collider: {
                get: function () {
                    return this._collider;
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
                    const tmp = this._data.impulse;
                    return new MiniGameAdaptor.Vector3.$ctor2(tmp.x, tmp.y, tmp.z)._FlipX();
                }
            },
            relativeVelocity: {
                get: function () {
                    const tmp = this._data.relativeVelocity;
                    return new MiniGameAdaptor.Vector3.$ctor2(tmp.x, tmp.y, tmp.z)._FlipX();
                }
            },
            rigidbody: {
                get: function () {
                    return this._collider.attachedRigidbody || null;
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
            $ctor1: function (data) {
                this._data= data;

                this._collider = engineColliderToAdaptorColliderMap.get(data.collider);

                this._gameObject = this._collider.gameObject;

                this._contactCount = this._data.contacts && this._data.contacts.length || 0;

                this._contacts = this._data.contacts.map(item => {
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

