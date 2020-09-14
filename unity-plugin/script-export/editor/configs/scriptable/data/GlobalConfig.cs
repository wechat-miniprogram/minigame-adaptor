using UnityEngine;
using UnityEditor;
using System;
using System.Linq;
using System.IO;
using System.Collections;
using System.Collections.Generic;

namespace WeChat {

  // [CreateAssetMenu(fileName = "GlobalConfig", menuName = "WeChat/Configs/GlobalConfig", order = 96)]
  public class GlobalConfig : WXScriptableObject
  {
    /// <summary>
    /// 是否使用小游戏插件(只有bridge)
    /// 默认为true
    /// </summary>
    public bool isWXBridgePlugin = true;

    /// <summary>
    /// 是否使用小游戏插件(带上adaptor)
    /// 默认为true
    /// </summary>
    public bool isWXBridgePluginAdaptor = true;
  }
}