using System;
using System.Reflection;
using UnityEditor;
using UnityEngine;
using UnityEngine.Rendering;

namespace WeChat
{

    public class WXParticleSystem : WXComponent
    {
        private ParticleSystem particleSys = null;
        private GameObject go = null;
        public override string getTypeName()
        {
            return "Particle";
        }

        public WXParticleSystem(ParticleSystem p, GameObject gameObject)
        {
            particleSys = p;
            go = gameObject;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            Debug.Log("Particle System ToJSON");
            ParticleSystemRenderer particleSystemRenderer = particleSys.GetComponent<ParticleSystemRenderer>();

            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());
            json.AddField("data", data);

            JSONObject materials = new JSONObject(JSONObject.Type.ARRAY);
            data.AddField("materials", materials);
            Material[] mats = particleSystemRenderer.sharedMaterials;
            foreach (Material material in mats)
            {
                if (material != null)
                {
                    WXMaterial materialConverter = new WXMaterial(material, particleSystemRenderer);
                    string materialPath = materialConverter.Export(context.preset);
                    materials.Add(materialPath);
                    context.AddResource(materialPath);
                }
            }

            JSONObject modCommon = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject modCommonData = new JSONObject(JSONObject.Type.OBJECT);
            data.AddField("common", modCommonData);

            modCommonData.AddField("startSize3D", particleSys.main.startSize3D);
            if (particleSys.main.startSize3D)
            {
                modCommonData.AddField("startSizeX", ParseMinMaxCurve(particleSys.main.startSizeX));
                modCommonData.AddField("startSizeY", ParseMinMaxCurve(particleSys.main.startSizeY));
                modCommonData.AddField("startSizeZ", ParseMinMaxCurve(particleSys.main.startSizeZ));
            }
            else
            {
                modCommonData.AddField("startSize", ParseMinMaxCurve(particleSys.main.startSize));
            }
            modCommonData.AddField("startColor", ParseMinMaxGradient(particleSys.main.startColor));
            modCommonData.AddField("startLifetime", ParseMinMaxCurve(particleSys.main.startLifetime));
            modCommonData.AddField("startRotation3D", particleSys.main.startRotation3D);
            if (particleSys.main.startRotation3D)
            {
                modCommonData.AddField("startRotationX", ParseMinMaxCurve(particleSys.main.startRotationX, (float)(180 / Math.PI)));
                modCommonData.AddField("startRotationY", ParseMinMaxCurve(particleSys.main.startRotationY, (float)(180 / Math.PI)));
                modCommonData.AddField("startRotationZ", ParseMinMaxCurve(particleSys.main.startRotationZ, (float)(180 / Math.PI)));
            }
            else
            {
                modCommonData.AddField("startRotationZ", ParseMinMaxCurve(particleSys.main.startRotation, (float)(180 / Math.PI)));
            }
            modCommonData.AddField("startSpeed", ParseMinMaxCurve(particleSys.main.startSpeed));
            modCommonData.AddField("gravityModifier", ParseMinMaxCurve(particleSys.main.gravityModifier));
#if UNITY_2018_1_OR_NEWER
            modCommonData.AddField("randomizeRotation", particleSys.main.flipRotation);
#endif
            modCommonData.AddField("randomSeed", particleSys.randomSeed);
            modCommonData.AddField("autoRandomSeed", particleSys.useAutoRandomSeed);

            ParticleSystemScalingMode pScalingMode = particleSys.main.scalingMode;
            int pScalingModeNum = 0;
            switch (pScalingMode)
            {
                case ParticleSystemScalingMode.Hierarchy:
                    pScalingModeNum = 0;
                    break;
                case ParticleSystemScalingMode.Local:
                    pScalingModeNum = 1;
                    break;
                case ParticleSystemScalingMode.Shape:
                    pScalingModeNum = 2;
                    break;
            }
            modCommonData.AddField("scalingMode", pScalingModeNum);

            ParticleSystemSimulationSpace simulationSpace = particleSys.main.simulationSpace;
            int simulationSpaceNum = 0;
            switch (simulationSpace)
            {
                case ParticleSystemSimulationSpace.Local:
                    simulationSpaceNum = 0;
                    break;
                case ParticleSystemSimulationSpace.World:
                    simulationSpaceNum = 1;
                    break;
                case ParticleSystemSimulationSpace.Custom:
                    simulationSpaceNum = 2;
                    break;
            }
            modCommonData.AddField("simulationSpace", simulationSpaceNum);

            JSONObject emitter = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject emitterData = new JSONObject(JSONObject.Type.OBJECT);
            data.AddField("emitter", emitterData);
            emitterData.AddField("playOnAwake", particleSys.main.playOnAwake);
            emitterData.AddField("looping", particleSys.main.loop);
            emitterData.AddField("duration", particleSys.main.duration);
            emitterData.AddField("startDelay", ParseMinMaxCurve(particleSys.main.startDelay));


