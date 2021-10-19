using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.SceneManagement;

/**
 * scene导出器，输入scene实例，输出json，或者直接往context挂东西
 */

namespace WeChat {

    public class WXScene : WXResource {

        protected override string GetResourceType () {
            return "scene";
        }

        public enum LightMapType {
            Subtractive = 0,
            ShadowMask = 1
        }
        private Scene gameScene;
        private string exportName;
        private string scenePath;
        public WXScene (Scene scene, string scenePath) : base (scenePath) {
            gameScene = scene;
            if (scenePath == "" || scenePath == null) {
                scenePath = "Untitled.unity";
            }
            this.scenePath = scenePath.Replace (".unity", ".scene");
            int lastDot = scenePath.LastIndexOf ('.');
            int lastBar = scenePath.LastIndexOf ('/');
            if (lastDot > 0) {
                exportName = scenePath.Substring (lastBar + 1, (lastDot == 0 ? scenePath.Length : lastDot) - lastBar - 1);
            }
            if (unityAssetPath == null || unityAssetPath == "") {
                ErrorUtil.ExportErrorReporter.create ()
                    .setResource (this)
                    .error (ErrorUtil.ErrorCode.Scene_PathError, "Scene文件的unity路径为空");
            }
        }

        public override string GetHash () {
            string assetVersion = WXUtility.GetMD5FromAssetPath (gameScene.path);

            return assetVersion;
        }

        public override string GetExportPath () {
            return scenePath;
        }

        private WXHierarchyContext hierarchyContext;
        protected override JSONObject ExportResource (ExportPreset preset) {
            hierarchyContext = new WXHierarchyContext (preset, scenePath);

            // 初始化输出的JSON对象
            JSONObject sceneJSONObject = new JSONObject (JSONObject.Type.OBJECT);

            JSONObject metaJson = new JSONObject (JSONObject.Type.OBJECT);
            sceneJSONObject.AddField ("meta", metaJson);

            // 填充meta
            metaJson.AddField ("name", exportName);
            metaJson.AddField ("type", /*WXBeefBall.HierarchyType == WXBeefBall.EHierarchyType.TwoD ? "2D" : */ "3D");

            JSONObject configJson = new JSONObject (JSONObject.Type.OBJECT);
            metaJson.AddField ("config", configJson);

            JSONObject lightJson = new JSONObject (JSONObject.Type.OBJECT);
            GetLightConfig (lightJson, hierarchyContext);
            configJson.AddField ("light", lightJson);

            GameObject[] root = gameScene.GetRootGameObjects ();

            // WXEntity rootObj = hierarchyContext.MakeEntity(null);
            // rootObj.active = true;
            // rootObj.name = "Scene<" + exportName + ">";
            // rootObj.components.Add(hierarchyContext.AddComponent(new WXTransform3DComponent(null, true), null));

            foreach (GameObject obj in root) {
                if ((preset.exportConfigs as HierarchyExportConfig).ignoreNonActive &&
                    (!obj.activeSelf || !obj.activeInHierarchy)
                )
                    continue;

                obj.name = "Scene<" + exportName + ">";
                // 开始遍历
                WXEntity leafEntity = hierarchyContext.IterateGameObject (obj);
            }
            sceneJSONObject.AddField ("gameObjectList", hierarchyContext.GetGameObjectListJSON ());
            sceneJSONObject.AddField ("componentList", hierarchyContext.GetComponentListJSON ());
            foreach (string resource in hierarchyContext.resourceList) {
                AddDependencies (resource);
            }
            JSONObject editorInfo = new JSONObject (JSONObject.Type.OBJECT);
            editorInfo.AddField ("assetVersion", 2);
            sceneJSONObject.AddField ("editorInfo", editorInfo);
            return sceneJSONObject;
        }

