using UnityEngine;
using UnityEditor;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.IO;
// using System.Text.RegularExpressions;
using System.Text.RegularExpressions;
// using WeChat;

// 将 MonoBehaviour 脚本作为资源导出，需要考虑序列化属性，序列化为小游戏平台可识别的 .json 文件
namespace WeChat
{

    public static class WXMonoBehaviourExportHelper
    {

        // property black list
        private static readonly HashSet<string> _propertyBlacklist = new HashSet<string> {
            // NGUI class
            "UIRoot",
            "UICanvas",
            "UIPanel",
            "UISprite",
            "UIScrollView",
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
            "TweenAlpha"
        };

        public static HashSet<GameObject> exportedResourcesSet = new HashSet<GameObject>();

        // [MenuItem("WeChat/Debug/Clear Prefab Set")]
        public static void ClearPrefabSet()
        {
            exportedResourcesSet.Clear();
        }

        public static bool IsInBlackList(Type type)
        {
            return type != null ? _propertyBlacklist.Contains(type.FullName) : false;
        }

        public static string GetValidTypeNameUnescapeNamespace(Type type)
        {
            string newName = type.FullName;
            if (newName.EndsWith("+<>c", StringComparison.Ordinal))
            {
                newName = newName.Substring(0, newName.Length - 4);
            }
            else if (newName.Contains("+"))
            {
                newName = newName.Replace('+', '.');
            }
            if (newName.Contains("`"))
            {
                newName = newName.Replace('`', '$');
            }
            return newName;
        }

        public static string EscapeNamespace(string input)
        {
            if (input == null) return null;
            if (!input.Contains("UnityEngine")) return input;
            const string pattern = "(?<![a-zA-Z_0-9])UnityEngine(?![a-zA-Z_0-9])";
            string result = Regex.Replace(input, pattern, "MiniGameAdaptor");
            return result;
        }

        public static string EscapeNamespaceSimple(this string input)
        {
            return EscapeNamespace(input);
        }
    }

    public static class WXMonoBehaviourPropertiesHandler
    {

        struct ConditionPropertiesHandler
        {
            public Func<Type, bool> condition;
            public Func<Type, object, WXHierarchyContext, JSONObject> handler;
        }
        private static List<ConditionPropertiesHandler> conditionPropertiesHandlerList;

        private static Dictionary<Type, Func<object, WXHierarchyContext, JSONObject>> typePropertiesHandlerDictionary;

        static WXMonoBehaviourPropertiesHandler()
        {
            conditionPropertiesHandlerList = new List<ConditionPropertiesHandler>();
            typePropertiesHandlerDictionary = new Dictionary<Type, Func<object, WXHierarchyContext, JSONObject>>();

            RegisterConditionProperties();
            RegisterBasicProperties();
            RegisterUnityProperties();
        }

        // 如果字段类型就是某个类型，执行某段属性转换逻辑
        private static void AddTypePropertyHandler(Type type, Func<object, WXHierarchyContext, JSONObject> func)
        {
            if (!typePropertiesHandlerDictionary.ContainsKey(type))
            {
                typePropertiesHandlerDictionary.Add(type, func);
            }
        }
        // 如果字段类型命中了某个条件，执行某段属性转换逻辑
        private static void AddConditionPropertyHandler(Func<Type, bool> condition, Func<Type, object, WXHierarchyContext, JSONObject> handler)
        {
            ConditionPropertiesHandler conditionHandler = new ConditionPropertiesHandler();
            conditionHandler.condition = condition;
            conditionHandler.handler = handler;
            conditionPropertiesHandlerList.Add(conditionHandler);
        }

        public static JSONObject HandleField(FieldInfo field, Component obj, WXHierarchyContext context)
        {
            try
            {
                return innerHandleField(field.FieldType, field.GetValue(obj), context);
            }
            catch (Exception e)
            {
                Debug.LogErrorFormat("导出节点{0}组件{1}属性{2}时错误", obj.name, obj.GetType().Name, field.Name);
                Debug.LogException(e);
                return null;
            }
        }

