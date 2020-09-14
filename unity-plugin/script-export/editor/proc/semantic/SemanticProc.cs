using UnityEditor;

namespace WeChat {
    public static class SemanticProc {
       
         // 使用 Roslyn 对工程中的代码进行解析，找出其对各个依赖的应用。
        [MenuItem("微信小游戏/调试/AnalyzeUsage")]
         public static void AnalyzeUsage() {
            //  Config.Reset();
             new AnalyzeUsageProc().Process();
         }

         // 使用
        [MenuItem("微信小游戏/调试/DependenciesGlyph")]
         public static void AnalyzeDependenciesGlyph() {
            //  Config.Reset();
             new DependenciesProc().Process();
         }
    }
}