            if (particleSys.emission.enabled)
            {
                JSONObject burst = new JSONObject(JSONObject.Type.ARRAY);
                emitterData.AddField("bursts", burst);
                int count = particleSys.emission.burstCount;
                ParticleSystem.Burst[] bursts = new ParticleSystem.Burst[count];
                particleSys.emission.GetBursts(bursts);
                for (int i = 0; i < count; i++)
                {
                    //burst.Add(ParseBurst(particleSys.emission.GetBurst(i)));
                    burst.Add(ParseBurst(bursts[i]));
                }

                emitterData.AddField("rateOverTime", ParseMinMaxCurve(particleSys.emission.rateOverTime));
            }
            emitterData.AddField("maxParticles", particleSys.main.maxParticles);

            if (particleSystemRenderer.enabled)
            {

                JSONObject renderer = new JSONObject(JSONObject.Type.OBJECT);
                JSONObject rendererData = new JSONObject(JSONObject.Type.OBJECT);
                data.AddField("renderer", rendererData);
                ParticleSystemRenderMode pRenderMode = particleSystemRenderer.renderMode;
                int pRenderModeNum = 0;
                switch (pRenderMode)
                {
                    case ParticleSystemRenderMode.Billboard:
                        pRenderModeNum = 1;
                        break;
                    case ParticleSystemRenderMode.Stretch:
                        pRenderModeNum = 2;
                        rendererData.AddField("cameraScale", particleSystemRenderer.cameraVelocityScale);
                        rendererData.AddField("speedScale", particleSystemRenderer.velocityScale);
                        rendererData.AddField("lengthScale", particleSystemRenderer.lengthScale);
                        break;
                    case ParticleSystemRenderMode.HorizontalBillboard:
                        pRenderModeNum = 3;
                        break;
                    case ParticleSystemRenderMode.VerticalBillboard:
                        pRenderModeNum = 4;
                        break;
                    case ParticleSystemRenderMode.Mesh:
                        Mesh mesh = particleSystemRenderer.mesh;
                        if (mesh != null)
                        {
                            WXMesh meshConverter = new WXMesh(mesh);
                            string meshPath = meshConverter.Export(context.preset);
                            rendererData.AddField("mesh", meshPath);
                            rendererData.AddField("meshCount", particleSystemRenderer.meshCount);
                            context.AddResource(meshPath);
                        }
                        else
                        {
                            Debug.LogError(string.Format("{0} mesh is null", particleSys.name));
                        }
                        pRenderModeNum = 5;
                        break;
                    case ParticleSystemRenderMode.None:
                        pRenderModeNum = 0;
                        break;
                    default:
                        pRenderModeNum = 1;
                        break;
                }
                rendererData.AddField("renderMode", pRenderModeNum);

                int mode = 1;
                switch (particleSystemRenderer.alignment)
                {
                    case ParticleSystemRenderSpace.View:
                        mode = 1;
                        break;
                    case ParticleSystemRenderSpace.World:
                        mode = 2;
                        break;
                    case ParticleSystemRenderSpace.Local:
                        mode = 3;
                        break;
                    case ParticleSystemRenderSpace.Facing:
                        mode = 4;
                        break;
#if UNITY_2017_1_OR_NEWER
                    case ParticleSystemRenderSpace.Velocity:
                        mode = 5;
                        break;
#endif
                    default:
                        break;
                }
                rendererData.AddField("renderAlignment", mode);


                mode = 0;
                switch (particleSystemRenderer.sortMode)
                {
                    case ParticleSystemSortMode.None:
                        mode = 0;
                        break;
                    case ParticleSystemSortMode.Distance:
                        mode = 1;
                        break;
                    case ParticleSystemSortMode.OldestInFront:
                        mode = 2;
                        break;
                    case ParticleSystemSortMode.YoungestInFront:
                        mode = 3;
                        break;
                    default:
                        break;
                }
                rendererData.AddField("sortMode", mode);
                rendererData.AddField("sortingFudge", particleSystemRenderer.sortingFudge);
                rendererData.AddField("normalDirection", particleSystemRenderer.normalDirection);
                rendererData.AddField("minParticleSize", particleSystemRenderer.minParticleSize);
                rendererData.AddField("maxParticleSize", particleSystemRenderer.maxParticleSize);

                var flipValue = TryGetContainProperty(particleSystemRenderer, "flip");
                if (flipValue != null)
                {
                    rendererData.AddField("flip", GetVect3((Vector3)flipValue));
                }
                else
                {
                    renderer.AddField("flip", GetVect3(new Vector3(0, 0, 0)));
                }
                //rendererData.AddField("flip", GetVect3(particleSystemRenderer.flip));
                rendererData.AddField("pivot", GetVect3(particleSystemRenderer.pivot));

                var allowRollData = TryGetContainProperty(particleSystemRenderer, "allowRoll");
                if (allowRollData != null)
                {
                    rendererData.AddField("allowRoll", (bool)allowRollData);
                }
                else
                {
                    rendererData.AddField("allowRoll", false);
                }
            } else {
                String info = "entity: " + particleSys.gameObject.name + " 的粒子组件没有renderer模块，不可导出;请加上renderer模块，或删除该粒子组件";
                
                ErrorUtil.ExportErrorReporter.create()
                    .setGameObject(particleSys.gameObject)
                    .setHierarchyContext(context)
                    .error(ErrorUtil.ErrorCode.Particle_RendererNotFound, "粒子组件没有renderer模块，不可导出;请加上renderer模块，或删除该粒子组件");
            }

