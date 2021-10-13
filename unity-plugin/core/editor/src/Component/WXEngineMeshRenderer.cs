using System;
using UnityEditor;
using UnityEngine;
using UnityEngine.Rendering;

namespace WeChat {

    public class WXMeshRenderer : WXComponent {
        private MeshRenderer renderer;

        public override string getTypeName () {
            return "MeshRenderer";
        }

        public WXMeshRenderer (MeshRenderer renderer) {
            this.renderer = renderer;
        }

        protected override JSONObject ToJSON (WXHierarchyContext context) {
            JSONObject json = new JSONObject (JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject (JSONObject.Type.OBJECT);
            json.AddField ("type", "MeshRenderer");
            json.AddField ("data", data);

            data.AddField ("active", renderer.enabled);

            JSONObject materialArray = new JSONObject (JSONObject.Type.ARRAY);
            Material[] materials = renderer.sharedMaterials;
            int materialCount = 0;
            foreach (Material material in materials) {
                if (material != null) {
                    WXMaterial materialConverter = new WXMaterial (material, renderer);
                    string materialPath = materialConverter.Export (context.preset);
                    materialArray.Add (materialPath);
                    context.AddResource (materialPath);
                    materialCount++;
                }
            }
            data.AddField ("materials", materialArray);

            MeshFilter meshFilter = renderer.gameObject.GetComponent<MeshFilter> ();
            if (meshFilter != null && meshFilter.sharedMesh != null) {
                Mesh mesh = meshFilter.sharedMesh;
                WXMesh meshConverter = new WXMesh (mesh, materialCount);
                string meshPath = meshConverter.Export (context.preset);
                data.AddField ("mesh", meshPath);
                context.AddResource (meshPath);
            } else {
                ErrorUtil.ExportErrorReporter.create ()
                    .setGameObject (renderer.gameObject)
                    .setHierarchyContext (context)
                    .error (ErrorUtil.ErrorCode.MeshRenderer_MeshNotFound, "Mesh资源转换失败，没法拿到对应的MeshFilter或者它上面的mesh");
            }

            int lightmapIndex = renderer.lightmapIndex;
            JSONObject litmapScaleArr = new JSONObject (JSONObject.Type.ARRAY);
            data.AddField ("lightMapScaleOffset", litmapScaleArr);
            litmapScaleArr.Add (renderer.lightmapScaleOffset.x);
            litmapScaleArr.Add (renderer.lightmapScaleOffset.y);
            litmapScaleArr.Add (renderer.lightmapScaleOffset.z);
            litmapScaleArr.Add (renderer.lightmapScaleOffset.w);
            data.AddField ("lightMapIndex", lightmapIndex);

            ShadowCastingMode mode = renderer.shadowCastingMode;
            StaticEditorFlags shadowFlags = GameObjectUtility.GetStaticEditorFlags (renderer.gameObject);
#if UNITY_2019_2_OR_NEWER
            if (mode == ShadowCastingMode.Off || (shadowFlags & StaticEditorFlags.ContributeGI) != 0)
#else
                if (mode == ShadowCastingMode.Off || (shadowFlags & StaticEditorFlags.LightmapStatic) != 0)
#endif
            {
                data.AddField ("castShadow", false);
            } else {
                data.AddField ("castShadow", true);
            }

            bool receiveShadow = renderer.receiveShadows;
            data.AddField ("receiveShadow", receiveShadow);
            return json;
        }
    }

}

// WXBeefBallComponentExporter.TypeStruct data = new WXBeefBallComponentExporter.TypeStruct();
// data.componentType = typeof(Transform);
// data.exporterType = typeof(WXBBTransform3DComponent);
// WXBeefBallComponentExporter.typeMap.Add()