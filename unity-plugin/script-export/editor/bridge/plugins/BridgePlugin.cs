using System;
using System.Collections.Generic;
using Bridge.Contract;
using ICSharpCode.NRefactory.TypeSystem;
using System.IO;
using System.Text;
using ICSharpCode.NRefactory.CSharp;

namespace WeChat {

    // 针对每一个 Class 生成 Class.binding.js，binding.js 中包含依赖顺序，序列化属性配置等
    // 整体生成 bridge_project.js，给出依赖顺序
    public class BridgePlugin : IPlugin {
        public const string INDENT = "    ";
        public const string NEW_LINE = "\n";
        public const char NEW_LINE_CHAR = '\n';
        public const string CRLF = "\r\n";

        public ILogger Logger { get; set; }

        private string pluginName;
        private string pluginFullName;

        public BridgePlugin(string name = "minigame-adaptor") {
            pluginName = name;
            pluginFullName = name + "-project";
        }

        private struct BindingType
        {
            public ITypeInfo typeInfo;
            public bool shouldExport;
        }

        private Dictionary<string, List<BindingType>> bindingTypes = new Dictionary<string, List<BindingType>>();

        public void AfterEmit(IEmitter emitter, ITranslator translator)
        {
            
        }

        public void AfterOutput(ITranslator translator, string outputPath, bool nocore)
        {
            IEnumerable<TranslatorOutputItem> outputForHtml = translator.Outputs.GetOutputs();

            var scriptTemplate = "import './{0}';";
            var firstJs = true;
            var jsBuffer = new StringBuilder();
            ILogger outputLogger = this.Logger;

            foreach (var output in outputForHtml)
            {
                if (output.OutputType == TranslatorOutputType.JavaScript)
                {
                    var path = output.GetOutputPath(outputPath, true, outputLogger);

                    // blacklist
                    if (WXBridge.isWXBridgePlugin) {
                        if (path.IndexOf("minigame-adaptor-lib.js") >= 0      ||
                            path.IndexOf("minigame-adaptor-lib.meta.js") >= 0 ||
                            path.IndexOf("minigame-adaptor-lib-patch.js") >= 0) {
                            continue;
                        }
                    }

                    if (!firstJs)
                    {
                        jsBuffer.Append(NEW_LINE);
                    }

                    firstJs = false;


                    path = Uri.UnescapeDataString(path);
                    path = path.Replace("'", "\\\'");
                    jsBuffer.Append(string.Format(scriptTemplate, path));
                   
                }
            }

            File.WriteAllText(Path.Combine(outputPath, pluginFullName + ".js"), jsBuffer.ToString(), Encoding.UTF8);

            Logger.Trace(String.Format("location: {0}", translator.Location));
            var bindingPath = Path.Combine(outputPath, "bindings");
            if (!Directory.Exists(bindingPath))
            {
                Directory.CreateDirectory(bindingPath);
            }
            foreach (var bindingTypePair in bindingTypes)
            {
                var jsFilePath = convertToOutputPath(translator, bindingPath, bindingTypePair.Key);

                if (File.Exists(jsFilePath))
                {
                    File.Delete(jsFilePath);
                }

                var output = new StringBuilder();
                var importRelPath = GetRelativePath(Path.Combine(outputPath, "weapp-adapter"), Path.GetDirectoryName(jsFilePath));
                Logger.Trace(String.Format("generate binding js {0}", jsFilePath));

                // if (WXBridge.isWXBridgePlugin) {
                //     output.Append(String.Format("import {{ requireBridge }} from '{0}'\r\n", getBindingFileImportPath("bridge_util", outputPath, jsFilePath)));
                //     output.Append("requireBridge()\n");
                //     // output.Append("requireBridge({\n    pluginAlias: 'WXBridge',\n    useLocalFile: false,\n    useLocalBridgeAdaptor: false\n})})");
                // } else {
                //     output.Append(String.Format("import '{0}'\r\n", getBindingFileImportPath("bridge", outputPath, jsFilePath)));
                //     output.Append(String.Format("import '{0}'\r\n", getBindingFileImportPath("bridge.meta", outputPath, jsFilePath)));
                //     output.Append(String.Format("import '{0}'\r\n", getBindingFileImportPath("weapp-adapter", outputPath, jsFilePath)));
                //     output.Append(String.Format("import '{0}'\r\n", getBindingFileImportPath("bridge_adaptor", outputPath, jsFilePath)));
                // }

                output.Append(String.Format("import '{0}'\r\n", getBindingFileImportPath("minigame-adaptor-util", outputPath, jsFilePath)));

                output.Append(String.Format("import '{0}'\r\n", getBindingFileImportPath(pluginFullName, outputPath, jsFilePath)));

                foreach (var bindingType in bindingTypePair.Value) {
                    generateBindingFile(output, translator, bindingPath, jsFilePath, bindingType);
                }

                // EscapeNamespace
                var textToWrite = WXMonoBehaviourExportHelper.EscapeNamespace(output.ToString());
                File.WriteAllText(jsFilePath, textToWrite);
            }
        }

