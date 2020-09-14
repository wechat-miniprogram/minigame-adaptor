using UnityEngine;
using UnityEditor;
using System.IO;
using System.Collections;
using System.Collections.Generic;



namespace WeChat
{
    public class WXEngineRawResourceCollection : WXComponent
    {
        WXRawResourceCollection collection_;

        public override string getTypeName()
        {
            return "RawResourceCollection";
        }

        public WXEngineRawResourceCollection(WXRawResourceCollection collection)
        {
            collection_ = collection;
        }
        
        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());
            json.AddField("data", data);

            JSONObject res_paths_json = new JSONObject(JSONObject.Type.ARRAY);
            data.AddField("resources", res_paths_json);


            foreach (Object file in collection_.ResourceFiles)
            {
                if (file != null)
                {
                    string file_path = AssetDatabase.GetAssetPath(file.GetInstanceID());
                    WXRawResource resourceConverter = new WXRawResource(file_path);
                    string ret_path = resourceConverter.Export(context.preset);
                    if (ret_path != "")
                    {
                        res_paths_json.Add(ret_path);
                        context.AddResource(ret_path);
                    }
                }
            }
            
            return json;
        }
                        
    }
}

