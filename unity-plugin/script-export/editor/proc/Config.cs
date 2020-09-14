// using System;
// using System.Collections.Generic;
// using System.IO;
// using System.Linq;
// using Newtonsoft.Json;
// using UnityEngine;

// namespace WeChat {
//     // 之前 Bridge 的实现都是在 Assets 目录下的，现在应该认为是在根目录下
//     // 之前是没有考虑正则的，现在考虑正则

//     public class Config {

//         // 对 Project 的描述
//         public ProjectConfig project = new ProjectConfig();
//         public List<PluginConfig2> plugins = new List<PluginConfig2>();
//         public bool globIgnoreCase = false;
//         public List<string> defineMacros = new List<string>();

//         public static Config Get() => ConfigProc.Get();

//         public static void Reset() {
//             ConfigProc.Reset();
//             PathProc.Reset();
//         }
//     }

//     public class SourceConfig {
//         public List<PathProc.UnityPath> excludes = new List<PathProc.UnityPath>();
//         public List<PathProc.UnityPath> sources = new List<PathProc.UnityPath>();
//         public List<PathProc.UnityPath> references = new List<PathProc.UnityPath>();
//     }

//     public class PluginConfig2 : SourceConfig {
//         public string name = "";
        
//         // 是否转换代码时使用该stub作为依赖
//         public bool enable = false;

//         // 是否要为这个 Plugin 生成 stub
//         public bool generateStub = false;
//         // 生成 stub 时，是否为依赖 dll 也依赖 stub
//         public bool generateStubForDLL = false;
//         // stub 是否生成 js，到导出目录
//         public bool generateJsTemplate = false;
//         // stub 输出地址
//         public PathProc.UnityPath stubDir = PathProc.UnityPath.DUMMY;
//         // plugin 源文件的位置，这个地方在编 bridge 的时候会被 exclude
//         public PathProc.UnityPath sourceDir = PathProc.UnityPath.DUMMY;
//     }

//     // 对 Project 的描述
//     // 使用 config.json 中的 sources / excludes 配置，对项目内的所有文件进行统配。
//     public class ProjectConfig : SourceConfig {

//     }


//     public static class ConfigProc {
//         private static Config _cache;
//         private static string _configJsonText = "";

//         public static void Reset() {
//             _cache = null;
//             _configJsonText = "";
//         }

//         public static Config Get() {
//             if (IsCacheHit()) return _cache;
//             return _cache ?? LoadConfig();
//         }

//         private static Config LoadConfig() {
//             var json = LoadConfigJson() ?? "";
//             var config = JsonConvert.DeserializeObject<Config>(json, new PathConverter()) ?? new Config();
//             ProcessConfig(config);
//             _configJsonText = json;
//             _cache = config;
//             return config;
//         }

//         private static bool IsCacheHit() {
//             if (_cache == null) return false;
//             var source = LoadConfigJson();
//             return _configJsonText.Equals(source);
//         }

//         private static string LoadConfigJson() {
//             return File.ReadAllText(PathProc.ConfigPath.ToProjectRoot);
//         }

//         private static void ProcessConfig(Config config) {
//             if (!config.defineMacros.Contains("UNITY_WAGAME")) {
//                 config.defineMacros.Add("UNITY_WAGAME");
//             }
//         }
//     }

//     public class PathConverter : JsonConverter<PathProc.UnityPath> {
//         public override void WriteJson(JsonWriter writer, PathProc.UnityPath value, JsonSerializer serializer) {
//             writer.WriteValue(value == null ? "" : value.ToProjectRoot);
//         }

//         public override PathProc.UnityPath ReadJson(JsonReader reader, Type objectType, PathProc.UnityPath existingValue, bool hasExistingValue,
//             JsonSerializer serializer) {
//             var value = (string)reader.Value;
//             if (string.IsNullOrEmpty(value)) {
//                 return existingValue;
//             }
//             return PathProc.Compile(value);
//         }
//     }

//     public static class ProjectProc {
//         // excludes / plugins, all things considered.
//         public static IEnumerable<string> AllSources(this SourceConfig config) {
//             return PathProc.GetFiles(
//                 config.sources.ToProjectRoot(), 
//                 config.excludes.ToProjectRoot(), 
//                 Config.Get().globIgnoreCase);
//         }

//         public static IEnumerable<string> AllReferences(this SourceConfig config, bool unity = true, bool system = true) {
//             Debug.Log(config.references);
//             var result = PathProc.GetFiles(
//                 config.references.ToProjectRoot(), 
//                 config.excludes.ToProjectRoot(), 
//                 Config.Get().globIgnoreCase).ToList();
//             if (unity) {
//                 result.AddRange(DLLProc.UnityEngineDLLPath());
//             }
//             if (system) {
//                 result.AddRange(DLLProc.SystemDLLPath());
//             }

//             return result;
//         }
//     }
// }