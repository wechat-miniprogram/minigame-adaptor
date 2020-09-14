using System;
using System.Collections.Generic;
using UnityEngine;

namespace WeChat
{
    // [AttributeUsage(AttributeTargets.Class |
    // AttributeTargets.Constructor |
    // AttributeTargets.Field |
    // AttributeTargets.Method |
    // AttributeTargets.Property,
    // AllowMultiple = true)]

    // public class BeefballSerialize : Attribute
    // {
    //     public string __beefballSerialize;

    //     public BeefballSerialize(string __beefballSerialize)
    //     {
    //         this.__beefballSerialize = __beefballSerialize;
    //     }
    // }

    class WXScript : WXComponent
    {

        private MonoBehaviour script;
        private GameObject gameObject;
        private string __uuid;

        public override string getTypeName()
        {
            return "__ScriptEditorComponent";
        }

        public WXScript(MonoBehaviour script, GameObject gameObject, string __uuid)
        {
            this.gameObject = gameObject;
            this.script = script;
            this.__uuid = __uuid;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);

            json.AddField("type", getTypeName());
            json.AddField("data", data);
            data.AddField("__uuid", this.__uuid);
            return json;
        }
    }

}
