using UnityEngine;
using UnityEditor;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.IO;
// using System.Text.RegularExpressions;
using Newtonsoft.Json;
// using WeChat;

// 将 MonoBehaviour 脚本作为资源导出，需要考虑序列化属性，序列化为小游戏平台可识别的 .json 文件
// 将 Namespace UnityEngine 转换为 MiniGameAdaptor，适配小游戏接口
namespace WeChat {
    
    public static class WXMonoBehaviourExportHelper {

        // property black list
        private static readonly HashSet<string> _propertyBlacklist = new HashSet<string> {
            // NGUI class
            "UIRoot",
            "UICanvas",
            "UIPanel",
            "UISprite",
            "UIScrollView",
            "UIScrollBar",
            "UITable",
            "UIInput",
            "UITexture",
            "UIToggle",
            "UIWidget",
            "UIButton",
            "UIAnchor",
            "UIAtlas",
            "UIGrid",
            "UILabel",
            "UICamera",
            "UIFont",
            "UIProgressBar",
            "UIEventTrigger",
            "TweenPosition",
            "TweenRotation",
            "TweenAlpha",
            "UIDragScrollView",
            // UGUI class
            "UnityEngine.UI.Button",
            "UnityEngine.UI.Toggle",
            "UnityEngine.UI.ToggleGroup",
            "UnityEngine.UI.Image",
            "UnityEngine.UI.Text",
            "UnityEngine.UI.RawImage",
            "UnityEngine.UI.Slider",
            "UnityEngine.UI.Canvas",
            "UnityEngine.UI.Mask",
            "UnityEngine.UI.ScrollRect",
            "UnityEngine.UI.CanvasScaler",
            "UnityEngine.UI.InputField"
        };

        private static readonly Dictionary<string, string> _engineNGUISupportWhitelist = new Dictionary<string, string> {
            // not support, thus value is ""
            { "UIRoot", "" },
            { "UIPanel", "" },
            { "UIProgressBar", "" },

            { "UISprite", "WXUISpriteScript" },
            { "UILabel", "WXUILabel" },
            { "UIInput", "WXUITextInput" },
            { "UITexture", "WXUITextureScript" },
            { "UIWidget", "WXUIWidget" },
            { "UIGrid", "WXUIGrid" },
            { "UIAnchor", "WXUIAnchor" },
            { "UITable", "WXUITable" },
            { "UIScrollView", "WXUIScrollView" },
            { "UIButton", "WXUIButtonScript" },
            { "UIToggle", "WXUIToggle" },
            { "UIAtlas", "WXUIAtlas" }
        };

        private static readonly Dictionary<string, string> _engineUGUISupportWhitelist = new Dictionary<string, string> {
            // not support, thus value is ""


            { "UnityEngine.UI.Button", "WXUIUButtonScript" },
            { "UnityEngine.UI.Toggle", "WXUIUToggleScript" },
            { "UnityEngine.UI.ToggleGroup", "WXUIUToggleGroupScript" },
            { "UnityEngine.UI.Text", "WXUIULabel" },
            { "UnityEngine.UI.Slider", "WXUIUSliderScript" },
            { "UnityEngine.UI.Mask", "WXUIUMask" },
            { "UnityEngine.UI.ScrollRect", "WXUIUScrollRectScript" },

            { "UnityEngine.UI.CanvasScaler", "WXUIUCanvasScalerScript" },
            { "UnityEngine.UI.InputField", "WXUIUInputFieldScript" }
        };

        public static HashSet<GameObject> exportedResourcesSet = new HashSet<GameObject>();

        // [MenuItem("WeChat/Debug/Clear Prefab Set")]
        public static void ClearPrefabSet() {
            exportedResourcesSet.Clear();
        }

        public static bool IsInBlackList(Type type) {
            return type != null ? _propertyBlacklist.Contains(type.FullName) : false;
        }

        public static bool IsInNGUIWhiteList(Type type) {
            return type != null ? _engineNGUISupportWhitelist.ContainsKey(type.FullName) : false;
        }

        public static bool IsInUGUIWhiteList(Type type) {
            return type != null ? _engineUGUISupportWhitelist.ContainsKey(type.FullName) : false;
        }