            if (particleSys.rotationOverLifetime.enabled)
            {
                JSONObject rotationByLife = new JSONObject(JSONObject.Type.OBJECT);
                JSONObject rotationByLifeData = new JSONObject(JSONObject.Type.OBJECT);
                data.AddField("rotationByLife", rotationByLifeData);

                rotationByLifeData.AddField("separateAxes", particleSys.rotationOverLifetime.separateAxes);
                if (particleSys.rotationOverLifetime.separateAxes)
                {
                    rotationByLifeData.AddField("x", ParseMinMaxCurve(particleSys.rotationOverLifetime.x, (float)(180 / Math.PI)));
                    rotationByLifeData.AddField("y", ParseMinMaxCurve(particleSys.rotationOverLifetime.y, (float)(180 / Math.PI)));
                    rotationByLifeData.AddField("z", ParseMinMaxCurve(particleSys.rotationOverLifetime.z, (float)(180 / Math.PI)));
                }
                else
                {
                    rotationByLifeData.AddField("z", ParseMinMaxCurve(particleSys.rotationOverLifetime.z, (float)(180 / Math.PI)));
                }
            }

            if (particleSys.sizeOverLifetime.enabled)
            {
                JSONObject sizeOverLifetime = new JSONObject(JSONObject.Type.OBJECT);
                JSONObject sizeOverLifetimeData = new JSONObject(JSONObject.Type.OBJECT);
                data.AddField("sizeByLife", sizeOverLifetimeData);

                sizeOverLifetimeData.AddField("separateAxes", particleSys.sizeOverLifetime.separateAxes);
                if (particleSys.sizeOverLifetime.separateAxes)
                {
                    sizeOverLifetimeData.AddField("x", ParseMinMaxCurve(particleSys.sizeOverLifetime.x));
                    sizeOverLifetimeData.AddField("y", ParseMinMaxCurve(particleSys.sizeOverLifetime.y));
                    sizeOverLifetimeData.AddField("z", ParseMinMaxCurve(particleSys.sizeOverLifetime.z));
                }
                else
                {
                    sizeOverLifetimeData.AddField("x", ParseMinMaxCurve(particleSys.sizeOverLifetime.size));
                }
            }

            if (particleSys.velocityOverLifetime.enabled)
            {
                JSONObject speedByLifeData = new JSONObject(JSONObject.Type.OBJECT);
                data.AddField("speedByLife", speedByLifeData);
                switch (particleSys.velocityOverLifetime.space)
                {
                    case ParticleSystemSimulationSpace.Local:
                        speedByLifeData.AddField("space", 1);
                        break;
                    case ParticleSystemSimulationSpace.World:
                        speedByLifeData.AddField("space", 2);
                        break;
                    case ParticleSystemSimulationSpace.Custom:
                        break;
                    default:
                        break;
                }

                speedByLifeData.AddField("x", ParseMinMaxCurve(particleSys.velocityOverLifetime.x));
                speedByLifeData.AddField("y", ParseMinMaxCurve(particleSys.velocityOverLifetime.y));
                speedByLifeData.AddField("z", ParseMinMaxCurve(particleSys.velocityOverLifetime.z));
#if UNITY_2018_1_OR_NEWER
                speedByLifeData.AddField("orbitalX", ParseMinMaxCurve(particleSys.velocityOverLifetime.orbitalX));
                speedByLifeData.AddField("orbitalY", ParseMinMaxCurve(particleSys.velocityOverLifetime.orbitalY));
                speedByLifeData.AddField("orbitalZ", ParseMinMaxCurve(particleSys.velocityOverLifetime.orbitalZ));
                speedByLifeData.AddField("orbitalOffsetX", ParseMinMaxCurve(particleSys.velocityOverLifetime.orbitalOffsetX));
                speedByLifeData.AddField("orbitalOffsetY", ParseMinMaxCurve(particleSys.velocityOverLifetime.orbitalOffsetY));
                speedByLifeData.AddField("orbitalOffsetZ", ParseMinMaxCurve(particleSys.velocityOverLifetime.orbitalOffsetZ));
                speedByLifeData.AddField("radial", ParseMinMaxCurve(particleSys.velocityOverLifetime.radial));
#endif
#if UNITY_2017_1_OR_NEWER
                speedByLifeData.AddField("speedScale", ParseMinMaxCurve(particleSys.velocityOverLifetime.speedModifier));
#endif
            }

