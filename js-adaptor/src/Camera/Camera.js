const { screenHeight, screenWidth } = wx.getSystemInfoSync()

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Camera", {
        inherits: [MiniGameAdaptor.Behaviour],
        statics: {
            fields: {
                onPreCull: null,
                onPreRender: null,
                onPostRender: null
            },
            props: {
                allCameras: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                allCamerasCount: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                current: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                main: {
                    get: function () {
                        let root = MiniGameAdaptor.engineToAdaptorMap.get(game.sceneRoot.transform._children[0].entity);
                        return root ? root.GetComponentInChildren(MiniGameAdaptor.Camera) : null;
                    }
                }
            },
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    if (data.ref !== null && data.ref !== undefined && typeof(data.ref) === 'number') {
                        comp.ref = builtContext.components.data[data.ref];
                    }
                    else if (typeof(data) === 'number') {
                        comp.ref = builtContext.components.data[data];
                    }
                    return comp;
                },
                CalculateProjectionMatrixFromPhysicalProperties: function (output, focalLength, sensorSize, lensShift, nearClip, farClip, gateFitParameters) {
                    if (gateFitParameters === void 0) { gateFitParameters = new MiniGameAdaptor.Camera.GateFitParameters(); }
                    throw new System.Exception("not impl");
                },
                FocalLengthToFOV: function (focalLength, sensorSize) {
                    throw new System.Exception("not impl");
                },
                FOVToFocalLength: function (fov, sensorSize) {
                    throw new System.Exception("not impl");
                },
                GetAllCameras: function (cameras) {
                    throw new System.Exception("not impl");
                },
                SetupCurrent: function (cur) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            ref: null
        },
        props: {
            activeTexture: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            actualRenderingPath: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            allowDynamicResolution: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            allowHDR: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            allowMSAA: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            areVRStereoViewMatricesWithinSingleCullTolerance: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            aspect: {
                get: function () {
                    return this.ref.aspect;
                },
                set: function (value) {
                    this.res.aspect = value;
                }
            },
            backgroundColor: {
                get: function () {
                    return this.ref.clearColor;
                },
                set: function (value) {
                    this.ref.clearColor = value;
                }
            },
            cameraToWorldMatrix: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            cameraType: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            clearFlags: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            clearStencilAfterLightingPass: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            commandBufferCount: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            cullingMask: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            cullingMatrix: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            depth: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },

            depthTextureMode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            eventMask: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            farClipPlane: {
                get: function () {
                    return this.ref.farClipPlane;
                },
                set: function (value) {
                    this.ref.farClipPlane = value;
                }
            },
            fieldOfView: {
                get: function () {
                    return this.ref.fieldOfView;
                },
                set: function (value) {
                    this.ref.fieldOfView = value;
                }
            },
            focalLength: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            forceIntoRenderTexture: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            gateFit: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            layerCullDistances: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            layerCullSpherical: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            lensShift: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            nearClipPlane: {
                get: function () {
                    return this.ref.nearClipPlane;
                },
                set: function (value) {
                    this.ref.nearClipPlane = value;
                }
            },
            nonJitteredProjectionMatrix: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            opaqueSortMode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            orthographic: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            orthographicSize: {
                get: function () {
                    return this.ref.orthographicSize;
                },
                set: function (value) {
                    this.ref.orthographicSize = value;
                }
            },
            pixelHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            pixelRect: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            pixelWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            previousViewProjectionMatrix: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            projectionMatrix: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            rect: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            renderingPath: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            scaledPixelHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            scaledPixelWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            scene: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            sensorSize: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            stereoActiveEye: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            stereoConvergence: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            stereoEnabled: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            stereoSeparation: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            stereoTargetEye: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            targetDisplay: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            targetTexture: {
                get: function () {
                    return this.ref.targetTexture;
                },
                set: function (value) {
                    this.ref.targetTexture = value;
                }
            },
            transparencySortAxis: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            transparencySortMode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            useJitteredProjectionMatrixForTransparentRendering: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            useOcclusionCulling: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            usePhysicalProperties: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            velocity: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            worldToCameraMatrix: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function (ref) {
                this.$initialize();
                MiniGameAdaptor.Behaviour.ctor.call(this);

                // this.ref = ref;
            }
        },
        methods: {
            AddCommandBuffer: function (evt, buffer) {
                throw new System.Exception("not impl");
            },
            AddCommandBufferAsync: function (evt, buffer, queueType) {
                throw new System.Exception("not impl");
            },
            CalculateFrustumCorners: function (viewport, z, eye, outCorners) {
                throw new System.Exception("not impl");
            },
            CalculateObliqueMatrix: function (clipPlane) {
                throw new System.Exception("not impl");
            },
            CopyFrom: function (other) {
                throw new System.Exception("not impl");
            },
            CopyStereoDeviceProjectionMatrixToNonJittered: function (eye) {
                throw new System.Exception("not impl");
            },
            GetCommandBuffers: function (evt) {
                throw new System.Exception("not impl");
            },
            GetStereoNonJitteredProjectionMatrix: function (eye) {
                throw new System.Exception("not impl");
            },
            GetStereoProjectionMatrix: function (eye) {
                throw new System.Exception("not impl");
            },
            GetStereoViewMatrix: function (eye) {
                throw new System.Exception("not impl");
            },
            RemoveAllCommandBuffers: function () {
                throw new System.Exception("not impl");
            },
            RemoveCommandBuffer: function (evt, buffer) {
                throw new System.Exception("not impl");
            },
            RemoveCommandBuffers: function (evt) {
                throw new System.Exception("not impl");
            },
            Render: function () {
                throw new System.Exception("not impl");
            },
            RenderDontRestore: function () {
                throw new System.Exception("not impl");
            },
            RenderToCubemap: function (cubemap) {
                throw new System.Exception("not impl");
            },
            RenderToCubemap$1: function (cubemap, faceMask) {
                throw new System.Exception("not impl");
            },
            RenderToCubemap$2: function (cubemap) {
                throw new System.Exception("not impl");
            },
            RenderToCubemap$3: function (cubemap, faceMask) {
                throw new System.Exception("not impl");
            },
            RenderToCubemap$4: function (cubemap, faceMask, stereoEye) {
                throw new System.Exception("not impl");
            },
            RenderWithShader: function (shader, replacementTag) {
                throw new System.Exception("not impl");
            },
            Reset: function () {
                throw new System.Exception("not impl");
            },
            ResetAspect: function () {
                throw new System.Exception("not impl");
            },
            ResetCullingMatrix: function () {
                throw new System.Exception("not impl");
            },
            ResetProjectionMatrix: function () {
                throw new System.Exception("not impl");
            },
            ResetReplacementShader: function () {
                throw new System.Exception("not impl");
            },
            ResetStereoProjectionMatrices: function () {
                throw new System.Exception("not impl");
            },
            ResetStereoViewMatrices: function () {
                throw new System.Exception("not impl");
            },
            ResetTransparencySortSettings: function () {
                throw new System.Exception("not impl");
            },
            ResetWorldToCameraMatrix: function () {
                throw new System.Exception("not impl");
            },
            ScreenPointToRay: function (pos) {
                throw new System.Exception("not impl");
            },
            ScreenPointToRay$1: function (pos, eye) {
                throw new System.Exception("not impl");
            },
            ScreenToViewportPoint: function (position) {
                throw new System.Exception("not impl");
            },
            ScreenToWorldPoint: function (position) {

                var clipX = 2 * position.x / screenWidth - 1;
                var clipY = 2 * position.y / screenHeight - 1;

                return new MiniGameAdaptor.Vector3.$ctor4(this.ref.convertClipPositionToWorld(engine.Vector3.createFromNumber(clipX, clipY, -1)))._FlipX();
            },
            ScreenToWorldPoint$1: function (position, eye) {
                throw new System.Exception("not impl");
            },
            SetReplacementShader: function (shader, replacementTag) {
                throw new System.Exception("not impl");
            },
            SetStereoProjectionMatrix: function (eye, matrix) {
                throw new System.Exception("not impl");
            },
            SetStereoViewMatrix: function (eye, matrix) {
                throw new System.Exception("not impl");
            },
            SetTargetBuffers: function (colorBuffer, depthBuffer) {
                throw new System.Exception("not impl");
            },
            SetTargetBuffers$1: function (colorBuffer, depthBuffer) {
                throw new System.Exception("not impl");
            },
            ViewportPointToRay: function (pos) {
                throw new System.Exception("not impl");
            },
            ViewportPointToRay$1: function (pos, eye) {
                throw new System.Exception("not impl");
            },
            ViewportToScreenPoint: function (position) {
                throw new System.Exception("not impl");
            },
            ViewportToWorldPoint: function (position) {
                throw new System.Exception("not impl");
            },
            ViewportToWorldPoint$1: function (position, eye) {
                throw new System.Exception("not impl");
            },
            WorldToScreenPoint: function (position) {
                var clipPos = this.ref.convertWorldPositionToClip(position._FlipX().ref);
                var screenX = (clipPos.x + 1) / 2 * screenWidth;
                var screenY = (clipPos.y + 1) / 2 * screenHeight;
                return new MiniGameAdaptor.Vector3.$ctor2(screenX, screenY, clipPos.z);
            },
            WorldToScreenPoint$1: function (position, eye) {
                throw new System.Exception("not impl");
            },
            WorldToViewportPoint: function (position) {
                throw new System.Exception("not impl");
            },
            WorldToViewportPoint$1: function (position, eye) {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.Camera')(MiniGameAdaptor.Camera);
Object.defineProperty(MiniGameAdaptor.Camera.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.Camera.prototype.__properties }
})
// MiniGameAdaptor.Camera.prototype.__properties.ref = { type: "Camera" };