        public static Type GetWXNGUIComponentType(Type type) {
            var tstr = type != null && IsInNGUIWhiteList(type) ? _engineNGUISupportWhitelist[type.FullName] : null;
            // Debug.Log("WXEngine." + tstr);

            if (tstr != null) {

                // not support type
                // just return transform2d
                if (tstr.Equals("")) {
                    return Type.GetType("WXEngine.WXTransform2DComponent");
                }

                Type t = Type.GetType("WXEngine." + tstr);
                return t;
            }

            return null;
        }
        public static Type GetWXUGUIComponentType(Type type) {
            var tstr = type != null && IsInUGUIWhiteList(type) ? _engineUGUISupportWhitelist[type.FullName] : null;
            // Debug.Log("WXEngine." + tstr);

            if (tstr != null) {

                // not support type
                // just return transform2d
                if (tstr.Equals("")) {
                    return Type.GetType("WXEngine.WXUGUITransform2DComponent");
                }

                Type t = Type.GetType("WXEngine." + tstr);
                return t;
            }

            return null;
        }

    public static string GetValidTypeNameUnescapeNamespace(Type type) {
            string newName = type.FullName;
            if (newName.EndsWith("+<>c", StringComparison.Ordinal)) {
                newName = newName.Substring(0, newName.Length - 4);
            } else if (newName.Contains("+")) {
                newName = newName.Replace('+', '.');
            }
            if (newName.Contains("`")) {
                newName = newName.Replace('`', '$');
            }
            return newName;
        }

        public static string EscapeNamespace(string input) {
            return Utils.EscapeNamespace(input);
        }

        public static string EscapeNamespaceSimple(this string input) {
            return EscapeNamespace(input);
        }
    }

    public static class WXMonoBehaviourPropertiesHandler {

        private static Dictionary<Type, Func<object, WXHierarchyContext, JSONObject>> propertiesHandlerDictionary;
        public static bool ContainsProperties(Type t) {
            return propertiesHandlerDictionary.ContainsKey(t);
        }

        static WXMonoBehaviourPropertiesHandler() {
            propertiesHandlerDictionary = new Dictionary<Type, Func<object, WXHierarchyContext, JSONObject>>();

            RegisterBasicProperties();
            RegisterUnityProperties();
        }

        public static void AddPropertyHandler(Type type, Func<object, WXHierarchyContext, JSONObject> func) {
            if (!propertiesHandlerDictionary.ContainsKey(type)) {
                propertiesHandlerDictionary.Add(type, func);
            }
        }

        public static JSONObject InvokePropertyHandler(Type type, object obj, WXHierarchyContext context) {
            if (propertiesHandlerDictionary.ContainsKey(type) && obj != null) {
                return propertiesHandlerDictionary[type](obj, context);
            }
            return null;
        }

        public static void HandleProperty(FieldInfo field, object obj, JSONObject data, WXHierarchyContext context) {
            try {
                innerHandleProperty(field.FieldType, field, obj, data, context);
            } catch (Exception e) {
                if (ExportLogger.LOGGING)
                    ExportLogger.AddLog(new ExportLogger.Log(ExportLogger.Log.Type.Exception, "Type: " + field.FieldType + "\nObject: " + obj + "\nJson: " + data, e));

                Debug.LogException(e);
            }
        }