            if (particleSys.limitVelocityOverLifetime.enabled)
            {
                JSONObject speedLimitByLifeData = new JSONObject(JSONObject.Type.OBJECT);
                data.AddField("speedLimitByLife", speedLimitByLifeData);
                speedLimitByLifeData.AddField("separateAxes", particleSys.limitVelocityOverLifetime.separateAxes);
                if (particleSys.limitVelocityOverLifetime.separateAxes)
                {
                    speedLimitByLifeData.AddField("x", ParseMinMaxCurve(particleSys.limitVelocityOverLifetime.limitX, particleSys.limitVelocityOverLifetime.limitXMultiplier));
                    speedLimitByLifeData.AddField("y", ParseMinMaxCurve(particleSys.limitVelocityOverLifetime.limitY, particleSys.limitVelocityOverLifetime.limitYMultiplier));
                    speedLimitByLifeData.AddField("z", ParseMinMaxCurve(particleSys.limitVelocityOverLifetime.limitZ, particleSys.limitVelocityOverLifetime.limitZMultiplier));
                }
                else
                {
                    speedLimitByLifeData.AddField("x", ParseMinMaxCurve(particleSys.limitVelocityOverLifetime.limit, particleSys.limitVelocityOverLifetime.limitMultiplier));
                }
                speedLimitByLifeData.AddField("dampen", particleSys.limitVelocityOverLifetime.dampen);
                switch (particleSys.limitVelocityOverLifetime.space)
                {
                    case ParticleSystemSimulationSpace.Local:
                        speedLimitByLifeData.AddField("space", 1);
                        break;
                    case ParticleSystemSimulationSpace.World:
                        speedLimitByLifeData.AddField("space", 2);
                        break;
                    case ParticleSystemSimulationSpace.Custom:
                        break;
                    default:
                        break;
                }
#if UNITY_2017_1_OR_NEWER
                speedLimitByLifeData.AddField("drag", ParseMinMaxCurve(particleSys.limitVelocityOverLifetime.drag));
                speedLimitByLifeData.AddField("dragMultiplyBySize", particleSys.limitVelocityOverLifetime.multiplyDragByParticleSize);
                speedLimitByLifeData.AddField("dragMultiplyBySpeed", particleSys.limitVelocityOverLifetime.multiplyDragByParticleVelocity);
#endif
            }

            if (particleSys.colorOverLifetime.enabled)
            {
                JSONObject colorOverLifetime = new JSONObject(JSONObject.Type.OBJECT);
                JSONObject colorOverLifetimeData = new JSONObject(JSONObject.Type.OBJECT);
                data.AddField("colorByLife", colorOverLifetimeData);
                colorOverLifetimeData.AddField("gColor", ParseMinMaxGradient(particleSys.colorOverLifetime.color));
            }

            if (particleSys.shape.enabled)
            {
                JSONObject shapeData = new JSONObject(JSONObject.Type.OBJECT);
                var haveShape = true;
                if (particleSys.shape.shapeType == ParticleSystemShapeType.Cone || particleSys.shape.shapeType == ParticleSystemShapeType.ConeVolume || particleSys.shape.shapeType == ParticleSystemShapeType.ConeVolumeShell || particleSys.shape.shapeType == ParticleSystemShapeType.ConeShell)
                {
                    shapeData.AddField("shape", ParseConeShape(particleSys.shape));
                }
                else if (particleSys.shape.shapeType == ParticleSystemShapeType.Sphere || particleSys.shape.shapeType == ParticleSystemShapeType.SphereShell)
                {
                    shapeData.AddField("shape", ParseSphereShape(particleSys.shape));
                }
                else if (particleSys.shape.shapeType == ParticleSystemShapeType.Circle || particleSys.shape.shapeType == ParticleSystemShapeType.CircleEdge)
                {
                    shapeData.AddField("shape", ParseCircleShape(particleSys.shape));
                }
                else if (particleSys.shape.shapeType == ParticleSystemShapeType.Box || particleSys.shape.shapeType == ParticleSystemShapeType.BoxEdge || particleSys.shape.shapeType == ParticleSystemShapeType.BoxShell)
                {
                    shapeData.AddField("shape", ParseBox(particleSys.shape));
                }
                else if (particleSys.shape.shapeType == ParticleSystemShapeType.Hemisphere || particleSys.shape.shapeType == ParticleSystemShapeType.HemisphereShell)
                {
                    shapeData.AddField("shape", ParseHemisphere(particleSys.shape));
                }
                // else if (particleSys.shape.shapeType == ParticleSystemShapeType.SingleSidedEdge) {
                //     shapeData.AddField("shape", ParseSingleSidedEdge(particleSys.shape));
                // }
                else
                {
                    var parentChain = go.name;
                    var parent = go.transform.parent;
                    while(parent) {
                        parentChain += " -> " + parent.gameObject.name;
                        parent = parent.parent;
                    }
                    Debug.LogError("unSupport shape (" + particleSys.shape.shapeType.ToString() + ") at: " + parentChain);
                    haveShape = false;
                }
                if (haveShape)
                {
                    data.AddField("emitterShape", shapeData);
                }
            }