        private string convertToOutputPath(ITranslator translator, string outputPath, string jsSrcFilePath)
        {
            var location = Path.GetFullPath(translator.Location);
            jsSrcFilePath = Path.GetFullPath(jsSrcFilePath);
            var relPath = GetRelativePath(jsSrcFilePath, location);
            jsSrcFilePath = Path.GetFullPath(Path.Combine(outputPath, relPath));
            return jsSrcFilePath;
        }

        private string getBindingFileImportPath(string importFileName, string outputPath, string fromPath)
        {
            var path = GetRelativePath(Path.Combine(outputPath, importFileName), Path.GetDirectoryName(fromPath));
            path = new ConfigHelper().ConvertPath(path, '/');
            return path;
        }

        private void generateBindingFile(StringBuilder output, ITranslator translator, string outputPath, string jsFilePath, BindingType bindingType)
        {
            var typeInfo = bindingType.typeInfo;

            var typeName = GetValidTypeName(typeInfo.Type.FullName);
            output.Append(String.Format("\r\nengine.decorators.serialize('{0}')({1})\r\n", typeName, $"{typeName}.$ctorDefault"));
            if (bindingType.shouldExport)
            {
                output.Append(String.Format("export default {0}\r\n", typeName));
            }
            
            /*
                Object.defineProperty(Rotation.prototype, '__properties', {
                    enumerable: false,
                    configurable: false,
                    writable: false,
                    value: { ...Rotation.prototype.__properties }
                })
            */

            output.Append(String.Format("Object.defineProperty({0}.prototype, '__properties', {{\r\n    enumerable: false,\r\n    configurable: false,\r\n    writable: false,\r\n    value: {{ ...{1}.prototype.__properties }}\r\n}})", typeName, typeName));

            /*
            Revolution.prototype.__properties = {
                target: { type: UnityEngine.Transform }
            } */
            var listFields = new List<IField>();
            foreach (var field in typeInfo.Type.GetFields())
            {
                Logger.Trace(String.Format("check {0}.{1} file: {2}", typeInfo.Type.Name, field.Name, jsFilePath));
                if (!isSerializeField(field))
                {
                    Logger.Trace(String.Format("can not serialize {0}.{1} file: {2}", typeInfo.Type.Name, field.Name, jsFilePath));
                    continue;
                }
                listFields.Add(field);
            }
            output.Append(getSerializeProperties(translator, outputPath, typeName, listFields, jsFilePath));
        }