        // handle all Serializable class recursively
        private static void SerializableHandler(Type _type, JSONObject _data, object _obj, WXHierarchyContext context) {
            if (_obj == null || _type == null) return;
            // get [SerializeField] && Public properties
            var fields = _type.GetFields(BindingFlags.NonPublic |
                                         BindingFlags.Instance  |
                                         BindingFlags.Public).Where(f => 
                                            !f.IsDefined(typeof(NonSerializedAttribute)) &&
                                            !f.IsDefined(typeof(HideInInspector))        &&
                                            (f.IsDefined(typeof(SerializeField)) || f.IsPublic));
            foreach (var f in fields) {
                // get non-permitive Serializable object && non-IEnumerable object
                Type fType = f.FieldType;
                if (fType == null) continue;

                // enum
                // should not do inner recursion for the enum type or you will get { value__: i } object returned
                if (fType.IsEnum) {
                    var res = JSONObject.Create((int)f.GetValue(_obj));
                    if (res) {
                        _data.AddField(f.Name, res);
                    }
                    continue;
                }

                if (!propertiesHandlerDictionary.ContainsKey(fType) &&
                    !fType.IsArray &&
                    (!fType.IsGenericType || fType.GetGenericTypeDefinition() != typeof(List<>)) &&
                    fType.IsSerializable) {
                    // Serializable object inside the Serializable object, thus do the recursion
                    var _d = new JSONObject(JSONObject.Type.OBJECT);
                    _data.AddField(f.Name, _d);
                    SerializableHandler(fType, _d, f.GetValue(_obj), context);
                    continue;
                } else {
                    innerHandleProperty(fType, f, _obj, _data, context);
                    continue;
                }
            }
        }

