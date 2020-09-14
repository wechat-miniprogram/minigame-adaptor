using UnityEngine;
using UnityEditor;

namespace WeChat
{
    /**
     * 
     *
     */
    public class SupportMenu
    {

        [MenuItem("微信小游戏/技术支持/github", false, 131)]
        static void Github1()
        {
            Application.OpenURL("https://github.com/wechat-miniprogram/minigame-adaptor");
        }

        // [MenuItem("微信小游戏/技术支持/test", false, 131)]
        // static void test()
        // {
        //     Debug.Log(Selection.activeObject.GetType());
        // }

        [MenuItem("微信小游戏/技术支持/下载微信开发者工具", false, 132)]
        static void Devtool()
        {
            Application.OpenURL("https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html");
        }

        [MenuItem("微信小游戏/技术支持/微信小游戏性能优化方案文档", false, 133)]
        static void Doc()
        {
            Application.OpenURL("https://developers.weixin.qq.com/minigame/dev/game-engine/");
        }
    }
}
