using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace WeChat
{

    [InitializeOnLoad]
    [DeclarePreset("prefab", null)]
    class AnimatorExportPreset : ExportPreset
    {
        static AnimatorExportPreset()
        {
        } 

        public AnimatorExportPreset(): base()
        {
        }

        public override string GetChineseName()
        {
            return "当前节点的动作控制器";
        }

        protected override void DoExport()
        {
            GameObject activeGameObject = (GameObject)Selection.activeObject;
            WXAnimatorController converter = new WXAnimatorController(activeGameObject.GetComponent<Animator>(), activeGameObject);
            PresetUtil.writeGroup(converter, this/*, (string)(configs.ContainsKey("exportPath") ? configs["exportPath"] : "")*/);
        }

        public override bool WillPresetShow()
        {
            if (Selection.activeObject == null) {
                return false;
            }

            try
            {
                return ((UnityEngine.GameObject)Selection.activeObject).GetComponent(typeof(Animator));
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}