        // inner recursion method, thus each if-statement must have @return in the end of the following block.
        private static void innerHandleProperty(Type type, FieldInfo field, object obj, JSONObject data, WXHierarchyContext context) {
            if (ExportLogger.LOGGING)
                ExportLogger.AddLog(new ExportLogger.Log(ExportLogger.Log.Type.Inner, "Type: " + type + "\nObject: " + obj + "\nJson: " + data));

            if (obj  == null                                    ||
                type == null                                    || 
                type == typeof(System.Object)                   ||
                field.IsDefined(typeof(NonSerializedAttribute)) ||
                field.IsDefined(typeof(HideInInspector))) return;

            if (WXBridge.isNGUIPreset) {
                Type wxnguiType = WXMonoBehaviourExportHelper.GetWXNGUIComponentType(type);
                if (wxnguiType != null) {
                    var nativeComp = (Component)field.GetValue(obj);

                    if (nativeComp != null) {
                        var go = nativeComp.gameObject;
                        Debug.Log(nativeComp);
                        var entity = context.MakeEntity(go);

                        // 特殊处理
                        if (wxnguiType.FullName == "WXEngine.WXTransform2DComponent") {
                            data.AddField(field.Name, context.AddComponentInProperty(
                                (WXComponent)Activator.CreateInstance(wxnguiType, (object)nativeComp.transform),
                                nativeComp.transform
                            ));
                        } else {
                            data.AddField(field.Name, context.AddComponentInProperty(
                                (WXComponent)Activator.CreateInstance(wxnguiType, nativeComp, go, entity),
                                nativeComp
                            ));
                        }
                    }
                }
            }

            if (WXBridge.isUGUIPreset) {
                Type wxuguiType = WXMonoBehaviourExportHelper.GetWXUGUIComponentType(type);
                if (wxuguiType != null) {
                    var nativeComp = (Component)field.GetValue(obj);

                    if (nativeComp != null) {
                        var go = nativeComp.gameObject;
                        Debug.Log(nativeComp);
                        var entity = context.MakeEntity(go);

                        // 特殊处理
                        if (wxuguiType.FullName == "WeChat.WXUGUITransform2DComponent") {
                            data.AddField(field.Name, context.AddComponent(
                                (WXComponent)Activator.CreateInstance(wxuguiType, (object)nativeComp.transform),
                                nativeComp.transform
                            ));
                        } else {
                            data.AddField(field.Name, context.AddComponent(
                                (WXComponent)Activator.CreateInstance(wxuguiType, nativeComp, go, entity),
                                nativeComp
                            ));
                        }
                    }
                }
            }

            if (WXBridge.isUGUIPreset) {
                Type wxuguiType = WXMonoBehaviourExportHelper.GetWXUGUIComponentType(type);
                if (wxuguiType != null) {
                    var nativeComp = (Component)field.GetValue(obj);

                    if (nativeComp != null) {
                        var go = nativeComp.gameObject;
                        Debug.Log(nativeComp);
                        var entity = context.MakeEntity(go);

                        // 特殊处理
                        if (wxuguiType.FullName == "WeChat.WXUGUITransform2DComponent") {
                            data.AddField(field.Name, context.AddComponent(
                                (WXComponent)Activator.CreateInstance(wxuguiType, (object)nativeComp.transform),
                                nativeComp.transform
                            ));
                        } else {
                            data.AddField(field.Name, context.AddComponent(
                                (WXComponent)Activator.CreateInstance(wxuguiType, nativeComp, go, entity),
                                nativeComp
                            ));
                        }
                    }
                }
            }

            if (WXMonoBehaviourExportHelper.IsInBlackList(type)) return;
            if (propertiesHandlerDictionary.ContainsKey(type)) {
                var res = InvokePropertyHandler(type, field.GetValue(obj), context);
                if (res) {
                    data.AddField(field.Name, res);
                }
                return;
            } else if (type.IsArray || (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(List<>))) {
                var res = InvokePropertyHandler(typeof(List<>), field.GetValue(obj), context);
                if (res) {
                    data.AddField(field.Name, res);
                }
                return;
            } else if (type.IsEnum) {
                var res = JSONObject.Create((int)field.GetValue(obj));
                if (res) {
                    data.AddField(field.Name, res);
                }
                return;
            } else if (type.IsSubclassOf(typeof(UnityEngine.Component)) || type == typeof(UnityEngine.GameObject)) {
                // Prefab or not
                var o = (UnityEngine.Object)field.GetValue(obj);
                GameObject go = null;

                if (o == null) { return; }
                if (type.IsSubclassOf(typeof(UnityEngine.Component))) {
                    go = ((Component)o).gameObject;
                }
                else if (type == typeof(UnityEngine.GameObject)) {
                    go = (GameObject)o;
                }
                var path = AssetDatabase.GetAssetPath(o);

                if (go.transform.IsChildOf(context.Root.transform) || path == "") {
                    if (type.IsSerializable) {
                        var _innerData = new JSONObject(JSONObject.Type.OBJECT);
                        data.AddField(field.Name, _innerData);
                        SerializableHandler(type, _innerData, field.GetValue(obj), context);
                        return;
                    }
                    innerHandleProperty(type.BaseType, field, obj, data, context);
                    return;
                }

                if (!WXMonoBehaviourExportHelper.exportedResourcesSet.Contains(go)) {
                    WXMonoBehaviourExportHelper.exportedResourcesSet.Add(go);
                    WXPrefab converter = new WXPrefab(go, path);
                    string prefabPath = converter.Export(ExportPreset.GetExportPreset("prefab"));
                    context.AddResource(prefabPath);
                }
            
                var prefabInfo = new JSONObject(JSONObject.Type.OBJECT);
                prefabInfo.AddField("type", type.FullName.EscapeNamespaceSimple());
                prefabInfo.AddField("path", path);
                
                var innerData = new JSONObject(JSONObject.Type.OBJECT); 
                innerData.AddField("type", "UnityPrefabWrapper");
                innerData.AddField("value", prefabInfo);
                data.AddField(field.Name, innerData);
                return;
            } else if (type.IsSerializable) {

                // data of serializable object as a new JSONObject to be added
                var innerData = new JSONObject(JSONObject.Type.OBJECT);
                data.AddField(field.Name, innerData);
                SerializableHandler(type, innerData, field.GetValue(obj), context);
                return;
            }
            innerHandleProperty(type.BaseType, field, obj, data, context);
        }