        // handle all Serializable class recursively
        private static void SerializableHandler(Type _type, JSONObject _data, object value, WXHierarchyContext context)
        {
            if (value == null || _type == null) return;
            // get [SerializeField] && Public properties
            var fields = _type.GetFields(BindingFlags.NonPublic |
                                         BindingFlags.Instance |
                                         BindingFlags.Public).Where(f =>
                                            !f.IsDefined(typeof(NonSerializedAttribute), true) &&
                                            !f.IsDefined(typeof(HideInInspector), true) &&
                                            (f.IsDefined(typeof(SerializeField), true) || f.IsPublic));

            foreach (var f in fields)
            {
                object itemValue = f.GetValue(value);
                // get non-permitive Serializable object && non-IEnumerable object
                Type fType = f.FieldType;
                if (fType == null) continue;

                _data.AddField(f.Name, innerHandleField(fType, itemValue, context));
            }
        }

        // inner recursion method, thus each if-statement must have @return in the end of the following block.
        private static JSONObject innerHandleField(Type type, object value, WXHierarchyContext context)
        {
            // 因为下方有递归尝试转换基类的逻辑，这里需要有一个终结点
            if (type == typeof(System.Object)) return null;

            if (WXMonoBehaviourExportHelper.IsInBlackList(type)) return null;

            foreach (ConditionPropertiesHandler handler in conditionPropertiesHandlerList)
            {
                if (handler.condition.Invoke(type))
                {
                    JSONObject result = handler.handler.Invoke(type, value, context);
                    if (result != null)
                    {
                        return result;
                    }
                }
            }

            // 尝试转换它的基类
            return innerHandleField(type.BaseType, value, context);
        }

        private static void RegisterConditionProperties()
        {
            AddConditionPropertyHandler(
                (Type type) =>
                {
                    return type.IsArray || (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(List<>));
                },
                (type, value, context) =>
                {
                    return typePropertiesHandlerDictionary[typeof(List<>)](value, context);
                }
            );
            AddConditionPropertyHandler(
                (Type type) =>
                {
                    return type.IsEnum;
                },
                (type, value, context) =>
                {
                    return JSONObject.Create((int)value);
                }
            );
            AddConditionPropertyHandler(
                // 处理prefab
                (Type type) =>
                {
                    // 指向一个内置component或者gameObject，则有可能是当prefab在处理
                    return type.IsSubclassOf(typeof(UnityEngine.Component)) || type == typeof(UnityEngine.GameObject);
                },
                (type, value, context) =>
                {
                    // 取值
                    var o = (UnityEngine.Object)value;
                    GameObject go = null;
                    if (o == null) { return null; }

                    // 尝试获得资源路径
                    var path = AssetDatabase.GetAssetPath(o);

                    // 如果是组件
                    if (type.IsSubclassOf(typeof(UnityEngine.Component)))
                    {
                        go = ((Component)o).gameObject;
                    }
                    // 如果直接是一个GameObject
                    else if (type == typeof(UnityEngine.GameObject))
                    {
                        go = (GameObject)o;
                    }

                    // 如果拿得到路径，且发现transform不属于当前场景，则当prefab处理
                    if (path != "" && !go.transform.IsChildOf(context.Root.transform))
                    {
                        // 按prefab导出
                        WXPrefab converter = new WXPrefab(go, path);
                        string prefabPath = converter.Export(ExportPreset.GetExportPreset("prefab"));
                        context.AddResource(prefabPath);

                        // var prefabInfo = new JSONObject(JSONObject.Type.OBJECT);
                        // prefabInfo.AddField("type", type.FullName.EscapeNamespaceSimple());
                        // prefabInfo.AddField("path", path);
                        // // prefab数据
                        // var innerData = new JSONObject(JSONObject.Type.OBJECT);
                        // innerData.AddField("type", "prefab");
                        // innerData.AddField("value", prefabInfo);
                        // return innerData;
                        
                        return JSONObject.Create(prefabPath);
                    }
                    return null;
                }
            );
            AddConditionPropertyHandler(
                (Type type) =>
                {
                    return typePropertiesHandlerDictionary.ContainsKey(type);
                },
                (type, value, context) =>
                {
                    var result = typePropertiesHandlerDictionary[type](value, context);
                    return result;
                }
            );
            AddConditionPropertyHandler(
                (Type type) =>
                {
                    // 基础类型都是isSerializable
                    return type.IsSerializable;
                },
                (type, value, context) =>
                {
                    var innerData = new JSONObject(JSONObject.Type.OBJECT);
                    SerializableHandler(type, innerData, value, context);
                    return innerData;
                }
            );
        }

