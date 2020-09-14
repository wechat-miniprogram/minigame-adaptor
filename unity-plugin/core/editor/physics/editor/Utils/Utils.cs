using System.Text.RegularExpressions;

namespace WeChat {
    public class Utils {
        // 将字符串中所有出现的 UnityEngine 转换成 MiniGameAdaptor
        // AssertEqual("UnityEngine.Object", "MiniGameAdaptor.Object");
        // AssertEqual("=UnityEngine.Object", "=MiniGameAdaptor.Object");
        // AssertEqual("UnityEngine$Object", "MiniGameAdaptor$Object");
        // AssertEqual(" UnityEngine.Object", " MiniGameAdaptor.Object");
        // AssertEqual("UnityEngine;Object", "MiniGameAdaptor;Object");
        // AssertEqual("`UnityEngine.List+UnityEngine.Object;", "`MiniGameAdaptor.List+MiniGameAdaptor.Object;");
        // AssertEqual("List<UnityEngine.Object>", "List<MiniGameAdaptor.Object>");
        // AssertEqual("UnityEngine.Object o = null;\nUnityEngine.MonoBehaviour m = null;", "MiniGameAdaptor.Object o = null;\nMiniGameAdaptor.MonoBehaviour m = null;");
        //
        // 但是反例，如 MyUnityEngine 不进行转换。
        // AssertEqual("My_1UnityEngine.Object", "My_1UnityEngine.Object");
        // AssertEqual("My1_UnityEngine.Object", "My1_UnityEngine.Object");
        // AssertEqual("UnityEngine_3.Object", "UnityEngine_3.Object");
        // AssertEqual("UnityEngine01.Object", "UnityEngine01.Object");
        // AssertEqual("MyUnityEngine.Object", "MyUnityEngine.Object");
        // AssertEqual("Unity.Object", "Unity.Object");

        public static string NamespaceName = "MiniGameAdaptor";
        public static string EscapeNamespace(string input) {
            if (input == null) return null;
            if (!input.Contains("UnityEngine")) return input;
            const string pattern = "(?<![a-zA-Z_0-9])UnityEngine(?![a-zA-Z_0-9])";
            string result = Regex.Replace(input, pattern, "MiniGameAdaptor");
            return result;
        }
    }
}