            if (particleSys.textureSheetAnimation.enabled)
            {
                JSONObject textureSheetAnimationData = new JSONObject(JSONObject.Type.OBJECT);
                data.AddField("textureSheetAnimation", textureSheetAnimationData);
                int mode = 1;
#if UNITY_2017_1_OR_NEWER
                mode = 1;
                switch (particleSys.textureSheetAnimation.mode)
                {
                    case ParticleSystemAnimationMode.Grid:
                        mode = 1;
                        break;
                    case ParticleSystemAnimationMode.Sprites:
                        mode = 2;
                        break;
                    default:
                        break;
                }
                textureSheetAnimationData.AddField("mode", mode);
#endif
                JSONObject vec2 = new JSONObject(JSONObject.Type.ARRAY);
                vec2.Add(particleSys.textureSheetAnimation.numTilesX);
                vec2.Add(particleSys.textureSheetAnimation.numTilesY);
                textureSheetAnimationData.AddField("tiles", vec2);
                mode = 1;
                switch (particleSys.textureSheetAnimation.animation)
                {
                    case ParticleSystemAnimationType.WholeSheet:
                        mode = 1;
                        break;
                    case ParticleSystemAnimationType.SingleRow:
                        mode = 2;
                        break;
                    default:
                        break;
                }
                textureSheetAnimationData.AddField("animationType", mode);
                textureSheetAnimationData.AddField("randomRow", particleSys.textureSheetAnimation.useRandomRow);
                textureSheetAnimationData.AddField("row", particleSys.textureSheetAnimation.rowIndex);

                //mode = 1;
                //switch (particleSys.textureSheetAnimation.timeMode)
                //{
                //    case ParticleSystemAnimationTimeMode.Lifetime:
                //        mode = 1;
                //        break;
                //    case ParticleSystemAnimationTimeMode.Speed:
                //        mode = 2;
                //        break;
                //    case ParticleSystemAnimationTimeMode.FPS:
                //        mode = 3;
                //        break;
                //    default:
                //        break;
                //}
                textureSheetAnimationData.AddField("timeMode", 1);
                if (mode == 1) {
                    textureSheetAnimationData.AddField("frameOverTime", ParseMinMaxCurve(particleSys.textureSheetAnimation.frameOverTime, particleSys.textureSheetAnimation.numTilesX * particleSys.textureSheetAnimation.numTilesY));
                } else {
                    textureSheetAnimationData.AddField("frameOverTime", ParseMinMaxCurve(particleSys.textureSheetAnimation.frameOverTime, particleSys.textureSheetAnimation.numTilesX));
                }
                textureSheetAnimationData.AddField("startFrame", ParseMinMaxCurve(particleSys.textureSheetAnimation.startFrame));
                textureSheetAnimationData.AddField("cycles", particleSys.textureSheetAnimation.cycleCount);
                mode = 0;
                var a = particleSys.textureSheetAnimation.uvChannelMask;
                var b = a & UVChannelFlags.UV0;
                if ((a & UVChannelFlags.UV0) != 0)
                {
                    mode += 1;
                }
                if ((a & UVChannelFlags.UV1) != 0)
                {
                    mode += 2;
                }
                if ((a & UVChannelFlags.UV2) != 0)
                {
                    mode += 3;
                }
                if ((a & UVChannelFlags.UV3) != 0)
                {
                    mode += 4;
                }

                textureSheetAnimationData.AddField("affectedUVChannels", mode);
            }

            if (particleSys.subEmitters.enabled)
            {
                JSONObject subEmittersData = new JSONObject(JSONObject.Type.ARRAY);
                data.AddField("subEmitters", subEmittersData);

                int count = particleSys.subEmitters.subEmittersCount;
                for (int i = 0; i < count; i++)
                {
                    ParticleSystemSubEmitterProperties properties = particleSys.subEmitters.GetSubEmitterProperties(i);
                    ParticleSystemSubEmitterType type = particleSys.subEmitters.GetSubEmitterType(i);
                    JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
                    int typeNum = 0;
                    switch (type)
                    {
                        case ParticleSystemSubEmitterType.Birth:
                            typeNum = 0;
                            break;
                        case ParticleSystemSubEmitterType.Collision:
                            typeNum = 1;
                            break;
                        case ParticleSystemSubEmitterType.Death:
                            typeNum = 2;
                            break;
                        default:
                            break;
                    }
                    res.AddField("type", typeNum);
                    int propertiesNum = 0;
                    switch (properties)
                    {
                        case ParticleSystemSubEmitterProperties.InheritNothing:
                            propertiesNum = 0;
                            break;
                        case ParticleSystemSubEmitterProperties.InheritEverything:
                            propertiesNum = 1;
                            break;
                        case ParticleSystemSubEmitterProperties.InheritColor:
                            propertiesNum = 2;
                            break;
                        case ParticleSystemSubEmitterProperties.InheritSize:
                            propertiesNum = 3;
                            break;
                        case ParticleSystemSubEmitterProperties.InheritRotation:
                            propertiesNum = 4;
                            break;
                        default:
                            break;
                    }
                    res.AddField("properties", propertiesNum);

                    subEmittersData.Add(res);
                }
            }

            return json;
        }

