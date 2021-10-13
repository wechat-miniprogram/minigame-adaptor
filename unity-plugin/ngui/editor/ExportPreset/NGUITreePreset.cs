﻿using System;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace WeChat {
    // 导出选中的prefab

    // 后续更新：这里已经支持了导出2D scene。某些变量名和常量还保持prefab只是为了保护历史包袱
    [InitializeOnLoad]
    [DeclarePreset ("ngui-prefab", typeof (NGUIExportConfig))]
    internal class NGUITreeExportPreset : ExportPreset {
        static NGUITreeExportPreset () {
            ExportPreset.registerExportPreset ("ngui-prefab", new NGUITreeExportPreset ());
        }

        public NGUITreeExportPreset () : base () {
            is2d = true;
        }

        public override string GetChineseName () {
            return "选中的ngui节点";
        }

        protected override void DoExport () {
            // GameObject prefabRoot = (GameObject) Selection.activeObject;

            GameObject[] prefabRoots = Selection.gameObjects;

            Scene gameScene = SceneManager.GetActiveScene ();
            if (!gameScene.isDirty || gameScene.isDirty && EditorUtility.DisplayDialog ("提示", "检测到当前场景未保存，导出会自动进行保存场景，是否要继续导出", "导出", "暂不导出")) {
                string path = gameScene.path;

                EditorSceneManager.SaveScene (gameScene, path);

                foreach (GameObject prefabRoot in prefabRoots) {
                    WXNGUITree converter = new WXNGUITree (
                        prefabRoot,
                        AssetDatabase.GetAssetPath (WXUtility.GetPrefabSource (prefabRoot)),
                        (this.exportConfigs as NGUIExportConfig).exportAsScene
                    );

                    PresetUtil.writeGroup (converter, this /*, (string)(configs.ContainsKey("exportPath") ? configs["exportPath"] : "")*/ );
                }

            }
        }

        public override bool WillPresetShow () {
            if (Selection.activeObject == null) {
                return false;
            }
            try {
                return WXUtility.GetPrefabSource (Selection.activeObject);
            } catch (Exception e) {
                return false;
            }
        }
    }
}