        private static void RegisterBasicProperties()
        {

            AddTypePropertyHandler(typeof(bool), (obj, context) =>
            {
                return JSONObject.Create((bool)obj);
            });

            AddTypePropertyHandler(typeof(int), (obj, context) =>
            {
                return JSONObject.Create((int)obj);
            });

            AddTypePropertyHandler(typeof(byte), (obj, context) =>
            {
                return JSONObject.Create((byte)obj);
            });

            AddTypePropertyHandler(typeof(short), (obj, context) =>
            {
                return JSONObject.Create((short)obj);
            });

            AddTypePropertyHandler(typeof(ushort), (obj, context) =>
            {
                return JSONObject.Create((ushort)obj);
            });

            AddTypePropertyHandler(typeof(uint), (obj, context) =>
            {
                return JSONObject.Create((uint)obj);
            });

            AddTypePropertyHandler(typeof(sbyte), (obj, context) =>
            {
                return JSONObject.Create((int)obj);
            });

            AddTypePropertyHandler(typeof(long), (obj, context) =>
            {
                return JSONObject.Create((long)obj);
            });

            AddTypePropertyHandler(typeof(decimal), (obj, context) =>
            {
                return JSONObject.Create(Convert.ToInt64((decimal)obj));
            });

            AddTypePropertyHandler(typeof(ulong), (obj, context) =>
            {
                return JSONObject.Create(Convert.ToInt64((ulong)obj));
            });

            AddTypePropertyHandler(typeof(float), (obj, context) =>
            {
                return JSONObject.Create((float)obj);
            });

            AddTypePropertyHandler(typeof(double), (obj, context) =>
            {
                ;
                return JSONObject.Create(Convert.ToSingle((double)obj));
            });

            AddTypePropertyHandler(typeof(string), (obj, context) =>
            {
                var str = (string)obj;
                if (str == null) return JSONObject.CreateStringObject("");

                str = str.TrimEnd();
                str = str.Replace('\r', ' ');
                str = str.Replace("\"", "\\\"");
                return JSONObject.CreateStringObject(str);
            });

            AddTypePropertyHandler(typeof(char), (obj, context) =>
            {
                string tmp = "";
                tmp += (char)obj;
                return JSONObject.CreateStringObject(tmp);
            });

        }