        private JSONObject ParseConstant(ParticleSystem.MinMaxCurve curveData)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("type", "Constant");
            res.AddField("data", data);
            data.AddField("value", curveData.constant);
            return res;
        }

        private JSONObject ParseConstant(ParticleSystem.MinMaxCurve curveData, float num)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("type", "Constant");
            res.AddField("data", data);
            data.AddField("value", curveData.constant * num);
            return res;
        }

        private JSONObject GetCurveData(AnimationCurve animationCurve, float multiplier)
        {
            JSONObject HermiteCurve = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject HermiteCurveX = new JSONObject(JSONObject.Type.ARRAY);
            JSONObject HermiteCurveY = new JSONObject(JSONObject.Type.ARRAY);
            JSONObject HermiteCurveIn = new JSONObject(JSONObject.Type.ARRAY);
            JSONObject HermiteCurveOut = new JSONObject(JSONObject.Type.ARRAY);

            HermiteCurve.AddField("x", HermiteCurveX);
            HermiteCurve.AddField("y", HermiteCurveY);
            HermiteCurve.AddField("in", HermiteCurveIn);
            HermiteCurve.AddField("out", HermiteCurveOut);

            Keyframe[] keyframes = animationCurve.keys;
            for (var i = 0; i < keyframes.Length; i++)
            {
                var keyframe = keyframes[i];
                HermiteCurveX.Add(keyframe.time);
                HermiteCurveY.Add(keyframe.value * multiplier);
                HermiteCurveIn.Add(keyframe.inTangent);
                HermiteCurveOut.Add(keyframe.outTangent);
            }
            return HermiteCurve;
        }

        private JSONObject ParseCurve(ParticleSystem.MinMaxCurve curveData)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);

            res.AddField("type", "Curve");
            res.AddField("data", data);
            data.AddField("curve", GetCurveData(curveData.curve, curveData.curveMultiplier));
            return res;
        }

        private JSONObject ParseCurve(ParticleSystem.MinMaxCurve curveData, float multiplier)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);

            res.AddField("type", "Curve");
            res.AddField("data", data);
            data.AddField("curve", GetCurveData(curveData.curve, curveData.curveMultiplier * multiplier));
            return res;
        }

        private JSONObject ParseTwoConstants(ParticleSystem.MinMaxCurve curveData)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("type", "TwoConstants");
            res.AddField("data", data);
            data.AddField("max", curveData.constantMax);
            data.AddField("min", curveData.constantMin);
            return res;
        }

        private JSONObject ParseTwoConstants(short maxCount, short minCount)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("type", "TwoConstants");
            res.AddField("data", data);
            data.AddField("max", maxCount);
            data.AddField("min", minCount);
            return res;
        }

        private JSONObject ParseTwoConstants(ParticleSystem.MinMaxCurve curveData, float multiplier)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("type", "TwoConstants");
            res.AddField("data", data);
            data.AddField("max", curveData.constantMax * multiplier);
            data.AddField("min", curveData.constantMin * multiplier);
            return res;
        }

        private JSONObject ParseTwoCurves(ParticleSystem.MinMaxCurve curveData)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("type", "TwoCurves");
            res.AddField("data", data);
            data.AddField("max", GetCurveData(curveData.curveMax, curveData.curveMultiplier));
            data.AddField("min", GetCurveData(curveData.curveMin, curveData.curveMultiplier));
            return res;
        }

        private JSONObject ParseTwoCurves(ParticleSystem.MinMaxCurve curveData, float multiplier)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("type", "TwoCurves");
            res.AddField("data", data);
            data.AddField("max", GetCurveData(curveData.curveMax, curveData.curveMultiplier * multiplier));
            data.AddField("min", GetCurveData(curveData.curveMin, curveData.curveMultiplier * multiplier));
            return res;
        }

        private JSONObject ParseOneColor(ParticleSystem.MinMaxGradient colorData)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject color = new JSONObject(JSONObject.Type.ARRAY);
            res.AddField("type", "OneColor");
            res.AddField("data", data);
            data.AddField("color", color);
            color.Add(colorData.color.r * 255);
            color.Add(colorData.color.g * 255);
            color.Add(colorData.color.b * 255);
            color.Add(colorData.color.a * 255);
            return res;
        }

        private JSONObject ParseGradient(ParticleSystem.MinMaxGradient colorData)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("type", "Gradient");
            res.AddField("data", data);
            data.AddField("gColor", GetGradientColor(colorData.gradient));
            return res;
        }

        private JSONObject GetGradientColor(Gradient gcolor)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject alphaKey = new JSONObject(JSONObject.Type.ARRAY);
            JSONObject colorKey = new JSONObject(JSONObject.Type.ARRAY);
            res.AddField("alpha", alphaKey);
            res.AddField("color", colorKey);
            GradientMode gradientMode = gcolor.mode;
            if (gradientMode == GradientMode.Blend)
            {
                res.AddField("mode", 1);
            }
            if (gradientMode == GradientMode.Fixed)
            {
                res.AddField("mode", 2);
            }
            GradientAlphaKey[] alphaKeys = gcolor.alphaKeys;
            for (var i = 0; i < alphaKeys.Length; i++)
            {
                GradientAlphaKey alphaKeyframe = alphaKeys[i];
                alphaKey.Add(alphaKeyframe.time);
                alphaKey.Add(alphaKeyframe.alpha * 255);
            }
            GradientColorKey[] colorKeys = gcolor.colorKeys;
            for (var i = 0; i < colorKeys.Length; i++)
            {
                GradientColorKey colorKeyframe = colorKeys[i];
                colorKey.Add(colorKeyframe.time);
                colorKey.Add(colorKeyframe.color.r * 255);
                colorKey.Add(colorKeyframe.color.g * 255);
                colorKey.Add(colorKeyframe.color.b * 255);
                colorKey.Add(colorKeyframe.color.a * 255);
            }
            return res;
        }

        private JSONObject ParseRandomColor(ParticleSystem.MinMaxGradient colorData)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("type", "RandomColor");
            res.AddField("data", data);
            data.AddField("gColor", GetGradientColor(colorData.gradient));
            return res;
        }

        private JSONObject ParseTwoColors(ParticleSystem.MinMaxGradient colorData)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject max = new JSONObject(JSONObject.Type.ARRAY);
            JSONObject min = new JSONObject(JSONObject.Type.ARRAY);

            res.AddField("type", "TwoColors");
            res.AddField("data", data);
            data.AddField("max", max);
            data.AddField("min", min);

            max.Add(colorData.colorMax.r * 255);
            max.Add(colorData.colorMax.g * 255);
            max.Add(colorData.colorMax.b * 255);
            max.Add(colorData.colorMax.a * 255);

            min.Add(colorData.colorMin.r * 255);
            min.Add(colorData.colorMin.g * 255);
            min.Add(colorData.colorMin.b * 255);
            min.Add(colorData.colorMin.a * 255);
            return res;
        }

        private JSONObject ParseTwoGradients(ParticleSystem.MinMaxGradient colorData)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);

            res.AddField("type", "TwoGradients");
            res.AddField("data", data);
            data.AddField("max", GetGradientColor(colorData.gradientMax));
            data.AddField("min", GetGradientColor(colorData.gradientMin));
            return res;
        }

        private JSONObject ParseMinMaxCurve(ParticleSystem.MinMaxCurve curveData)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            if (curveData.mode == ParticleSystemCurveMode.Constant)
            {
                res = ParseConstant(curveData);
            }
            else if (curveData.mode == ParticleSystemCurveMode.Curve)
            {
                res = ParseCurve(curveData);
            }
            else if (curveData.mode == ParticleSystemCurveMode.TwoConstants)
            {
                res = ParseTwoConstants(curveData);
            }
            else if (curveData.mode == ParticleSystemCurveMode.TwoCurves)
            {
                res = ParseTwoCurves(curveData);
            }
            return res;
        }

        private JSONObject ParseMinMaxCurve(ParticleSystem.MinMaxCurve curveData, float numfloat)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            if (curveData.mode == ParticleSystemCurveMode.Constant)
            {
                res = ParseConstant(curveData, numfloat);
            }
            else if (curveData.mode == ParticleSystemCurveMode.Curve)
            {
                res = ParseCurve(curveData, numfloat);
            }
            else if (curveData.mode == ParticleSystemCurveMode.TwoConstants)
            {
                res = ParseTwoConstants(curveData, numfloat);
            }
            else if (curveData.mode == ParticleSystemCurveMode.TwoCurves)
            {
                res = ParseTwoCurves(curveData, numfloat);
            }
            return res;
        }

        private JSONObject ParseMinMaxGradient(ParticleSystem.MinMaxGradient colorData)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            if (colorData.mode == ParticleSystemGradientMode.Color)
            {
                res = ParseOneColor(colorData);
            }
            else if (colorData.mode == ParticleSystemGradientMode.Gradient)
            {
                res = ParseGradient(colorData);
            }
            else if (colorData.mode == ParticleSystemGradientMode.RandomColor)
            {
                res = ParseRandomColor(colorData);
            }
            else if (colorData.mode == ParticleSystemGradientMode.TwoColors)
            {
                res = ParseTwoColors(colorData);
            }
            else if (colorData.mode == ParticleSystemGradientMode.TwoGradients)
            {
                res = ParseTwoGradients(colorData);
            }
            return res;
        }