        private static void RegisterBasicProperties() {

            AddPropertyHandler(typeof(bool), (obj, context) => {
                return JSONObject.Create((bool)obj);
            });

            AddPropertyHandler(typeof(int), (obj, context) => {
                return JSONObject.Create((int)obj);
            });

            AddPropertyHandler(typeof(byte), (obj, context) => {
                return JSONObject.Create((byte)obj);
            });

            AddPropertyHandler(typeof(short), (obj, context) => {
                return JSONObject.Create((short)obj);
            });

            AddPropertyHandler(typeof(ushort), (obj, context) => {
                return JSONObject.Create((ushort)obj);
            });

            AddPropertyHandler(typeof(uint), (obj, context) => {
                return JSONObject.Create((uint)obj);
            });

            AddPropertyHandler(typeof(sbyte), (obj, context) => {
                return JSONObject.Create((int)obj);
            });

            AddPropertyHandler(typeof(long), (obj, context) => {
                return JSONObject.Create((long)obj);
            });

            AddPropertyHandler(typeof(decimal), (obj, context) => {
                return JSONObject.Create(Convert.ToInt64((decimal)obj));
            });

            AddPropertyHandler(typeof(ulong), (obj, context) => {
                return JSONObject.Create(Convert.ToInt64((ulong)obj));
            });

            AddPropertyHandler(typeof(float), (obj, context) => {
                return JSONObject.Create((float)obj);
            });

            AddPropertyHandler(typeof(double), (obj, context) => {
                ;
                return JSONObject.Create(Convert.ToSingle((double)obj));
            });

            AddPropertyHandler(typeof(string), (obj, context) => {
                var str = (string)obj;
                if (str == null) return JSONObject.CreateStringObject("");

                str = str.TrimEnd();
                str = str.Replace('\r', ' ');
                str = str.Replace("\"", "\\\"");
                return JSONObject.CreateStringObject(str);
            });

            AddPropertyHandler(typeof(char), (obj, context) => {
                string tmp = "";
                tmp += (char)obj;
                return JSONObject.CreateStringObject(tmp);
            });

        }