        private static void RegisterUnityProperties()
        {
            AddTypePropertyHandler(typeof(Vector2), (obj, context) =>
            {
                Vector2 v = (Vector2)obj;
                if (v == null) return null;

                JSONObject vec2 = new JSONObject(JSONObject.Type.ARRAY);
                vec2.Add(v.x);
                vec2.Add(v.y);

                return vec2;
            });

            AddTypePropertyHandler(typeof(Vector3), (obj, context) =>
            {
                Vector3 v = (Vector3)obj;
                if (v == null) return null;

                JSONObject vec3 = new JSONObject(JSONObject.Type.ARRAY);
                vec3.Add(v.x);
                vec3.Add(v.y);
                vec3.Add(v.z);

                return vec3;
            });

            AddTypePropertyHandler(typeof(Vector4), (obj, context) =>
            {
                Vector4 v = (Vector4)obj;
                if (v == null) return null;

                JSONObject vec4 = new JSONObject(JSONObject.Type.ARRAY);
                vec4.Add(v.x);
                vec4.Add(v.y);
                vec4.Add(v.z);
                vec4.Add(v.w);

                return vec4;
            });

            AddTypePropertyHandler(typeof(Quaternion), (obj, context) =>
            {
                Quaternion v = (Quaternion)obj;
                if (v == null) return null;

                JSONObject array4 = new JSONObject(JSONObject.Type.ARRAY);
                array4.Add(v.x);
                array4.Add(v.y);
                array4.Add(v.z);
                array4.Add(v.w);

                return array4;
            });


            AddTypePropertyHandler(typeof(Matrix4x4), (obj, context) =>
            {
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

            AddTypePropertyHandler(typeof(Color), (obj, context) =>
            {
                Color c = (Color)obj;
                if (c == null) return null;

                JSONObject vec4 = new JSONObject(JSONObject.Type.ARRAY);
                vec4.Add((int)(c.r * 255));
                vec4.Add((int)(c.g * 255));
                vec4.Add((int)(c.b * 255));
                vec4.Add((int)(c.a * 255));

                return vec4;
            });

            AddTypePropertyHandler(typeof(TextAsset), (obj, context) =>
            {
                TextAsset t = (TextAsset)obj;
                if (!t) return null;

                string path = AssetDatabase.GetAssetPath(t);

                JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
                JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
                // Debug.Log("JsonConvert.SerializeObject(t.text): " + JsonConvert.SerializeObject(t.text));
                string text = t.text.Replace("\r\n", "\\n").Replace("\\", "\\\\").Replace("\"", "\\\"");
                data.AddField("text", text);
                data.AddField("path", path);
                json.AddField("type", "UnityEngine.TextAsset".EscapeNamespaceSimple());
                json.AddField("value", data);
                return json;
            });

            AddTypePropertyHandler(typeof(Material), (obj, context) =>
            {
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

            AddTypePropertyHandler(typeof(UnityEngine.LayerMask), (obj, context) =>
            {
                LayerMask mask = (LayerMask)obj;

                return JSONObject.Create(mask.value);
            });

            AddTypePropertyHandler(typeof(List<>), (obj, context) =>
            {
                IEnumerable list = (IEnumerable)obj;
                if (list == null) return null;

                JSONObject result = new JSONObject(JSONObject.Type.ARRAY);

                var enumerator = ((IEnumerable)list).GetEnumerator();
                while (enumerator.MoveNext())
                {
                    object itemObj = enumerator.Current;
                    if (itemObj == null) continue;
                    if (itemObj.GetType() == typeof(List<>))
                    {
                        throw new Exception("不支持嵌套List");

                    }
                    else
                    {
                        Type type = itemObj.GetType();
                        JSONObject itemResult = innerHandleField(type, itemObj, context);
                        if (itemResult != null)
                        {
                            result.Add(itemResult);
                        }
                    }
                }
                return result;
            });

            AddTypePropertyHandler(typeof(MonoBehaviour), (obj, context) =>
            {
                var m = (MonoBehaviour)obj;
                if (!m) return null;

                JSONObject innerData = new JSONObject(JSONObject.Type.OBJECT);

                var escapedTypeName = WXMonoBehaviourExportHelper.EscapeNamespace(m.GetType().FullName);
                // innerData.AddField("type", escapedTypeName);
                // innerData.AddField("value", context.AddComponentInProperty(new WXBehaviourConverter(m), (Component)obj));
                // return innerData;
                return JSONObject.CreateStringObject(context.AddComponentInProperty(new WXBehaviourConverter(m), (Component)obj));
            });

            // 在前面condition逻辑里，理论上已经把所有可能为prefab的逻辑走完，所以这里直接写GameObject是安全的
            AddTypePropertyHandler(typeof(GameObject), (obj, context) =>
            {
                throw new Exception("不支持节点属性指向GameObject，请改为指向Transform或是具体逻辑组件");
            });
        }
    }
}