#if UNITY_2017_1_OR_NEWER
        private int GetArcMode(ParticleSystem.ShapeModule shape)
        {
            int res = 1;
            switch (shape.arcMode)
            {
                case ParticleSystemShapeMultiModeValue.Random:
                    res = 1;
                    break;
                case ParticleSystemShapeMultiModeValue.Loop:
                    res = 2;
                    break;
                case ParticleSystemShapeMultiModeValue.PingPong:
                    res = 3;
                    break;
                case ParticleSystemShapeMultiModeValue.BurstSpread:
                    res = 4;
                    break;
                default:
                    break;
            }
            return res;
        }
#endif
#if UNITY_2017_1_OR_NEWER
        private int GetRadiusMode(ParticleSystem.ShapeModule shape)
        {
            int res = 1;
            switch (shape.radiusMode)
            {
                case ParticleSystemShapeMultiModeValue.Random:
                    res = 1;
                    break;
                case ParticleSystemShapeMultiModeValue.Loop:
                    res = 2;
                    break;
                case ParticleSystemShapeMultiModeValue.PingPong:
                    res = 3;
                    break;
                case ParticleSystemShapeMultiModeValue.BurstSpread:
                    res = 4;
                    break;
                default:
                    break;
            }
            return res;
        }
#endif

        private JSONObject ParseConeShape(ParticleSystem.ShapeModule shape)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("type", "ParticleConeShape");
            res.AddField("data", data);
            data.AddField("angle", shape.angle);
            data.AddField("radius", shape.radius);
            data.AddField("arc", shape.arc);
#if UNITY_2017_1_OR_NEWER
            data.AddField("arcMode", GetArcMode(shape));
            data.AddField("arcSpread", shape.arcSpread);
            data.AddField("radiusThickness", shape.radiusThickness);
            data.AddField("position", GetVect3(shape.position));
            data.AddField("rotation", GetVect3(shape.rotation));
            data.AddField("scale", GetVect3(shape.scale));
