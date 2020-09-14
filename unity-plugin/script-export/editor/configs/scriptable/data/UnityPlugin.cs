using System;
// using System.Diagnostics;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEditorInternal;
// using UnityEngine.Experimental.UIElements;
// using UnityEditor.Experimental.UIElements;

namespace WeChat {

    // [CreateAssetMenu(fileName="UnityPlugin", menuName="WeChat/Configs/UnityPlugin", order=97)]
    [Serializable]
    public class UnityPlugin : WXScriptableObject {

        public enum PluginType {
            CSharpSource,
            CSharpDLL,
            CSharpSourceWithCSharpDLL,
            CSharpWrapperWithCppDLL,
            AllMixed,
            Other
        }

        public enum PluginState {
            convert,
            stub
        }

        [Serializable]
        public class PluginPath {
            public UnityEngine.Object pluginRoot;
            public List<UnityEngine.Object> sources;
            public List<UnityEngine.Object> excludes;
            public List<UnityEngine.Object> libs;

        }

        [Serializable]
        public class StubPath {
            public string stubJSPath;
            public string stubCSPath;
            public string stubDLLPath;
            public string stubRefCSPath;
            public string stubRefDLLPath;

            public override string ToString() {
                return "stub-js: " + stubJSPath +    "\n" +
                       "stub-cs:"  + stubCSPath +    "\n" +
                       "stub-dll:" + stubDLLPath +   "\n" +
                       "stub-ref:" + stubRefCSPath + "\n" +
                       "stub-ref:" + stubRefDLLPath + "\n";
            }


            public StubPath() {

            }

            public StubPath(UnityPlugin plugin) {
                stubCSPath = PathUtil.GetPluginOutputPath(plugin, PathUtil.PluginOutputType.CS);
                stubRefCSPath = PathUtil.GetPluginOutputPath(plugin, PathUtil.PluginOutputType.CS, "-ref.cs");
                stubRefDLLPath = PathUtil.GetPluginOutputPath(plugin, PathUtil.PluginOutputType.DLL, "-ref.dll");
                stubDLLPath = PathUtil.GetPluginOutputPath(plugin, PathUtil.PluginOutputType.DLL, "-stub.dll");
                stubJSPath = PathUtil.GetPluginOutputPath(plugin, PathUtil.PluginOutputType.JS);
            }
        }

        [Serializable]
        public class ConvertedPath {
            public string convertedJSPath;
            public string convertedDLLPath;

            public override string ToString() {
                return "convert-js: "  + convertedJSPath  +    "\n" +
                       "convert-dll:"  + convertedDLLPath +    "\n";
            }

            public ConvertedPath() {

            }

            public ConvertedPath(UnityPlugin plugin) {
                convertedJSPath = PathUtil.GetPluginOutputPath(plugin, PathUtil.PluginOutputType.JS);
                convertedDLLPath = PathUtil.GetPluginOutputPath(plugin, PathUtil.PluginOutputType.DLL);
            }
        }

        [Serializable]
        public class StubConfig {
            public bool generateStub = true;
            public bool generateJSTemplate = false;
        }

        public string pluginName = "";
        public bool enable = false;
        public PluginType type = PluginType.CSharpSource;

        public PluginPath pluginPath = new PluginPath();

        public PluginState pluginState = PluginState.stub;

        public StubConfig stubConfig = new StubConfig();

        public StubPath stubPath = new StubPath();

        public ConvertedPath convertedPath = new ConvertedPath();

        public List<string> defineMacros = new List<string>() {
            "UNITY_WAGAME"
        };

    }
}