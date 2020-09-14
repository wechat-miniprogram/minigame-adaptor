using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

namespace WeChat
{
    public class HierarchyExportConfig : ExportConfig
    {
        public bool ignoreNonActive = false;
        public bool ignoreParticle = false;
        public bool createEffectTemplate = false;
    }
}