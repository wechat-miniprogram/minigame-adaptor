using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

namespace WeChat
{
    public class RawResourceExportConfig : ExportConfig
    {
        public bool ignoreAudio = false;
        public bool ignoreText = false;
    }
}