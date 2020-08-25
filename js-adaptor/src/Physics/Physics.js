let autoSimulation = true;

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Physics", {
        statics: {
            fields: {
                IgnoreRaycastLayer: 0,
                DefaultRaycastLayers: 0,
                AllLayers: 0
            },
            props: {
                autoSimulation: {
                    get: function () {
                        return autoSimulation;
                    },
                    set: function (value) {
                        autoSimulation = value;
                    }
                },
                autoSyncTransforms: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                bounceThreshold: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                defaultContactOffset: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                defaultPhysicsScene: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                defaultSolverIterations: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                defaultSolverVelocityIterations: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                gravity: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        // let instance = Physx.getInstance();
                        throw new System.Exception("not impl");
                    }
                },
                interCollisionDistance: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                interCollisionSettingsToggle: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                interCollisionStiffness: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                queriesHitBackfaces: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                queriesHitTriggers: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                reuseCollisionCallbacks: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                sleepThreshold: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                }
            },
            ctors: {
                init: function () {
                    this.IgnoreRaycastLayer = 4;
                    this.DefaultRaycastLayers = -5;
                    this.AllLayers = -1;
                }
            },
            methods: {
                BoxCast: function (center, halfExtents, direction) {
                    throw new System.Exception("not impl");
                },
                BoxCast$1: function (center, halfExtents, direction, orientation) {
                    throw new System.Exception("not impl");
                },
                BoxCast$2: function (center, halfExtents, direction, orientation, maxDistance) {
                    throw new System.Exception("not impl");
                },
                BoxCast$3: function (center, halfExtents, direction, orientation, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                BoxCast$4: function (center, halfExtents, direction, orientation, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                BoxCast$5: function (center, halfExtents, direction, hitInfo) {
                    throw new System.Exception("not impl");
                },
                BoxCast$6: function (center, halfExtents, direction, hitInfo, orientation) {
                    throw new System.Exception("not impl");
                },
                BoxCast$7: function (center, halfExtents, direction, hitInfo, orientation, maxDistance) {
                    throw new System.Exception("not impl");
                },
                BoxCast$8: function (center, halfExtents, direction, hitInfo, orientation, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                BoxCast$9: function (center, halfExtents, direction, hitInfo, orientation, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                BoxCastAll: function (center, halfExtents, direction) {
                    throw new System.Exception("not impl");
                },
                BoxCastAll$1: function (center, halfExtents, direction, orientation) {
                    throw new System.Exception("not impl");
                },
                BoxCastAll$2: function (center, halfExtents, direction, orientation, maxDistance) {
                    throw new System.Exception("not impl");
                },
                BoxCastAll$3: function (center, halfExtents, direction, orientation, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                BoxCastAll$4: function (center, halfExtents, direction, orientation, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                BoxCastNonAlloc: function (center, halfExtents, direction, results) {
                    throw new System.Exception("not impl");
                },
                BoxCastNonAlloc$1: function (center, halfExtents, direction, results, orientation) {
                    throw new System.Exception("not impl");
                },
                BoxCastNonAlloc$2: function (center, halfExtents, direction, results, orientation, maxDistance) {
                    throw new System.Exception("not impl");
                },
                BoxCastNonAlloc$3: function (center, halfExtents, direction, results, orientation, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                BoxCastNonAlloc$4: function (center, halfExtents, direction, results, orientation, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                CapsuleCast: function (point1, point2, radius, direction) {
                    throw new System.Exception("not impl");
                },
                CapsuleCast$1: function (point1, point2, radius, direction, maxDistance) {
                    throw new System.Exception("not impl");
                },
                CapsuleCast$2: function (point1, point2, radius, direction, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                CapsuleCast$3: function (point1, point2, radius, direction, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                CapsuleCast$4: function (point1, point2, radius, direction, hitInfo) {
                    throw new System.Exception("not impl");
                },
                CapsuleCast$5: function (point1, point2, radius, direction, hitInfo, maxDistance) {
                    throw new System.Exception("not impl");
                },
                CapsuleCast$6: function (point1, point2, radius, direction, hitInfo, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                CapsuleCast$7: function (point1, point2, radius, direction, hitInfo, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                CapsuleCastAll: function (point1, point2, radius, direction) {
                    throw new System.Exception("not impl");
                },
                CapsuleCastAll$1: function (point1, point2, radius, direction, maxDistance) {
                    throw new System.Exception("not impl");
                },
                CapsuleCastAll$2: function (point1, point2, radius, direction, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                CapsuleCastAll$3: function (point1, point2, radius, direction, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                CapsuleCastNonAlloc: function (point1, point2, radius, direction, results) {
                    throw new System.Exception("not impl");
                },
                CapsuleCastNonAlloc$1: function (point1, point2, radius, direction, results, maxDistance) {
                    throw new System.Exception("not impl");
                },
                CapsuleCastNonAlloc$2: function (point1, point2, radius, direction, results, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                CapsuleCastNonAlloc$3: function (point1, point2, radius, direction, results, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                CheckBox: function (center, halfExtents) {
                    throw new System.Exception("not impl");
                },
                CheckBox$1: function (center, halfExtents, orientation) {
                    throw new System.Exception("not impl");
                },
                CheckBox$2: function (center, halfExtents, orientation, layerMask) {
                    throw new System.Exception("not impl");
                },
                CheckBox$3: function (center, halfExtents, orientation, layermask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                CheckCapsule: function (start, end, radius) {
                    throw new System.Exception("not impl");
                },
                CheckCapsule$1: function (start, end, radius, layerMask) {
                    throw new System.Exception("not impl");
                },
                CheckCapsule$2: function (start, end, radius, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                CheckSphere: function (position, radius) {
                    throw new System.Exception("not impl");
                },
                CheckSphere$1: function (position, radius, layerMask) {
                    throw new System.Exception("not impl");
                },
                CheckSphere$2: function (position, radius, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                ClosestPoint: function (point, collider, position, rotation) {
                    throw new System.Exception("not impl");
                },
                ComputePenetration: function (colliderA, positionA, rotationA, colliderB, positionB, rotationB, direction, distance) {
                    throw new System.Exception("not impl");
                },
                GetIgnoreLayerCollision: function (layer1, layer2) {
                    throw new System.Exception("not impl");
                },
                IgnoreCollision: function (collider1, collider2) {
                    throw new System.Exception("not impl");
                },
                IgnoreCollision$1: function (collider1, collider2, ignore) {
                    throw new System.Exception("not impl");
                },
                IgnoreLayerCollision: function (layer1, layer2) {
                    throw new System.Exception("not impl");
                },
                IgnoreLayerCollision$1: function (layer1, layer2, ignore) {
                    throw new System.Exception("not impl");
                },
                Linecast: function (start, end) {
                    throw new System.Exception("not impl");
                },
                Linecast$1: function (start, end, layerMask) {
                    throw new System.Exception("not impl");
                },
                Linecast$2: function (start, end, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                Linecast$3: function (start, end, hitInfo) {
                    throw new System.Exception("not impl");
                },
                Linecast$4: function (start, end, hitInfo, layerMask) {
                    throw new System.Exception("not impl");
                },
                Linecast$5: function (start, end, hitInfo, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                OverlapBox: function (center, halfExtents) {
                    throw new System.Exception("not impl");
                },
                OverlapBox$1: function (center, halfExtents, orientation) {
                    throw new System.Exception("not impl");
                },
                OverlapBox$2: function (center, halfExtents, orientation, layerMask) {
                    throw new System.Exception("not impl");
                },
                OverlapBox$3: function (center, halfExtents, orientation, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                OverlapBoxNonAlloc: function (center, halfExtents, results) {
                    throw new System.Exception("not impl");
                },
                OverlapBoxNonAlloc$1: function (center, halfExtents, results, orientation) {
                    throw new System.Exception("not impl");
                },
                OverlapBoxNonAlloc$2: function (center, halfExtents, results, orientation, mask) {
                    throw new System.Exception("not impl");
                },
                OverlapBoxNonAlloc$3: function (center, halfExtents, results, orientation, mask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                OverlapCapsule: function (point0, point1, radius) {
                    throw new System.Exception("not impl");
                },
                OverlapCapsule$1: function (point0, point1, radius, layerMask) {
                    throw new System.Exception("not impl");
                },
                OverlapCapsule$2: function (point0, point1, radius, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                OverlapCapsuleNonAlloc: function (point0, point1, radius, results) {
                    throw new System.Exception("not impl");
                },
                OverlapCapsuleNonAlloc$1: function (point0, point1, radius, results, layerMask) {
                    throw new System.Exception("not impl");
                },
                OverlapCapsuleNonAlloc$2: function (point0, point1, radius, results, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                OverlapSphere: function (position, radius) {
                    throw new System.Exception("not impl");
                },
                OverlapSphere$1: function (position, radius, layerMask) {
                    throw new System.Exception("not impl");
                },
                OverlapSphere$2: function (position, radius, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                OverlapSphereNonAlloc: function (position, radius, results) {
                    throw new System.Exception("not impl");
                },
                OverlapSphereNonAlloc$1: function (position, radius, results, layerMask) {
                    throw new System.Exception("not impl");
                },
                OverlapSphereNonAlloc$2: function (position, radius, results, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                Raycast: function (ray) {
                    throw new System.Exception("not impl");
                },
                Raycast$1: function (ray, maxDistance) {
                    throw new System.Exception("not impl");
                },
                Raycast$2: function (ray, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                Raycast$3: function (ray, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                Raycast$4: function (ray, hitInfo) {
                    throw new System.Exception("not impl");
                },
                Raycast$5: function (ray, hitInfo, maxDistance) {
                    throw new System.Exception("not impl");
                },
                Raycast$6: function (ray, hitInfo, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                Raycast$7: function (ray, hitInfo, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                Raycast$8: function (origin, direction) {
                    throw new System.Exception("not impl");
                },
                Raycast$9: function (origin, direction, maxDistance) {
                    throw new System.Exception("not impl");
                },
                Raycast$10: function (origin, direction, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                Raycast$11: function (origin, direction, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                Raycast$12: function (origin, direction, hitInfo) {
                    throw new System.Exception("not impl");
                },
                Raycast$13: function (origin, direction, hitInfo, maxDistance) {
                    throw new System.Exception("not impl");
                },
                Raycast$14: function (origin, direction, hitInfo, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                Raycast$15: function (origin, direction, hitInfo, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                RaycastAll: function (ray) {
                    throw new System.Exception("not impl");
                },
                RaycastAll$1: function (ray, maxDistance) {
                    throw new System.Exception("not impl");
                },
                RaycastAll$2: function (ray, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                RaycastAll$3: function (ray, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                RaycastAll$4: function (origin, direction) {
                    throw new System.Exception("not impl");
                },
                RaycastAll$5: function (origin, direction, maxDistance) {
                    throw new System.Exception("not impl");
                },
                RaycastAll$6: function (origin, direction, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                RaycastAll$7: function (origin, direction, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                RaycastNonAlloc: function (ray, results) {
                    throw new System.Exception("not impl");
                },
                RaycastNonAlloc$1: function (ray, results, maxDistance) {
                    throw new System.Exception("not impl");
                },
                RaycastNonAlloc$2: function (ray, results, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                RaycastNonAlloc$3: function (ray, results, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                RaycastNonAlloc$4: function (origin, direction, results) {
                    throw new System.Exception("not impl");
                },
                RaycastNonAlloc$5: function (origin, direction, results, maxDistance) {
                    throw new System.Exception("not impl");
                },
                RaycastNonAlloc$6: function (origin, direction, results, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                RaycastNonAlloc$7: function (origin, direction, results, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                RebuildBroadphaseRegions: function (worldBounds, subdivisions) {
                    throw new System.Exception("not impl");
                },
                Simulate: function (step) {
                    /*physx.simulate(step);*/
                },
                SphereCast: function (ray, radius) {
                    throw new System.Exception("not impl");
                },
                SphereCast$1: function (ray, radius, maxDistance) {
                    throw new System.Exception("not impl");
                },
                SphereCast$2: function (ray, radius, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                SphereCast$3: function (ray, radius, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                SphereCast$4: function (ray, radius, hitInfo) {
                    throw new System.Exception("not impl");
                },
                SphereCast$5: function (ray, radius, hitInfo, maxDistance) {
                    throw new System.Exception("not impl");
                },
                SphereCast$6: function (ray, radius, hitInfo, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                SphereCast$7: function (ray, radius, hitInfo, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                SphereCast$8: function (origin, radius, direction, hitInfo) {
                    throw new System.Exception("not impl");
                },
                SphereCast$9: function (origin, radius, direction, hitInfo, maxDistance) {
                    throw new System.Exception("not impl");
                },
                SphereCast$10: function (origin, radius, direction, hitInfo, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                SphereCast$11: function (origin, radius, direction, hitInfo, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                SphereCastAll: function (ray, radius) {
                    throw new System.Exception("not impl");
                },
                SphereCastAll$1: function (ray, radius, maxDistance) {
                    throw new System.Exception("not impl");
                },
                SphereCastAll$2: function (ray, radius, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                SphereCastAll$3: function (ray, radius, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                SphereCastAll$4: function (origin, radius, direction) {
                    throw new System.Exception("not impl");
                },
                SphereCastAll$5: function (origin, radius, direction, maxDistance) {
                    throw new System.Exception("not impl");
                },
                SphereCastAll$6: function (origin, radius, direction, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                SphereCastAll$7: function (origin, radius, direction, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                SphereCastNonAlloc: function (ray, radius, results) {
                    throw new System.Exception("not impl");
                },
                SphereCastNonAlloc$1: function (ray, radius, results, maxDistance) {
                    throw new System.Exception("not impl");
                },
                SphereCastNonAlloc$2: function (ray, radius, results, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                SphereCastNonAlloc$3: function (ray, radius, results, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                SphereCastNonAlloc$4: function (origin, radius, direction, results) {
                    throw new System.Exception("not impl");
                },
                SphereCastNonAlloc$5: function (origin, radius, direction, results, maxDistance) {
                    throw new System.Exception("not impl");
                },
                SphereCastNonAlloc$6: function (origin, radius, direction, results, maxDistance, layerMask) {
                    throw new System.Exception("not impl");
                },
                SphereCastNonAlloc$7: function (origin, radius, direction, results, maxDistance, layerMask, queryTriggerInteraction) {
                    throw new System.Exception("not impl");
                },
                SyncTransforms: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        }
    });
});


