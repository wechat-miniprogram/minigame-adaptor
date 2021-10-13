
using UnityEngine;
using UnityEditor;

namespace WeChat {
    public class WXPhysicsMaterial : WXResource {
        private PhysicMaterial material;
        string path;
        string _fileName;
        public WXPhysicsMaterial (PhysicMaterial mat): base(AssetDatabase.GetAssetPath(mat.GetInstanceID())) {
            this.material = mat;
            this.path = wxFileUtil.cleanIllegalChar(unityAssetPath, false);
            _fileName = this.path.Split('.')[0];
        }

        protected override string GetResourceType () {
            return "physicmaterial";
        }
        public override string GetExportPath () {
            return _fileName + ".physicmaterial";
        }

        public override string GetHash () {
            return WXUtility.GetMD5FromString(path);
        }

        protected override JSONObject ExportResource (ExportPreset preset) {
            //JSONObject meta = JSONObject.Create ("{\"file\": {}}");
            JSONObject metadata = new JSONObject();
            WritePhysicsMaterial(ref metadata);
            //meta.AddField("data", metadata);
            //meta.AddField("version", 2);
            return metadata;
        }

        public JSONObject WritePhysicsMaterial (ref JSONObject data) {

            if (this.material != null)
            {
                data.AddField("name", this.material.name);
                data.AddField("dynamicFriction", this.material.dynamicFriction);
                data.AddField("staticFriction", this.material.staticFriction);
                data.AddField("bounciness", this.material.bounciness);
                data.AddField("frictionCombine", (int)this.material.frictionCombine);
                data.AddField("bounceCombine", (int)this.material.bounceCombine);
            }

            return data;
        }
    }
}