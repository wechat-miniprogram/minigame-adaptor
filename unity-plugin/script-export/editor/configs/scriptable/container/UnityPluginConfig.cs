using UnityEngine;
using System;
using System.Collections.Generic;

namespace WeChat {

    // [CreateAssetMenu(fileName="UnityPluginConfig", menuName="WeChat/Configs/UnityPluginConfig", order=96)]
    [Serializable]
    public class UnityPluginConfig: WXScriptableObject {
        public List<UnityPlugin> unityPlugins;
    }
}