        private static void RegisterUnityProperties() {
            AddPropertyHandler(typeof(Vector2), (obj, context) => {
                Vector2 v = (Vector2)obj;
                if (v == null) return null;

                JSONObject vec2 = new JSONObject(JSONObject.Type.ARRAY);
                vec2.Add(v.x);
                vec2.Add(v.y);

                return vec2;
            });

            AddPropertyHandler(typeof(Vector3), (obj, context) => {
                Vector3 v = (Vector3)obj;
                if (v == null) return null;

                JSONObject vec3 = new JSONObject(JSONObject.Type.ARRAY);
                vec3.Add(v.x);
                vec3.Add(v.y);
                vec3.Add(v.z);

                return vec3;
            });

            AddPropertyHandler(typeof(Vector4), (obj, context) => {
                Vector4 v = (Vector4)obj;
                if (v == null) return null;

                JSONObject vec4 = new JSONObject(JSONObject.Type.ARRAY);
                vec4.Add(v.x);
                vec4.Add(v.y);
                vec4.Add(v.z);
                vec4.Add(v.w);

                return vec4;
            });

            AddPropertyHandler(typeof(Quaternion), (obj, context) => {
                Quaternion v = (Quaternion)obj;
                if (v == null) return null;

                JSONObject array4 = new JSONObject(JSONObject.Type.ARRAY);
                array4.Add(v.x);
                array4.Add(v.y);
                array4.Add(v.z);
                array4.Add(v.w);

                return array4;
            });


            AddPropertyHandler(typeof(Matrix4x4), (obj, context) => {
                Matrix4x4 v = (Matrix4x4)obj;
                if (v == null) return null;

                JSONObject array16 = new JSONObject(JSONObject.Type.ARRAY);
                array16.Add(v.m00);
                array16.Add(v.m01);
                array16.Add(v.m02);
                array16.Add(v.m03);
                array16.Add(v.m10);
                array16.Add(v.m11);
                array16.Add(v.m12);
                array16.Add(v.m13);
                array16.Add(v.m20);
                array16.Add(v.m21);
                array16.Add(v.m22);
                array16.Add(v.m23);
                array16.Add(v.m30);
                array16.Add(v.m31);
                array16.Add(v.m32);
                array16.Add(v.m33);

                return array16;
            });

            AddPropertyHandler(typeof(Color), (obj, context) => {
                Color c = (Color)obj;
                if (c == null) return null;

                JSONObject vec4 = new JSONObject(JSONObject.Type.ARRAY);
                vec4.Add((int)(c.r * 255));
                vec4.Add((int)(c.g * 255));
                vec4.Add((int)(c.b * 255));
                vec4.Add((int)(c.a * 255));

                return vec4;
            });

            AddPropertyHandler(typeof(TextAsset), (obj, context) => {
                TextAsset t = (TextAsset)obj;
                if (!t) return null;

                string path = AssetDatabase.GetAssetPath(t);
				// string copyToPath = Path.Combine(WXResourceStore.storagePath, path);
                // Debug.Log("WXResourceStore.storagePath:" + WXResourceStore.storagePath);
                // Debug.Log("path:" + path);
                // Debug.Log("copyToPath:" + copyToPath);

                // Regex regex = new Regex(".txt$");
                // copyToPath = regex.Replace(copyToPath, ".json");

                // if (!Directory.Exists(WXResourceStore.storagePath + "Assets/")) {
                //     Directory.CreateDirectory(WXResourceStore.storagePath + "Assets/");
                // }

                // FileStream fs = new FileStream(copyToPath, FileMode.Create, FileAccess.Write);

                // wxFileUtil.WriteData(fs, JsonConvert.SerializeObject(new { text = t.text }));
                // fs.Close();

                JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
                JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
                // Debug.Log("JsonConvert.SerializeObject(t.text): " + JsonConvert.SerializeObject(t.text));
                string text = JsonConvert.SerializeObject(t.text);
                // 去掉首尾双引号
                text = text.Remove(0, 1);
                text = text.Substring(0, text.Length - 1);
                data.AddField("text", text);
                data.AddField("path", path);
                json.AddField("type", "UnityEngine.TextAsset".EscapeNamespaceSimple());
                json.AddField("value", data);
                return json;
            });

            AddPropertyHandler(typeof(Material), (obj, context) => {
                Material material = (Material)obj;
                if (material == null) return null;

                WXMaterial materialConverter = new WXMaterial(material, null);
                string materialPath = materialConverter.Export(context.preset);
                context.AddResource(materialPath);

                JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
                JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
                json.AddField("type", "UnityEngine.Material".EscapeNamespaceSimple());
                json.AddField("value", data);
                data.AddField("path", materialPath);

                return json;
            });

            AddPropertyHandler(typeof(List<>), (obj, context) => {
                IEnumerable list = (IEnumerable)obj;
                if (list == null) return null;

                JSONObject result = new JSONObject(JSONObject.Type.ARRAY);

                var enumerator = ((IEnumerable)list).GetEnumerator();
                while (enumerator.MoveNext()) {
                    object itemObj = enumerator.Current;
                    if (itemObj == null) continue;
                    if (itemObj.GetType() == typeof(List<>)) {
                        throw new Exception("List不支持嵌套");
                    } else {
                        Type type = itemObj.GetType();

                        if (type.IsSubclassOf(typeof(UnityEngine.Component)) || type == typeof(UnityEngine.GameObject)) {
                            var o = (UnityEngine.Object)itemObj;
                            GameObject go = null;
                            if (o == null) { continue; }
                            if (type.IsSubclassOf(typeof(UnityEngine.Component))) {
                                go = ((Component)o).gameObject;
                            }
                            else if (type == typeof(UnityEngine.GameObject)) {
                                go = (GameObject)o;
                            }

                            var path = AssetDatabase.GetAssetPath(o);

                            // Prefab?
                            if (go.transform.IsChildOf(context.Root.transform) || path == "") {
                                if (!propertiesHandlerDictionary.ContainsKey(type) && !type.IsArray && (!type.IsGenericType || type.GetGenericTypeDefinition() != typeof(List<>)) && type.IsSerializable) {
                                    var sobj = new JSONObject(JSONObject.Type.OBJECT);
                                    result.Add(sobj);
                                    SerializableHandler(type, sobj, itemObj, context);
                                } else if (type != typeof(System.Object) && propertiesHandlerDictionary.ContainsKey(type)) {
                                    var res = propertiesHandlerDictionary[type](itemObj, context);
                                    result.Add(res);
                                }
                                continue;
                            }

                            if (!WXMonoBehaviourExportHelper.exportedResourcesSet.Contains(go)) {
                                WXMonoBehaviourExportHelper.exportedResourcesSet.Add(go);
                                WXPrefab converter = new WXPrefab(go, path);
                                string prefabPath = converter.Export(ExportPreset.GetExportPreset("prefab"));
                                context.AddResource(prefabPath);
                            }
                        
                            var prefabInfo = new JSONObject(JSONObject.Type.OBJECT);
                            prefabInfo.AddField("type", type.FullName.EscapeNamespaceSimple());
                            prefabInfo.AddField("path", path);
                            
                            var innerData = new JSONObject(JSONObject.Type.OBJECT); 
                            innerData.AddField("type", "UnityPrefabWrapper");
                            innerData.AddField("value", prefabInfo);
                            // data.AddField(field.Name, innerData);
                            result.Add(innerData);
                        } else if (!propertiesHandlerDictionary.ContainsKey(type) && !type.IsArray && (!type.IsGenericType || type.GetGenericTypeDefinition() != typeof(List<>)) && type.IsSerializable) {
                            var sobj = new JSONObject(JSONObject.Type.OBJECT);
                            result.Add(sobj);
                            SerializableHandler(type, sobj, itemObj, context);
                        } else if (type != typeof(System.Object) && propertiesHandlerDictionary.ContainsKey(type)) {
                            var res = propertiesHandlerDictionary[type](itemObj, context);
                            result.Add(res);
                        }
                    }
                }
                return result;
            });

            // disgusting code logic :(
            // refactor should be needed
            AddPropertyHandler(typeof(MonoBehaviour), (obj, context) => {
                var m = (MonoBehaviour)obj;
                if (!m) return null;

                if (ExportLogger.LOGGING)
                    ExportLogger.AddLog(new ExportLogger.Log(ExportLogger.Log.Type.Property, "Object: " + obj + "\nType: " + obj.GetType()));

                var go = m.gameObject;
                JSONObject innerData = new JSONObject(JSONObject.Type.OBJECT);

                var path = AssetDatabase.GetAssetPath(go);

                // Prefab?
                if (go.transform.IsChildOf(context.Root.transform) || path == "") {
                    var typeName = m.GetType().FullName;
                    var escapedTypeName = WXMonoBehaviourExportHelper.EscapeNamespace(typeName);
                    innerData.AddField("type", escapedTypeName);
                    innerData.AddField("value", context.AddComponentInProperty(new WXEngineMonoBehaviour(m), (Component)obj));
                    return innerData;
                }

                if (!WXMonoBehaviourExportHelper.exportedResourcesSet.Contains(go)) {
                    WXMonoBehaviourExportHelper.exportedResourcesSet.Add(go);
                    WXPrefab converter = new WXPrefab(go, path);
                    string prefabPath = converter.Export(ExportPreset.GetExportPreset("prefab"));
                    context.AddResource(prefabPath);
                }
                var prefabInfo = new JSONObject(JSONObject.Type.OBJECT);

                {
                    var typeName = m ? m.GetType().FullName : "UnityEngine.GameObject";
                    var escapedTypeName = WXMonoBehaviourExportHelper.EscapeNamespace(typeName);
                    prefabInfo.AddField("type", escapedTypeName);
                }
                prefabInfo.AddField("path", path);
                                    
                innerData.AddField("type", "UnityPrefabWrapper");
                innerData.AddField("value", prefabInfo);
                return innerData;
            });

            AddPropertyHandler(typeof(Component), (obj, context) => {
                Component c = (Component)obj;
                if (!c) return null;

                if (ExportLogger.LOGGING)
                    ExportLogger.AddLog(new ExportLogger.Log(ExportLogger.Log.Type.Property, "Object: " + obj + "\nType: " + obj.GetType()));

                JSONObject innerData = new JSONObject(JSONObject.Type.OBJECT);


                var escapedTypeName = WXMonoBehaviourExportHelper.EscapeNamespace(c.GetType().FullName);
                innerData.AddField("type", escapedTypeName);

                if (c is Transform) {
                    innerData = GetPrefabOnSerializedField(context, c.gameObject, innerData, false);
                } 

                // 下面是adaptor独有的类才需要单独写
                // Physics
                //else if (c is BoxCollider) {
                //    innerData.AddField("value", context.AddComponent(new WXBoxCollider((BoxCollider)c), (BoxCollider)c));
                //} else if (c is SphereCollider) {
                //    innerData.AddField("value", context.AddComponent(new WXSphereCollider((SphereCollider)c), (SphereCollider)c));
                //} else if (c is CapsuleCollider) {
                //    innerData.AddField("value", context.AddComponent(new WXCapsuleCollider((CapsuleCollider)c), (CapsuleCollider)c));
                //} else if (c is MeshCollider) {
                //    innerData.AddField("value", context.AddComponent(new WXMeshCollider((MeshCollider)c), (MeshCollider)c));
                //} else if (c is Rigidbody) {
                //    innerData.AddField("value", context.AddComponent(new WXRigidbody((Rigidbody)c), (Rigidbody)c));
                //}
                
                else if (c is AudioSource) {
                    innerData.AddField("value", context.AddComponentInProperty(new WXEngineAudioSource((AudioSource)c), (AudioSource)c));
                }

                // 有ref的类
                else {
                    // if (context.componentDictionary.ContainsKey(c)) {
                        innerData.AddField("value", context.AddComponentInProperty(new WXUnityComponent(c), c));
                    // }
                }
                return innerData;
            });

            AddPropertyHandler(typeof(GameObject), (obj, context) => {
                var go = (GameObject)obj;
                if (!go) return null;

                if (ExportLogger.LOGGING)
                    ExportLogger.AddLog(new ExportLogger.Log(ExportLogger.Log.Type.Property, "Object: " + obj + "\nType: " + obj.GetType()));

                JSONObject innerData = new JSONObject(JSONObject.Type.OBJECT);

                return GetPrefabOnSerializedField(context, go, innerData);
            });
        }

