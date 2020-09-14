using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEngine;

namespace WeChat {

    [InitializeOnLoad]
    public static class DirectoryBuilder {

        private static Dictionary<string, DirectoryStructure> directories;

        static DirectoryBuilder () {
            directories = new Dictionary<string, DirectoryStructure> ();

            // RegisterDirectory("build", new WXEngineDirectoryStructure("Build~"));
            // RegisterDirectory("references", new WXEngineDirectoryStructure("References~"));
            // RegisterDirectory("configs", new WXEngineDirectoryStructure("Configs~"));
        }

        public static DirectoryStructure RegisterDirectory (string name, DirectoryStructure directory) {
            if (!directories.ContainsKey (name)) {
                if (directories.Count > 0) {
                    var d = directories.Values.FirstOrDefault (_d => _d.Root == directory.Root);
                    if (d != null) {
                        Debug.LogWarning ("[Directory Builder]: " + directory.Root + " already added");
                        directories.Add (name, d);
                        return d;
                    }
                }
                directories.Add (name, directory);
                return directory;
            }
            return directories[name];
        }

        public static void UnregisterDirectory (string name) {
            if (directories.ContainsKey (name)) {
                directories.Remove (name);
            }
        }

        public static DirectoryStructure GetDirectory (string name) {
            try {
                var d = directories[name];
                return d;
            } catch (System.Collections.Generic.KeyNotFoundException e) {
                throw new System.Exception ("[Directory Builder]: no such key <" + name + ">\n" + e);
            }
        }

        public static void BuildAll () {
            if (directories != null && directories.Count > 0) {
                directories.Values.Distinct ().ToList ().ForEach (d => d.BuildDirectory ());
            }
        }

        public static bool HasDirectorty (string name) {
            return directories.ContainsKey (name);
        }

        ///////////////////////////////////////////////////
        //////////////////// TEST CODE ////////////////////
        ///////////////////////////////////////////////////

        // [MenuItem("test/dir test")]
        // public static void TestBuildDir () {
        //     var build = DirectoryBuilder.RegisterDirectory ("build", new DirectoryStructure ("Build~"));
        //     build.AddReadme ("## Build Directory");

        //     build.AddSubDirectory ("Output", "## Output Directory");
        //     build.AddSubDirectory ("Plugins");
        //     build.AddSubDirectory ("Project");
        //     build.AddSubDirectory ("Temp");

        //     build.SetReadmeAtSubDirectory ("Plugins", "## Plugins Directory");

        //     build.AddFileAtSubDirectory ("Temp", Path.Combine (Application.dataPath, "1.txt"), "Test/2333.ppt");
        //     build.AddDirectoryAtSubDirectory ("Output", Path.Combine (Application.dataPath, "Plugins"), "haha");

        //     build["Project"]["abc/233.txt"] = Path.Combine (Application.dataPath, "1.txt");
        //     build["Plugins"]["zzz"] = Path.Combine (Application.dataPath, "Configs");

        //     // Debug.Log(build["abc"]);                         // test: throw
        //     // Debug.Log(build["abc"]["aa"]);                   // test: throw
        //     // Debug.Log(build["abc"]["aa/bb.txt"]);            // test: throw
        //     // Debug.Log(build["Project"]["abc/bb.txt"]);       // test: throw
        //     // Debug.Log(build["Project"][""]);                 // test: throw
        //     // build["Plugins"]["zzz"] = "";                    // test: ArgumentException: An empty file name is not valid.
        //     // build["Plugins"]["zzz"] = null;                  // test: ArgumentNullException: Value cannot be null.

        //     build.BuildDirectory ();

        //     // Debug.Log(build["Temp/Test/2333.ppt"]);
        //     Debug.Log (build["Temp"]);
        //     Debug.Log (build["Temp"]["Test/2333.ppt"]);
        //     Debug.Log (build["Project"]["abc/233.txt"]);
        //     // Debug.Log(build["Project"]["abc/233333.txt"]);   // test: throw

        //     // // var configs = DirectoryBuilder.GetDirectory("configs");
        //     // // or
        //     // var configs = DirectoryBuilder.RegisterDirectory("configs", new DirectoryStructure("Configs"));

        //     // // 下载文件到 Application.dataPath
        //     // // ...impl

        //     // // 迁移文件
        //     // configs["Text"]["text/dst/name"] = Path.Combine(Application.dataPath, "path/to/src/text");

        //     // // 读取
        //     // var txtPath = configs["Text"]["text/dst/name"];
        //     // var txtContent = File.ReadAllText(txtPath);
        //     // // ...

        // }

    }
}