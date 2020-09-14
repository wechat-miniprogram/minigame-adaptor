using System;
using System.Reflection;
using System.Collections.Generic;

using UnityEditor;
using UnityEngine;
using WeChat;

namespace WeChat {
    public class WXEngineMonoBehaviour : WXComponent {
        private MonoBehaviour behaviour;

        public override string getTypeName() {
            var result = behaviour ? behaviour.GetType().ToString() : "UnityEngine.MonoBehaviour";
            return WXMonoBehaviourExportHelper.EscapeNamespace(result);
        }

        public WXEngineMonoBehaviour(MonoBehaviour behaviour) {
            this.behaviour = behaviour;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context) {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());
            json.AddField("data", data);

            data.AddField("active", true);


            // ngui prefab don't need binding script
            if (this.behaviour != null /* && !WXBridge.isNGUIPreset */) {
               
                var script = MonoScript.FromMonoBehaviour(this.behaviour);
                string path = new WXEngineScript(script).Export(context.preset);

                context.AddResource(path);
                data.AddField("__uuid", path);
            }

           


            if (this.behaviour != null) {
                Type myObjectType = behaviour.GetType();
                FieldInfo[] fields = myObjectType.GetFields(BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.Public);

                foreach (FieldInfo field in fields) {
                    if (!field.IsDefined(typeof(SerializeField)) && !field.IsPublic) {
                        continue;
                    }
                    WXMonoBehaviourPropertiesHandler.HandleProperty(field, behaviour, data, context);
                }
            }


            // clear {}
            json.GetField("data", (JSONObject _data) => {
                var shouldBeRemoved = new List<string>();
                foreach(var _key in _data.keys) {
                    // Debug.Log(_type);
                    // Debug.Log(_data[_type] + " == " + _data[_type].GetType().ToString());
                    var _value = _data[_key].ToString();
                    // Debug.Log("key:"+_key+" value:"+_value);

                    if (_data[_key].IsNull || _value == "{}") {
                        shouldBeRemoved.Add(_key);
                        // _data.RemoveField(_key);
                        // Debug.Log("remove: " + _key);
                    }
                }

                foreach(var k in shouldBeRemoved) {
                    _data.RemoveField(k);
                }
            });
            return json;
        }
    }

}