        private void GetLightConfig (JSONObject propsObj, WXHierarchyContext context) {
            if (RenderSettings.ambientMode == AmbientMode.Skybox) {
                propsObj.AddField ("ambientMode", 0);
            } else if (RenderSettings.ambientMode == AmbientMode.Trilight) {
                propsObj.AddField ("ambientMode", 1);
            } else // if (RenderSettings.ambientMode == AmbientMode.Flat)
            {
                propsObj.AddField ("ambientMode", 2);
            }
            Color ambientLight = RenderSettings.ambientLight;
            JSONObject ambientLightObj = new JSONObject (JSONObject.Type.ARRAY);
            ambientLightObj.Add (ambientLight.r);
            ambientLightObj.Add (ambientLight.g);
            ambientLightObj.Add (ambientLight.b);
            propsObj.AddField ("ambientColor", ambientLightObj);
            propsObj.AddField ("ambientIntensity", RenderSettings.ambientIntensity);
            JSONObject ambientSkyColorObj = new JSONObject (JSONObject.Type.ARRAY);
            ambientSkyColorObj.Add (RenderSettings.ambientSkyColor.r);
            ambientSkyColorObj.Add (RenderSettings.ambientSkyColor.g);
            ambientSkyColorObj.Add (RenderSettings.ambientSkyColor.b);
            ambientSkyColorObj.Add (RenderSettings.ambientSkyColor.a);
            propsObj.AddField ("ambientSkyColor", ambientSkyColorObj);

            JSONObject ambientEquatorColorObj = new JSONObject (JSONObject.Type.ARRAY);
            ambientEquatorColorObj.Add (RenderSettings.ambientEquatorColor.r);
            ambientEquatorColorObj.Add (RenderSettings.ambientEquatorColor.g);
            ambientEquatorColorObj.Add (RenderSettings.ambientEquatorColor.b);
            ambientEquatorColorObj.Add (RenderSettings.ambientEquatorColor.a);
            propsObj.AddField ("ambientEquatorColor", ambientEquatorColorObj);

            JSONObject ambientGroundColorObj = new JSONObject (JSONObject.Type.ARRAY);
            ambientGroundColorObj.Add (RenderSettings.ambientGroundColor.r);
            ambientGroundColorObj.Add (RenderSettings.ambientGroundColor.g);
            ambientGroundColorObj.Add (RenderSettings.ambientGroundColor.b);
            ambientGroundColorObj.Add (RenderSettings.ambientGroundColor.a);
            propsObj.AddField ("ambientGroundColor", ambientGroundColorObj);

            object Rs = RenderSettings.defaultReflectionMode;
            if (RenderSettings.defaultReflectionMode == DefaultReflectionMode.Custom) {
                //saveCubeMapFile(RenderSettings.customReflection, propsObj, false, null);
                propsObj.AddField ("reflectionIntensity", RenderSettings.reflectionIntensity);
            } else {
                propsObj.AddField ("reflectionResolution", RenderSettings.defaultReflectionResolution);
            }

            // saveLightMapFile(propsObj);
            propsObj.AddField ("fogMode", 0);
            if (RenderSettings.fog) {
                JSONObject jSONObject5 = new JSONObject (JSONObject.Type.ARRAY);
                Color fogColor = RenderSettings.fogColor;
                jSONObject5.Add (fogColor.r);
                jSONObject5.Add (fogColor.g);
                jSONObject5.Add (fogColor.b);
                propsObj.AddField ("fogColor", jSONObject5);
                propsObj.AddField ("fogMode", (int) RenderSettings.fogMode);
            }
            if (RenderSettings.fogMode == FogMode.Linear) {
                propsObj.AddField ("fogStart", RenderSettings.fogStartDistance);
                propsObj.AddField ("fogRange", RenderSettings.fogEndDistance - RenderSettings.fogStartDistance);
            } else {
                propsObj.AddField ("fogDensity", RenderSettings.fogDensity);
            }
            if (RenderSettings.skybox != null && WXMaterial.IsMaterialRegistered(RenderSettings.skybox))
            {
                WXMaterial materialConverter = new WXMaterial(RenderSettings.skybox, null);
                propsObj.AddField("skyBox", AddDependencies(materialConverter));
            }
            else
            {
                propsObj.AddField("skyBox", new JSONObject(JSONObject.Type.NULL));
            }            

            // lightMapMode
            JSONObject subtractiveShadowColorObj = new JSONObject (JSONObject.Type.ARRAY);

#if UNITY_5_6_OR_NEWER
            Color subtractiveShadowColor = RenderSettings.subtractiveShadowColor;
#else
            // before 5.5 use default Color
            Color subtractiveShadowColor = new Color (0.42f, 0.48f, 0.63f, 1f);
#endif
            subtractiveShadowColorObj.Add (subtractiveShadowColor.r);
            subtractiveShadowColorObj.Add (subtractiveShadowColor.g);
            subtractiveShadowColorObj.Add (subtractiveShadowColor.b);
            subtractiveShadowColorObj.Add (subtractiveShadowColor.a);
            propsObj.AddField ("subtractiveShadowColor", subtractiveShadowColorObj);

            bool shadowMaskFlag = false;
            JSONObject lightMapDatasObj = new JSONObject (JSONObject.Type.ARRAY);
            LightmapData[] lightmaps = LightmapSettings.lightmaps;
            if (lightmaps != null && lightmaps.Length != 0) {
                for (int i = 0; i < lightmaps.Length; i++) {
                    LightmapData lightmap = lightmaps[i];

                    JSONObject lightMapDescObj = new JSONObject (JSONObject.Type.OBJECT);
#if UNITY_5_6_OR_NEWER
                    if (
                        lightmap.lightmapColor == null ||
                        "" == AssetDatabase.GetAssetPath (lightmap.lightmapColor.GetInstanceID ())
                    ) {
                        continue;
                    }

                    if (lightmap.shadowMask) {
                        shadowMaskFlag = true;
                        WXLightMap textureConverter = new WXLightMap (lightmap.shadowMask);
                        lightMapDescObj.AddField ("shadowMask", AddDependencies (textureConverter));

                        WXLightMap textureConverter2 = new WXLightMap (lightmap.lightmapColor);
                        lightMapDescObj.AddField ("color", AddDependencies (textureConverter2));

                    } else {
                        WXLightMap textureConverter = new WXLightMap (lightmap.lightmapColor);
                        lightMapDescObj.AddField ("color", AddDependencies (textureConverter));
                    }
#else
                    if (
                        lightmap.lightmapLight == null ||
                        "" == AssetDatabase.GetAssetPath (lightmap.lightmapLight.GetInstanceID ())
                    ) {
                        continue;
                    }

                    WXLightMap textureConverter = new WXLightMap (lightmap.lightmapLight);
                    lightMapDescObj.AddField ("color", AddDependencies (textureConverter));
#endif
                    lightMapDatasObj.Add (lightMapDescObj);

                }

            }

            propsObj.AddField ("lightMapDatas", lightMapDatasObj);

            // 0:subtractive 1:shadowMask
            propsObj.AddField ("lightMapType", shadowMaskFlag ? (int) LightMapType.ShadowMask : (int) LightMapType.Subtractive);

            // reflection probe
            JSONObject reflectionCubeDataObj = new JSONObject (JSONObject.Type.ARRAY);
            List<string> reflectionMaps = ReflectionProbeUtil.getReflectionEquirectangular (scenePath);
            if (reflectionMaps.Count > 0) {
                for (int i = 0; i < reflectionMaps.Count; i++) {
                    JSONObject reflectionMapDescObj = new JSONObject (JSONObject.Type.OBJECT);
                    WXEnvironmentMap mapConverter = new WXEnvironmentMap (reflectionMaps[i]);
                    reflectionMapDescObj.AddField ("color", AddDependencies (mapConverter));
                    reflectionCubeDataObj.Add (reflectionMapDescObj);
                }
            }
            propsObj.AddField ("panoramaDatas", reflectionCubeDataObj);

            // Spherical Harmonics
            JSONObject shDataObj = new JSONObject (JSONObject.Type.ARRAY);
            var coefficients = new float[9][];
            UnityEngine.Rendering.SphericalHarmonicsL2 shs;
            LightProbes.GetInterpolatedProbe (new UnityEngine.Vector3 (), null, out shs);
            if (shs != null) {
                for (int i = 0; i < 9; i++) {
                    coefficients[i] = new float[3];
                    for (var j = 0; j < 3; j++)
                    {
                        coefficients[i][j] = shs[j, i];
                        Debug.Log (coefficients[i][j]);
                        shDataObj.Add(coefficients[i][j]);
                    }
                }
                propsObj.AddField ("shCoefficients", shDataObj);
            } else {
                Debug.LogWarning ("There is no baked light probe.");
            }


        }

        private void GetPhysicsConfig (JSONObject phyObj, WXHierarchyContext context) {

            JSONObject gravity = new JSONObject (JSONObject.Type.ARRAY);
            gravity.Add (Physics.gravity.x);
            gravity.Add (Physics.gravity.y);
            gravity.Add (Physics.gravity.z);
            phyObj.AddField ("gravity", gravity);

            phyObj.AddField ("bounceThreshold", Physics.bounceThreshold);
#if UNITY_2019_1_OR_NEWER
            phyObj.AddField ("defaultMaxAngularSpeed", Physics.defaultMaxAngularSpeed);
#endif
            phyObj.AddField ("defaultSolverIterations", Physics.defaultSolverIterations);
            phyObj.AddField ("defaultSolverVelocityIterations", Physics.defaultSolverVelocityIterations);
            phyObj.AddField ("sleepThreshold", Physics.sleepThreshold);
            phyObj.AddField ("defaultContactOffset", Physics.defaultContactOffset);
        }
    }
}