#endif
            data.AddField("length", shape.length);
            int emitfrom = 1;
            if (shape.shapeType == ParticleSystemShapeType.ConeVolume)
            {
                emitfrom = 2;
            } else if (shape.shapeType == ParticleSystemShapeType.ConeVolumeShell) {
                emitfrom = 3;
                data.AddField("radiusThickness", 0);
            }
            data.AddField("emitFrom", emitfrom);

            return res;
        }

        private JSONObject ParseSphereShape(ParticleSystem.ShapeModule shape)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("type", "ParticleSphereShape");
            res.AddField("data", data);
            data.AddField("radius", shape.radius);
            data.AddField("arc", shape.arc);
            int radiusThickness = 1;
            if (shape.shapeType == ParticleSystemShapeType.SphereShell) {
                radiusThickness = 0;
            }
            data.AddField("radiusThickness", radiusThickness);
#if UNITY_2017_1_OR_NEWER
            data.AddField("radiusThickness", shape.radiusThickness);
            data.AddField("arcSpread", shape.arcSpread);
            data.AddField("arcMode", GetArcMode(shape));
            data.AddField("position", GetVect3(shape.position));
            data.AddField("rotation", GetVect3(shape.rotation));
            data.AddField("scale", GetVect3(shape.scale));
#endif
            return res;
        }
        private JSONObject ParseCircleShape(ParticleSystem.ShapeModule shape)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("type", "ParticleCircleShape");
            res.AddField("data", data);
            data.AddField("radius", shape.radius);
            data.AddField("arc", shape.arc);
            int radiusThickness = 1;
            if (shape.shapeType == ParticleSystemShapeType.CircleEdge) {
                radiusThickness = 0;
            }
            data.AddField("radiusThickness", radiusThickness);
#if UNITY_2017_1_OR_NEWER
            data.AddField("radiusThickness", shape.radiusThickness);
            data.AddField("arcMode", GetArcMode(shape));
            data.AddField("arcSpread", shape.arcSpread);
            data.AddField("position", GetVect3(shape.position));
            data.AddField("rotation", GetVect3(shape.rotation));
            data.AddField("scale", GetVect3(shape.scale));
#endif
            return res;
        }

        private JSONObject ParseBurst(ParticleSystem.Burst burst)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("time", burst.time);
#if UNITY_2017_1_OR_NEWER
            res.AddField("count", ParseMinMaxCurve(burst.count));
            res.AddField("cycles", burst.cycleCount);
            res.AddField("interval", burst.repeatInterval);
#else
        res.AddField("count", ParseTwoConstants(burst.maxCount, burst.minCount));
#endif
            res.AddField("probability", 1);
            return res;
        }

        private JSONObject ParseBox(ParticleSystem.ShapeModule shape)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("type", "ParticleBoxShape");
            res.AddField("data", data);
            int from = 1;
            if (shape.shapeType == ParticleSystemShapeType.BoxEdge)
            {
                from = 3;
            }
            if (shape.shapeType == ParticleSystemShapeType.BoxShell)
            {
                from = 2;
            }
            data.AddField("emitFrom", from);
#if UNITY_2017_1_OR_NEWER
            data.AddField("boxThickness", GetVect3(shape.boxThickness));
            data.AddField("position", GetVect3(shape.position));
            data.AddField("rotation", GetVect3(shape.rotation));
            data.AddField("scale", GetVect3(shape.scale));
#else
            data.AddField("scale", GetVect3(shape.box));
#endif
            return res;
        }

        private JSONObject ParseHemisphere(ParticleSystem.ShapeModule shape)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("type", "ParticleHemiSphereShape");
            res.AddField("data", data);
            data.AddField("radius", shape.radius);
            data.AddField("arc", shape.arc);
            int radiusThickness = 1;
            if (shape.shapeType == ParticleSystemShapeType.HemisphereShell) {
                radiusThickness = 0;
            }
            data.AddField("radiusThickness", radiusThickness);
#if UNITY_2017_1_OR_NEWER
            data.AddField("radiusThickness", shape.radiusThickness);
            data.AddField("arcMode", GetArcMode(shape));
            data.AddField("arcSpread", shape.arcSpread);
            data.AddField("position", GetVect3(shape.position));
            data.AddField("rotation", GetVect3(shape.rotation));
            data.AddField("scale", GetVect3(shape.scale));
#endif
            return res;
        }
/*
        private JSONObject ParseSingleSidedEdge(ParticleSystem.ShapeModule shape)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("type", "ParticleSingleSidedEdgeShape");
            res.AddField("data", data);
            data.AddField("radius", shape.radius);
#if UNITY_2017_1_OR_NEWER
            data.AddField("radiusMode", GetRadiusMode(shape));
            data.AddField("radiusSpread", shape.radiusSpread);
            data.AddField("position", GetVect3(shape.position));
            data.AddField("rotation", GetVect3(shape.rotation));
            data.AddField("scale", GetVect3(shape.scale));
#endif
            return res;
        }
*/
        private JSONObject GetVect3(Vector3 vec)
        {
            JSONObject res = new JSONObject(JSONObject.Type.ARRAY);
            res.Add(vec.x);
            res.Add(vec.y);
            res.Add(vec.z);
            return res;
        }

        private object TryGetContainProperty(object instance, string propertyName)
        {
            if (instance != null && !string.IsNullOrEmpty(propertyName))
            {
                PropertyInfo _findedPropertyInfo = instance.GetType().GetProperty(propertyName);
                if (_findedPropertyInfo != null)
                {
                    return _findedPropertyInfo.GetValue(instance, null);
                }
            }
            return null;
        }
    }

}