        private string getSerializeProperties(ITranslator translator, string outputPath, string typeName, List<IField> listFields, string jsFilePath)
        {
            string properties = "";
            if (listFields.Count > 0)
            {
                properties += "\r\n";

                // Serializable types are:

                // - All classes inheriting from UnityEngine.Object, e.g. GameObject, Component, MonoBehaviour, Texture2D, AnimationClip.
                // - All basic data types like int, string, float, bool.
                // - Some built -in types like Vector2, Vector3, Vector4, Quaternion, Matrix4x4, Color, Rect, LayerMask.
                // - Arrays of a serializable type
                // - List of a serializable type)
                // - Enums
                // - Structs
                var importedList = new HashSet<IType>();
                for (int k = 0; k < listFields.Count; k++)
                {
                    IField fieldInfo = listFields[k];
                    IType tp = fieldInfo.ReturnType;
                    var tpName = tp.FullName;
                    string typestr = "undefined";
                    //var attr = fieldInfo.Compilation.FindType(typeof(SerializableAttribute));
                    //var isSerializable = tp.GetDefinition() != null && tp.GetDefinition().GetAttribute(attr) != null;

                    Logger.Trace(String.Format("check tpName {0}.{1}, def {2}, isArray {3}, kind {4}", typeName, fieldInfo.Name,
                        tp.GetDefinition() != null ? tp.GetDefinition().FullTypeName.Name : "",  tp is ArrayType, tp.Kind));
                    if (tpName.Equals("System.Single") || tpName.Equals("System.Double") || tpName.Equals("System.Int16")
                        || tpName.Equals("System.Int32") || tpName.Equals("System.Int64"))
                    {
                        typestr = "\'number\'";
                    }
                    else if (tpName.Equals("System.Boolean"))
                    {
                        typestr = "\'boolean\'";
                    }
                    else if (tpName.Equals("System.String"))
                    {
                        typestr = "\'string\'";
                    }
                    else if (tp is ArrayType)
                    {
                        ArrayType arrayType = tp as ArrayType;
                        IType itemType = arrayType.ElementType;
                        string itemstr = GetValidTypeName(getGeneralType(itemType));
                        
                        if (!importedList.Contains(itemType))
                        {
                            importedList.Add(itemType);
                            var tpSrcPath = findImportFilePath(itemType);
                            if (!String.IsNullOrWhiteSpace(tpSrcPath))
                            {
                                var tpOutputPath = convertToOutputPath(translator, outputPath, tpSrcPath);
                                if (!tpOutputPath.Equals(jsFilePath, StringComparison.CurrentCulture))
                                {
                                    var importPath = GetRelativePath(tpOutputPath, Path.GetDirectoryName(jsFilePath));
                                    importPath = new ConfigHelper().ConvertPath(importPath, '/');
                                    properties += String.Format("import '{0}'\r\n", importPath);
                                }
                            }
                        }
                        
                        typestr = String.Format("UnityEngine.ListFactory({{ 'type': '{0}', 'isArray' : {1} }})", itemstr, "true");
                    }
                    else if (tp.IsParameterized && tp.GetDefinition() != null &&
                        tp.GetDefinition().FullTypeName.Name.Equals("List", StringComparison.CurrentCulture))
                    {
                        var paramType = tp as ParameterizedType;
                        IType itemType = paramType.GetTypeArgument(0);
                        
                        if (!importedList.Contains(itemType))
                        {
                            importedList.Add(itemType);
                            var tpSrcPath = findImportFilePath(itemType);
                            if (!String.IsNullOrWhiteSpace(tpSrcPath))
                            {
                                var tpOutputPath = convertToOutputPath(translator, outputPath, tpSrcPath);
                                if (!tpOutputPath.Equals(jsFilePath, StringComparison.CurrentCulture))
                                {
                                    var importPath = GetRelativePath(tpOutputPath, Path.GetDirectoryName(jsFilePath));
                                    importPath = new ConfigHelper().ConvertPath(importPath, '/');
                                    properties += String.Format("import '{0}'\r\n", importPath);
                                }
                            }
                        }
                        
                        string itemstr = GetValidTypeName(getGeneralType(itemType));
                        typestr = String.Format("UnityEngine.ListFactory({{ 'type': '{0}', 'isArray' : {1} }})", itemstr, "false");
                    }
                    else if (tp.Kind == TypeKind.Enum)
                    {
                        typestr = "\'number\'";
                    }
                    else if (tp.GetDefinition() != null && tp.GetDefinition().GetAttribute(fieldInfo.Compilation.FindType(typeof(SerializableAttribute))) != null)
                    {
                        if (!importedList.Contains(tp))
                        {
                            importedList.Add(tp);
                            var tpSrcPath = findImportFilePath(tp);
                            if (!String.IsNullOrWhiteSpace(tpSrcPath))
                            {
                                var tpOutputPath = convertToOutputPath(translator, outputPath, tpSrcPath);
                                if (!tpOutputPath.Equals(jsFilePath, StringComparison.CurrentCulture))
                                {
                                    var importPath = GetRelativePath(tpOutputPath, Path.GetDirectoryName(jsFilePath));
                                    importPath = new ConfigHelper().ConvertPath(importPath, '/');
                                    properties += String.Format("import '{0}'\r\n", importPath);
                                }
                            }
                            
                        }
                        typestr = tp.ToString();

                    }
                    else
                    {
                        // UnityEngine.Object的wrapper处理
                        
                        if (IsSubClassOf(tp, "UnityEngine.Object") && fieldInfo.GetAttribute(fieldInfo.Compilation.FindType(typeof(NonSerializedAttribute))) == null)
                        {
                            typestr = "UnityEngine.UnityComponentWrapper(\"" + tp.ToString() + "\")";
                        }
                        else
                        {
                            if (tpName.Equals("UnityEngine.Vector2") || tpName.Equals("UnityEngine.Vector3") || tpName.Equals("UnityEngine.Vector4")
                             || tpName.Equals("UnityEngine.Quaternion") || tpName.Equals("UnityEngine.Matrix4x4")  || tpName.Equals("UnityEngine.Color")
                             || tpName.Equals("UnityEngine.Rect") || tpName.Equals("UnityEngine.LayerMask"))
                            {
                                typestr = GetValidTypeName((tp.ToString()));
                            }
                            else
                            {
                                continue;
                            }
                        }
                    }
                    if (typestr == "undefined") {
                        continue;
                    }
                    string property_line = String.Format("{0}.prototype.__properties.{1} = {{ type: {2} }}\r\n", typeName, fieldInfo.Name, typestr);
                    properties += property_line;
                }
                importedList.Clear();
            }

            return properties;
        }
        
