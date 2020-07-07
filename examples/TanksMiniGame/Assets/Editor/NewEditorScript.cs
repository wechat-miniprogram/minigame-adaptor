using UnityEngine;
using System.Collections;
using UnityEditor;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using NUnit.Framework;

public class FindReferences
{

  [MenuItem("Assets/Find References", false, 10)]
  static private void Find()
  {
    EditorSettings.serializationMode = SerializationMode.ForceText;

    Object[] SelectedAsset = Selection.GetFiltered(typeof(Object), SelectionMode.Assets | SelectionMode.ExcludePrefab);
    //此处添加需要命名的资源后缀名,注意大小写。
    string[] Filtersuffix = new string[] { ".prefab", ".mat", ".dds", ".png", ".jpg", ".shader", ".csv", ".wav", ".mp3" };
    if (SelectedAsset.Length == 0) return;
    foreach (Object tmpFolder in SelectedAsset)
    {
      string path = AssetDatabase.GetAssetPath(tmpFolder);
      if (!string.IsNullOrEmpty(path))
      {
        string guid = AssetDatabase.AssetPathToGUID(path);
        List<string> withoutExtensions = new List<string>() { ".prefab", ".unity", ".mat", ".asset" };
        string[] files = Directory.GetFiles(Application.dataPath, "*.*", SearchOption.AllDirectories)
        .Where(s => withoutExtensions.Contains(Path.GetExtension(s).ToLower())).ToArray();


        int num = 0;
        for (var i = 0; i < files.Length; ++i)
        {

          string file = files[i];
          //显示进度条
          EditorUtility.DisplayProgressBar("匹配资源", "正在匹配资源中...", 1.0f * i / files.Length);
          if (Regex.IsMatch(File.ReadAllText(file), guid))
          {
            Debug.Log(file, AssetDatabase.LoadAssetAtPath<Object>(GetRelativeAssetsPath(file)));
            num++;
          }
        }
        if (num == 0)
        {
          Debug.LogError(tmpFolder.name + "     匹配到" + num + "个", tmpFolder);
        }
        else if (num == 1)
        {
          Debug.Log(tmpFolder.name + "     匹配到" + num + "个", tmpFolder);
        }
        else
        {
          Debug.LogWarning(tmpFolder.name + "     匹配到" + num + "个", tmpFolder);
        }
        num = 0;
        //        int startIndex = 0;
        //        EditorApplication.update = delegate() {
        //          string file = files [startIndex];
        //
        //          bool isCancel = EditorUtility.DisplayCancelableProgressBar ("匹配资源中", file, (float)startIndex / (float)files.Length);
        //
        //          if (Regex.IsMatch (File.ReadAllText (file), guid)) {
        //            Debug.Log (file, AssetDatabase.LoadAssetAtPath<Object> (GetRelativeAssetsPath (file)));
        //          }
        //
        //          startIndex++;
        //          if (isCancel || startIndex >= files.Length) {
        //            
        //            EditorApplication.update = null;
        //            startIndex = 0;
        //            Debug.Log ("匹配结束" + tmpFolder.name);
        //          }
        //
        //        };
      }
    }
    EditorUtility.ClearProgressBar();
  }

  [MenuItem("Assets/Find References", true)]
  static private bool VFind()
  {
    string path = AssetDatabase.GetAssetPath(Selection.activeObject);
    return (!string.IsNullOrEmpty(path));
  }

  static private string GetRelativeAssetsPath(string path)
  {
    return "Assets" + Path.GetFullPath(path).Replace(Path.GetFullPath(Application.dataPath), "").Replace('\\', '/');
  }
}