        private static JSONObject GetPrefabOnSerializedField(WXHierarchyContext context, GameObject go, JSONObject innerData, bool isGameObject = true, Component comp = null) {
            // Prefab?
            var path = AssetDatabase.GetAssetPath(go);
            if (go.transform.IsChildOf(context.Root.transform) || path == "") {
                GetGameObjectReferenceIndex(context, go, ref innerData, isGameObject);
                return innerData;
            }

            if (!WXMonoBehaviourExportHelper.exportedResourcesSet.Contains(go)) {
                WXMonoBehaviourExportHelper.exportedResourcesSet.Add(go);
                WXPrefab converter = new WXPrefab(go, path);
                string prefabPath = converter.Export(ExportPreset.GetExportPreset("prefab"));
                context.AddResource(prefabPath);
            }

            var prefabInfo = new JSONObject(JSONObject.Type.OBJECT);
            var typeName = comp ? comp.GetType().FullName : "UnityEngine.GameObject";
            var escapedTypeName = WXMonoBehaviourExportHelper.EscapeNamespace(typeName);
            prefabInfo.AddField("type", escapedTypeName);
            prefabInfo.AddField("path", path);
            
            innerData.AddField("type", "UnityPrefabWrapper");
            innerData.AddField("value", prefabInfo);
            return innerData;

            // GetGameObjectReferenceIndex(context, go, ref innerData, isGameObject);
            // return innerData;
        }

        private static void GetGameObjectReferenceIndex(WXHierarchyContext context, GameObject go, ref JSONObject innerData, bool isGameObject = true) {
            if (WXBridge.isNGUIPreset) {
                // ngui hack
                innerData = JSONObject.Create(context.AddComponentInProperty(
                    (WXComponent)Activator.CreateInstance(Type.GetType("WXEngine.WXTransform2DComponent"),
                    (object)go.transform), go.transform)    
                );
                return;
            }
            if (WXBridge.isUGUIPreset) {
                // ugui hack
                innerData = JSONObject.Create((int)context.AddComponent(
                    (WXComponent)Activator.CreateInstance(Type.GetType("WXEngine.WXUGUITransform2DComponent"),
                        (object)go.transform), go.transform)
                );
                return;
            }

            if (isGameObject) {
                innerData.AddField("type", "UnityEngine.GameObject".EscapeNamespaceSimple());
                innerData.AddField("value", context.AddComponentInProperty(new WXTransform3DComponent(go.transform), go.transform));    // temp impl: add the referring engine.transform3D index
            } else {
                innerData.AddField("value", context.AddComponentInProperty(new WXUnityComponent(go.transform), go.transform));
            }
        }
    }
}