        private string findImportFilePath(IType type)
        {
            foreach (var bindingTypePair in bindingTypes)
            {
                foreach (var bindingType in bindingTypePair.Value)
                {
                    if (bindingType.typeInfo.Type.FullName.Equals(type.FullName, StringComparison.CurrentCulture))
                    {
                        return bindingTypePair.Key;
                    }
                }
            }
            return null;
        }

        private static bool IsSubClassOf(IType tp, string className)
        {
            foreach (var baseType in tp.GetAllBaseTypes())
            {
                if (baseType.FullName.Equals(className))
                {
                    return true;
                }
            }
            return false;
        }

        private static string getGeneralType(IType tp)
        {
            var tpName = tp.FullName;
            string ret = "undefined";
            if (tpName.Equals("System.Single") || tpName.Equals("System.Double")
                || tpName.Equals("System.Int16") || tpName.Equals("System.Int32")
                || tpName.Equals("System.Int64"))
            {
                ret = "number";
            }
            else if (tpName.Equals("System.Boolean"))
            {
                ret = "boolean";
            }
            else if (tpName.Equals("System.String"))
            {
                ret = "string";
            }
            else
            {
                ret = tp.ToString();
            }
            return ret;
        }

        private bool isSerializeField(IField field)
        {
            foreach (var attr in field.Attributes)
            {
                Logger.Trace(String.Format("check {0} field, attr: {1}", field.Name, attr.AttributeType.Name));
                if (attr.AttributeType.Name.Equals("HideInInspector", StringComparison.CurrentCulture))
                {
                    return false;
                }
                if (attr.AttributeType.Name.Equals("SerializeField", StringComparison.CurrentCulture))
                {
                    return true;
                }
            }
            if (field.IsPublic && !field.IsStatic)
            {
                return true;
            }

            return false;
        }

        private bool isBindingClass(IType type)
        {
            if (type.FullName.Equals("UnityEngine.MonoBehaviour", StringComparison.CurrentCulture))
            {
                return true;
            }

            foreach (var base_type in type.DirectBaseTypes)
            {
                if (isBindingClass(base_type))
                {
                    return true;
                }
            }
            return false;
        }

        private bool isBindingClass(ITypeInfo type)
        {
            // we don't need System class
            if (type.Type.FullName.StartsWith("System.")) {
                return false;
            }

            if (type.IsEnum)
            {
                return true;
            }

            Func<AttributeSection, bool> isSerializable = (AttributeSection attr) => {
                return attr.ToString().Trim().Equals("[System.Serializable]", StringComparison.CurrentCulture) ||
                       attr.ToString().Trim().Equals("[Serializable]", StringComparison.CurrentCulture);
            };

            foreach (var attr in type.TypeDeclaration.Attributes)
            {
                Logger.Trace(String.Format("check {0} is binding class, attr: {1} isSerializable: {2}", type.Name, attr, isSerializable(attr)));
                if (isSerializable(attr))
                {
                    return true;
                } else if (attr.ToString().Equals("[WeAppToolAtrribute(\"SDK\")]", StringComparison.CurrentCulture)) /*|| 
                           attr.ToString().Equals("[HideInInspector]", StringComparison.CurrentCulture)             ||
                           attr.ToString().Equals("[MiniGameAdaptor.HideInInspector]", StringComparison.CurrentCulture))*/
                {
                    return false;
                }
            }

            foreach (var base_type in type.Type.DirectBaseTypes)
            {
                if (isBindingClass(base_type))
                {
                    return true;
                }
            }

            return false;
        }

