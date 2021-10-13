using System;
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace WeChat
{

    [InitializeOnLoad]
    [DeclarePreset("project-config", null)]
    public class ProjectConfigExportPreset : ExportPreset
    {

        private const string packageSuffix = ".mgeproject";

        private string exportPath;

        private JSONObject project_json;
        private JSONObject project_layers;

        static ProjectConfigExportPreset()
        {
            ExportPreset.registerExportPreset("project-config", new ProjectConfigExportPreset());
        }

        public ProjectConfigExportPreset() : base()
        {

        }

        public override string GetChineseName()
        {
            return "全局配置";
        }

        protected override void DoExport()
        {
            EditorUtility.DisplayProgressBar("全局配置", "", 0.0f);
            try
            {
                // set project config file name
                string storagePath = ExportStore.storagePath;
                string[] dirs = Application.dataPath.Split('/');
                string projectName = dirs[dirs.Length - 2];

                exportPath = Path.Combine(storagePath, projectName);
                exportPath = exportPath + packageSuffix;

                GenerateConfigPackge();

            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                EditorUtility.ClearProgressBar();
            }
        }

        private string GetExportPath()
        {
            return exportPath;
        }

        public override bool WillPresetShow()
        {
            return true;
        }

        private void GenerateConfigPackge()
        {
            // global config json object
            project_json = new JSONObject(JSONObject.Type.OBJECT);
            AddProjectLayers();
            // 2d layer matrix
            AddPhysicsLayerCollisionField("2d");
            // 3d layer matrix
            AddPhysicsLayerCollisionField("3d");

            // write json file
            wxFileUtil.SaveJsonFile(project_json, exportPath);
        }

        private void AddProjectLayers(){
            SerializedObject tagManager = new SerializedObject(AssetDatabase.LoadAllAssetsAtPath("ProjectSettings/TagManager.asset")[0]);
            SerializedProperty layersProp = tagManager.FindProperty("layers");
            project_layers = new JSONObject(JSONObject.Type.ARRAY);
            int layersSize = layersProp.arraySize > 32 ? 32 : layersProp.arraySize;
            for (int i = 0; i < layersSize; i++)
            {
                SerializedProperty t = layersProp.GetArrayElementAtIndex(i);
                project_layers.Add(t.stringValue);
            }
            project_json.AddField("layers", project_layers);
        }


        private void AddPhysicsLayerCollisionField(string type){
            string settingFile = "";
            string fieldName = "";
            if(type == "2d"){
                settingFile = "ProjectSettings/Physics2DSettings.asset";
                fieldName = "physics2DLayerCollisionMatrix";
            }else{
                settingFile = "ProjectSettings/DynamicsManager.asset";
                fieldName = "physics3DLayerCollisionMatrix";
            }

            SerializedObject physics2DSettings = new SerializedObject(AssetDatabase.LoadAllAssetsAtPath(settingFile)[0]);
            SerializedProperty physics2DMatrix = physics2DSettings.FindProperty("m_LayerCollisionMatrix");
            int layersSize = physics2DMatrix.arraySize > 32 ? 32 : physics2DMatrix.arraySize;
            // 按照unity存储的方式序列化
            string matrixStr = "";
            for (int i = 0; i < layersSize; i++)
            {
                SerializedProperty t = physics2DMatrix.GetArrayElementAtIndex(i);
                string oldStr = System.Convert.ToString(t.intValue,2).PadLeft(32, '0');
                // 翻转字符串
                char[] array = oldStr.ToCharArray();
                System.Array.Reverse(array);
                oldStr = new string(array);
                // 转二进制后分四个字节分别翻转
                for(int j = 0; j < oldStr.Length; j = j + 8){
                    char[] tempSubArr = oldStr.Substring(j,8).ToCharArray();
                    System.Array.Reverse(tempSubArr);
                    matrixStr += System.Convert.ToString(System.Convert.ToInt32(new string(tempSubArr),2),16).PadLeft(2, '0');
                }
            }
            // 添加field
            project_json.AddField(fieldName, matrixStr);
        }
    }

}