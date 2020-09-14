using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using UnityEditor;
using UnityEngine;

namespace WeChat {

    public enum OSVersion {
        Windows = 0,
        MacOS,
    }

    public class WXConfig {

        public static DirectoryStructure commons;
        public static string moduleCDNPrefix = "https://dldir1.qq.com/WechatWebDev/plugins/BeefBallEngine-unitytool/";

        public static OSVersion GetOperateSystem () {
            OSVersion version = (Application.platform == RuntimePlatform.WindowsEditor) ? OSVersion.Windows : OSVersion.MacOS;
            return version;
        }

        public static string GetModelToolPath () {

            string toolDir = "";
            WXConfig.commons = DirectoryBuilder.RegisterDirectory("commons", new DirectoryStructure("Common"));
            if (Application.platform == RuntimePlatform.WindowsEditor) {
                toolDir = commons["Tools"].GetFilePath ("model.exe");
            } else if (Application.platform == RuntimePlatform.OSXEditor) {
                toolDir = commons["Tools"].GetFilePath ("Model_Mac");
            }
            return toolDir;
        }

    }

}