        private static string GetValidTypeName(string old)
        {
            string newName = old;
            if (newName.EndsWith("+<>c", StringComparison.Ordinal))
            {
                newName = newName.Substring(0, newName.Length - 4);
            }
            if (newName.Contains("+"))
            {
                newName = newName.Replace('+', '.');
            }
            if (newName.Contains("`"))
            {
                newName = newName.Replace('`', '$');
            }
            return newName;
        }

        public void AfterTypeEmit(IEmitter emitter, ITypeInfo typeInfo)
        {
            Logger.Trace(String.Format("check should export {0} == {1}", Path.GetFileNameWithoutExtension(emitter.SourceFileName), typeInfo.Name));

            if (!isBindingClass(typeInfo))
            {
                Logger.Trace(String.Format("{0} is not binding class", typeInfo.Name));
                return;
            }

            var filePath = "";
            switch (emitter.AssemblyInfo.OutputBy)
            {
                case OutputBy.ClassPath:
                    filePath = typeInfo.Type.FullName + ".binding.js";
                    break;
//                case OutputBy.Class:
//                    filePath = this.GetIteractiveClassPath(typeInfo);
//                    break;
//                case OutputBy.Module:
//                    filePath = module != null ? module.Name : null;
//                    break;
                case OutputBy.NamespacePath:
                case OutputBy.Namespace:
                    filePath = typeInfo.GetNamespace(emitter);
                    break;
                case OutputBy.FilePath:
                    filePath = Path.ChangeExtension(emitter.SourceFileName, ".binding.js");
                    break;
                default:
                    break;
            }

            if (String.IsNullOrEmpty(filePath))
            {
                return;
            }
            
            List<BindingType> bindingTypeList;
            if (!bindingTypes.ContainsKey(filePath))
            {
                bindingTypeList = new List<BindingType>();
                bindingTypes.Add(filePath, bindingTypeList);
            }
            else
            {
                bindingTypeList = bindingTypes[filePath];
            }
            
            var bindingType = new BindingType();
            bindingType.typeInfo = typeInfo;
            
            bindingType.shouldExport = Path.GetFileNameWithoutExtension(emitter.SourceFileName).Equals(typeInfo.Name);
            bindingTypeList.Add(bindingType);
        }

        public void AfterTypesEmit(IEmitter emitter, IList<ITypeInfo> types)
        {
            
        }

        public void BeforeEmit(IEmitter emitter, ITranslator translator)
        {
            
        }

        public void BeforeTypeEmit(IEmitter emitter, ITypeInfo type)
        {
            
        }

        public void BeforeTypesEmit(IEmitter emitter, IList<ITypeInfo> types)
        {
            
        }

        public IEnumerable<string> GetConstructorInjectors(IConstructorBlock constructorBlock)
        {
            return null;
        }

        public bool HasConstructorInjectors(IConstructorBlock constructorBlock)
        {
            return false;
        }

        public void OnConfigRead(IAssemblyInfo config)
        {
            
        }

        public void OnInvocation(IInvocationInterceptor interceptor)
        {
            
        }

        public void OnReference(IReferenceInterceptor interceptor)
        {
            
        }

        string GetRelativePath(string filespec, string folder)
        {
            Uri pathUri = new Uri(filespec);
            // Folders must end in a slash
            if (!folder.EndsWith(Path.DirectorySeparatorChar.ToString(), StringComparison.CurrentCulture))
            {
                folder += Path.DirectorySeparatorChar;
            }
            Uri folderUri = new Uri(folder);
            var relPath = Uri.UnescapeDataString(folderUri.MakeRelativeUri(pathUri).ToString().Replace('/', Path.DirectorySeparatorChar));
            if (!relPath.StartsWith(".", StringComparison.CurrentCulture))
            {
                relPath = Path.Combine(".", relPath);
            }
            return relPath;
        }
    }
}
                                                                                                                              