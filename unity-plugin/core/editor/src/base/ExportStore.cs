using System.Collections.Generic;
using System.IO;
using System.Text;
using ICSharpCode.SharpZipLib.Core;
using ICSharpCode.SharpZipLib.Zip;
using UnityEditor;
using UnityEngine;

namespace WeChat
{
    [InitializeOnLoad]
    public class ExportStore : ScriptableObject
    {
        static BeefBallConfig globalExportConfig = null;
        private static void InitGlobalExportConfig()
        {
            if (globalExportConfig != null)
            {
                return;
            }
            globalExportConfig = DirectoryUtil.GetScriptableObject<BeefBallConfig>("beefball");
            if (globalExportConfig == null)
            {
                globalExportConfig = DirectoryUtil.CreateScriptableObject<BeefBallConfig>("beefball");
            }

            // Debug.Log(globalExportConfig);
            if (globalExportConfig != null && globalExportConfig.storagePath != null && globalExportConfig.storagePath != "")
            {
                init();
            }
            // Debug.Log(2222);
        }

        static ExportStore()
        {
            InitGlobalExportConfig();
            BeefBall.onInitializeCheckers.Add(InitGlobalExportConfig);
        }

        private void OnEnable()
        {
            InitGlobalExportConfig();
        }

        private void Awake()
        {
            InitGlobalExportConfig();
        }

        // constants
        private const string EXPORT_STORAGE = "exports_storage.json";
        private const string CONTENT_FOLDER = "__UnityPkg__content~";

        public static string GetExportStoragePath()
        {
            if (storagePath == null || storagePath.Length == 0)
            {
                return "";
            }
            return Path.Combine(storagePath, EXPORT_STORAGE);
        }
        public static string GetContentFolderPath()
        {
            if (storagePath == null || storagePath.Length == 0)
            {
                return "";
            }
            return Path.Combine(storagePath, CONTENT_FOLDER);
        }

        private static JSONObject storage;

        // 资源包生成的地方
        public static string exportPath
        {
            get
            {
                if (!globalExportConfig)
                {
                    Debug.LogError("请先选择导出路径:导出/手动选择导出路径");
                    return "";
                }
                return globalExportConfig.exportPath;
            }
            set
            {
                globalExportConfig.exportPath = wxFileUtil.CheckAccessToPath(value) ? value : "";
                EditorUtility.SetDirty(globalExportConfig);
            }
        }

        // 缓存文件所存在的地方，如果exportPath没有设置，也会作为资源包生成的地方
        public static string storagePath
        {
            get
            {
                if (!globalExportConfig)
                {
                    Debug.LogError("请先选择导出路径:导出/手动选择导出路径");
                    return "";
                }
                return globalExportConfig.storagePath;
            }
            set
            {
                string originPath = globalExportConfig.storagePath;

                globalExportConfig.storagePath = wxFileUtil.CheckAccessToPath(value) ? value : "";
                EditorUtility.SetDirty(globalExportConfig);
                AssetDatabase.SaveAssets();

                if (globalExportConfig.storagePath != "" && globalExportConfig.storagePath != null)
                {
                    if (originPath != "" && originPath != null)
                    {
                        reInit(originPath, globalExportConfig.storagePath);
                    }
                    else //if (_storagePath != "" && _storagePath != null)
                    {
                        init();
                    }
                }
            }
        }

        // 初始化目标目录，包括storage.json和两个存储目录
        public static void init()
        {
            string jsonPath = GetExportStoragePath();

            if (File.Exists(jsonPath))
            {
                string jsonString = File.ReadAllText(jsonPath, Encoding.UTF8);
                storage = JSONObject.Create(jsonString);
            }
            else
            {
                storage = JSONObject.Create("{\"files\":{},\"assets\":{}}");
            }

            saveStorage();
            Directory.CreateDirectory(GetContentFolderPath());
        }

        private static void saveStorage()
        {
            string jsonPath = GetExportStoragePath();
            wxFileUtil.SaveJsonFile(storage, jsonPath);
        }

        // 更换目标目录，移动storage.json，移动存储目录
        private static void reInit(string originPath, string targetPath)
        {
            string targetStoragePath = Path.Combine(targetPath, EXPORT_STORAGE);
            string originStoragePath = Path.Combine(originPath, EXPORT_STORAGE);

            if (!File.Exists(targetStoragePath))
            {
                // move export_storage.json to target path  
                File.Move(originStoragePath, targetStoragePath);
                // move files in ContentFolder to target path
                Directory.Move(Path.Combine(originPath, CONTENT_FOLDER), Path.Combine(targetPath, CONTENT_FOLDER));
            }
            else
            {
                string jsonString = File.ReadAllText(targetStoragePath, Encoding.UTF8);
                storage = JSONObject.Create(jsonString);
            }
        }

        // check files in __Contents is consistent with export_storage.json
        public static void CheckCacheConsistent()
        {
            string OSStoragePath = GetExportStoragePath();
            string OSContentPath = GetContentFolderPath();

            // current storage path is legal
            if (
                OSStoragePath != "" &&
                OSStoragePath != null &&
                wxFileUtil.CheckAccessToPath(OSStoragePath)
            )
            {
                // storage/content missing, or unconsistent... 
                if (!File.Exists(OSStoragePath) || !Directory.Exists(OSContentPath) || !CheckCacheFileCompletion())
                {
                    ResetStorage();
                }
            }
        }

        private static bool CheckCacheFileCompletion()
        {
            if (storage == null)
            {
                return false;
            }
            List<string> assetsMD5 = new List<string>();
            JSONObject files = storage.GetField("files");
            for (int i = 0; i < files.Count; i++)
            {
                string resPath = files.keys[i];
                assetsMD5.Add(files.GetField(resPath).GetField("MD5").GetRawString());
            }

            string[] filePaths = Directory.GetFiles(GetContentFolderPath());
            List<string> fileNames = new List<string>();
            for (int i = 0; i < filePaths.Length; i++)
            {
                string path = filePaths[i];
                int lastBar = path.LastIndexOf('/');
                fileNames.Add(path.Substring(lastBar + 1, path.Length - lastBar - 1));
            }

            for (int i = 0; i < assetsMD5.Count; i++)
            {
                if (!fileNames.Contains(assetsMD5[i]))
                    return false;
            }
            return true;
        }

        public static void ResetStorage()
        {
            if (GetExportStoragePath() == "")
            {
                return;
            }
            if (File.Exists(GetExportStoragePath()))
            {
                File.Delete(GetExportStoragePath());
            }
            wxFileUtil.DeleteDirectory(GetContentFolderPath());
            storage = JSONObject.Create("{\"assets\": {},\"files\":{}}");
            saveStorage();
            Directory.CreateDirectory(GetContentFolderPath());
        }

        private static void SaveFileManifest(
            string relativePath,
            string fileType,
            string assetVersion
        )
        {
            JSONObject storageFileJSON = storage.GetField("files");
            if (!storageFileJSON)
            {
                storageFileJSON = new JSONObject(JSONObject.Type.OBJECT);
                storage.SetField("files", storageFileJSON);
            }

            JSONObject fileItem = new JSONObject(JSONObject.Type.OBJECT);
            fileItem.AddField("MD5", assetVersion);
            fileItem.AddField("filetype", fileType);
            fileItem.AddField("path", relativePath);
            storageFileJSON.AddField(relativePath, fileItem);

            saveStorage();
        }

        public static bool IsFileConverted(
            string relativePath,
            string version
        )
        {
            if (
                storage.HasField("files") &&
                storage.GetField("files").HasField(relativePath) &&
                storage.GetField("files").GetField(relativePath).GetField("MD5").GetRawString() == version
            )
            {
                return true;
            }
            return false;
        }

        // 添加一个fileType是arraybuffer的资源
        public static void AddBinaryFile(
            string relativePath,
            byte[] content,
            string assetMD5
        )
        {
            if (relativePath == null || relativePath == "")
            {
                throw new System.Exception("empty resourcePath");
            }
            if (content == null)
            {
                throw new System.Exception("empty content for binaryFile");
            }

            FileStream fileStream = wxFileUtil.saveFile(
                Path.Combine(GetContentFolderPath(), wxFileUtil.cleanIllegalChar(assetMD5, true)), null
            );
            wxFileUtil.WriteData(fileStream, content);
            fileStream.Close();

            SaveFileManifest(relativePath, "arraybuffer", assetMD5);
        }

        // 添加一个fileType是image的文件资源
        public static void AddImageFile(
            string relativePath,
            byte[] imageData,
            string assetMD5
        )
        {
            if (relativePath == null || relativePath == "")
            {
                throw new System.Exception("empty resourcePath");
            }

            FileStream fileStream = wxFileUtil.saveFile(
                Path.Combine(GetContentFolderPath(), wxFileUtil.cleanIllegalChar(assetMD5, true)), null
            );
            wxFileUtil.WriteData(fileStream, imageData);
            fileStream.Close();

            SaveFileManifest(relativePath, "image", assetMD5);
        }

        // 添加一个fileType是json的文件资源
        public static void AddJSONFile(
            string relativePath,
            JSONObject content,
            string assetMD5
        )
        {
            if (relativePath == null || relativePath == "")
            {
                throw new System.Exception("empty resourcePath");
            }

            FileStream fileStream = wxFileUtil.saveFile(
                Path.Combine(GetContentFolderPath(), wxFileUtil.cleanIllegalChar(assetMD5, true)), null
            );
            wxFileUtil.WriteData(fileStream, content.ToString(false));
            fileStream.Close();

            SaveFileManifest(relativePath, "json", assetMD5);
        }

        // 添加一个fileType是text的文件资源
        public static void AddTextFile(
            string relativePath,
            string content,
            string assetMD5
        )
        {
            if (relativePath == null || relativePath == "")
            {
                throw new System.Exception("empty resourcePath");
            }

            FileStream fileStream = wxFileUtil.saveFile(
                Path.Combine(GetContentFolderPath(), wxFileUtil.cleanIllegalChar(assetMD5, true)), null
            );
            wxFileUtil.WriteData(fileStream, content);
            fileStream.Close();

            SaveFileManifest(relativePath, "text", assetMD5);
        }

        public static void AddCopyFile(
            string relativePath,
            string fileType,
            string assetMD5
        )
        {
            if (relativePath == null || relativePath == "")
            {
                throw new System.Exception("empty resourcePath");
            }

            wxFileUtil.CopyFile(
                relativePath,
                Path.Combine(GetContentFolderPath(), wxFileUtil.cleanIllegalChar(assetMD5, true))
            );

            SaveFileManifest(relativePath, fileType, assetMD5);
        }

        /*
         * 往缓存库里添加一个资源
         */
        public static void AddResource(
            string descriptionFilePath,
            string resourceType,

            // 依赖的资源
            List<string> dependencies,

            // 这个资源使用到的文件
            List<string> useFile,

            JSONObject importSetting = null
        )
        {
            if (descriptionFilePath == null || descriptionFilePath == "")
            {
                throw new System.Exception("empty resourcePath");
            }

            JSONObject storageResourceJSON = storage.GetField("assets");

            JSONObject fileItem = new JSONObject(JSONObject.Type.OBJECT);
            fileItem.AddField("descriptionPath", descriptionFilePath);
            fileItem.AddField("type", resourceType);
            fileItem.AddField("dependencies", WXUtility.ConvertListToJSONArray(dependencies));
            fileItem.AddField("useFile", WXUtility.ConvertListToJSONArray(useFile));
            if (importSetting != null)
            {
                fileItem.AddField("importSetting", importSetting);
            }

            storageResourceJSON.AddField(descriptionFilePath, fileItem);

            saveStorage();
        }

        public static void GenerateResourcePackage(string packageName, string resourcePath, string packageTypeName = ".mgepackage/")
        {
            string destPath = Path.Combine(exportPath == "" ? ExportStore.storagePath : exportPath, packageName + packageTypeName);

            List<string> resources = new List<string>();
            resources.Add(resourcePath);

            WXExportPackageGenerator generator = new WXExportPackageGenerator(destPath, resources);
            generator.Generate();
        }
        public static void GenerateResourcePackage(string packageName, List<string> resources, string packageTypeName = ".mgepackage/")
        {
            string destPath = Path.Combine(exportPath == "" ? ExportStore.storagePath : exportPath, packageName + packageTypeName);

            WXExportPackageGenerator generator = new WXExportPackageGenerator(destPath, resources);
            generator.Generate();
        }

        class WXExportPackageGenerator
        {
            private string destPath;
            private List<string> entryResources;

            private JSONObject packageGroupManifest;
            private JSONObject packageGroupManifest_resourceDefinitions;
            private JSONObject packageGroupManifest_fileDescription;
            private JSONObject packageGroupManifest_files;

            public WXExportPackageGenerator(string destPath, List<string> entryResources)
            {
                this.destPath = destPath;
                this.entryResources = entryResources;

                packageGroupManifest = new JSONObject(JSONObject.Type.OBJECT);
                packageGroupManifest_resourceDefinitions = new JSONObject(JSONObject.Type.OBJECT);
                packageGroupManifest.AddField("resourceDefinitions", packageGroupManifest_resourceDefinitions);
                packageGroupManifest_fileDescription = new JSONObject(JSONObject.Type.OBJECT);
                packageGroupManifest.AddField("fileDescriptions", packageGroupManifest_fileDescription);
                packageGroupManifest_files = new JSONObject(JSONObject.Type.ARRAY);
                packageGroupManifest.AddField("files", packageGroupManifest_files);
                packageGroupManifest.AddField("version", PluginHub.frameworkVersion);
            }

            /**
             * 生成一个资源包
             * @param destPath 目标路径
             * @param resources 要打进去的资源路径
             */
            public void Generate()
            {
                // string zipPath = destPath[destPath.Length - 1] == '/' ? destPath.Substring (0, destPath.Length - 1) : destPath;

                // using (FileStream fsOut = File.Create (zipPath))
                // using (ZipOutputStream zipStream = new ZipOutputStream (fsOut)) {
                //     foreach (string resourceDescriptionFilePath in entryResources) {
                //         writeResourceRecursive (resourceDescriptionFilePath, zipStream);
                //     }

                //     zipStream.PutNextEntry (new ZipEntry ("group.manifest.json"));
                //     byte[] groupManifestBytes = Encoding.UTF8.GetBytes (packageGroupManifest.Print (true));
                //     zipStream.Write (groupManifestBytes, 0, groupManifestBytes.Length);
                //     zipStream.CloseEntry ();
                //     zipStream.Close ();
                // }
                foreach (string resourceDescriptionFilePath in entryResources)
                {
                    writeResourceRecursive(resourceDescriptionFilePath);
                }
                wxFileUtil.SaveJsonFile(packageGroupManifest, Path.Combine(destPath, "group.manifest.json"));
            }


            private void writeResourceRecursive(string resourceDescriptionFilePath)
            {
                // 如果已经转换过了
                if (packageGroupManifest_resourceDefinitions.HasField(resourceDescriptionFilePath))
                {
                    return;
                }
                // 先找到之前已经写入缓存表的资源。
                JSONObject resourceStorage = storage.GetField("assets").GetField(resourceDescriptionFilePath);
                if (resourceStorage == null)
                {
                    Debug.LogError("创建资源包时写入'" + resourceDescriptionFilePath + "'失败，没有找到该资源的转换记录");
                    return;
                }

                // 创建每一个资源definition的json对象
                JSONObject definitionObject = new JSONObject(JSONObject.Type.OBJECT);
                packageGroupManifest_resourceDefinitions.AddField(resourceDescriptionFilePath, definitionObject);

                // 写入字段
                definitionObject.AddField("dependencies", resourceStorage.GetField("dependencies"));
                definitionObject.AddField("type", resourceStorage.GetField("type"));
                definitionObject.AddField("descriptionFileID", resourceDescriptionFilePath);
                if (resourceStorage.GetField("importSetting") != null)
                {
                    definitionObject.AddField("importSetting", resourceStorage.GetField("importSetting"));
                }

                // 把记在缓存里的useFile拿出来，遍历，写入group.manifest.json的fileDescription字段
                // 并且排除掉resourceDescriptionFilePath之后放入resourceDefinition
                JSONObject outputUseFileArray = new JSONObject(JSONObject.Type.ARRAY);
                definitionObject.AddField("useFile", outputUseFileArray);

                // 放入文件
                foreach (string usingFile in WXUtility.ConvertJSONArrayToList(resourceStorage.GetField("useFile")))
                {
                    if (usingFile != resourceDescriptionFilePath)
                    {
                        outputUseFileArray.Add(usingFile);
                    }
                    if (packageGroupManifest_fileDescription.HasField(usingFile))
                    {
                        continue;
                    }
                    JSONObject fileStorage = storage.GetField("files").GetField(usingFile);

                    // add fileDescriptions
                    JSONObject fileDescription = new JSONObject(JSONObject.Type.OBJECT);
                    packageGroupManifest_fileDescription.AddField(usingFile, fileDescription);
                    fileDescription.AddField("path", usingFile);

                    // add files 555
                    JSONObject fileItem = new JSONObject(JSONObject.Type.OBJECT);
                    fileItem.AddField("path", usingFile);
                    fileItem.AddField("filetype", fileStorage.GetField("filetype"));
                    packageGroupManifest_files.Add(fileItem);

                    wxFileUtil.CopyFile(
                        Path.Combine(storagePath, Path.Combine(CONTENT_FOLDER, fileStorage.GetField("MD5").GetRawString())),
                        Path.Combine(destPath, usingFile)
                    );
                }

                // 递归转依赖
                foreach (string dependencyResource in WXUtility.ConvertJSONArrayToList(resourceStorage.GetField("dependencies")))
                {
                    writeResourceRecursive(dependencyResource);
                }
            }

            private void writeResourceRecursive(string resourceDescriptionFilePath, ZipOutputStream zipStream)
            {
                // 如果已经转换过了
                if (packageGroupManifest_resourceDefinitions.HasField(resourceDescriptionFilePath))
                {
                    return;
                }
                // 先找到之前已经写入缓存表的资源。
                JSONObject resourceStorage = storage.GetField("assets").GetField(resourceDescriptionFilePath);
                if (resourceStorage == null)
                {
                    Debug.LogError("创建资源包时写入'" + resourceDescriptionFilePath + "'失败，没有找到该资源的转换记录");
                    return;
                }

                // 创建每一个资源definition的json对象
                JSONObject definitionObject = new JSONObject(JSONObject.Type.OBJECT);
                packageGroupManifest_resourceDefinitions.AddField(resourceDescriptionFilePath, definitionObject);

                // 写入字段
                definitionObject.AddField("dependencies", resourceStorage.GetField("dependencies"));
                definitionObject.AddField("type", resourceStorage.GetField("type"));
                definitionObject.AddField("descriptionFileID", resourceDescriptionFilePath);
                if (resourceStorage.GetField("importSetting") != null)
                {
                    definitionObject.AddField("importSetting", resourceStorage.GetField("importSetting"));
                }

                // 把记在缓存里的useFile拿出来，遍历，写入group.manifest.json的fileDescription字段
                // 并且排除掉resourceDescriptionFilePath之后放入resourceDefinition
                JSONObject outputUseFileArray = new JSONObject(JSONObject.Type.ARRAY);
                definitionObject.AddField("useFile", outputUseFileArray);

                // 放入文件
                foreach (string usingFile in WXUtility.ConvertJSONArrayToList(resourceStorage.GetField("useFile")))
                {
                    if (usingFile != resourceDescriptionFilePath)
                    {
                        outputUseFileArray.Add(usingFile);
                    }
                    if (packageGroupManifest_fileDescription.HasField(usingFile))
                    {
                        continue;
                    }
                    JSONObject fileStorage = storage.GetField("files").GetField(usingFile);

                    // add fileDescriptions
                    JSONObject fileDescription = new JSONObject(JSONObject.Type.OBJECT);
                    packageGroupManifest_fileDescription.AddField(usingFile, fileDescription);
                    fileDescription.AddField("path", usingFile);

                    // add files 555
                    JSONObject fileItem = new JSONObject(JSONObject.Type.OBJECT);
                    fileItem.AddField("path", usingFile);
                    fileItem.AddField("filetype", fileStorage.GetField("filetype"));
                    packageGroupManifest_files.Add(fileItem);

                    zipStream.PutNextEntry(new ZipEntry(usingFile));
                    var buffer = new byte[10240];
                    using (FileStream fsInput = File.OpenRead(Path.Combine(storagePath, Path.Combine(CONTENT_FOLDER, fileStorage.GetField("MD5").GetRawString()))))
                    {
                        StreamUtils.Copy(fsInput, zipStream, buffer);
                    }
                }

                // 递归转依赖
                foreach (string dependencyResource in WXUtility.ConvertJSONArrayToList(resourceStorage.GetField("dependencies")))
                {
                    writeResourceRecursive(dependencyResource, zipStream);
                }
            }

            /**
             * 递归获取一段资源列表的所有依赖资源
             */
            private void GetAllDependenciesList(
                ref List<string> allDependenciesList, // 最终结果
                List<string> resources // 要记入的资源
            )
            {
                //Debug.Log("GetAllDependenciesList" + allDependenciesList.ToArray().Length); 
                foreach (string resourcePath in resources)
                {
                    JSONObject resourceStorage = storage.GetField(resourcePath);
                    if (resourceStorage == null)
                    {
                        Debug.LogError("创建资源包时写入'" + resourcePath + "'失败，没有找到该资源的转换记录");
                        continue;
                    }

                    List<string> dependencies = WXUtility.ConvertJSONArrayToList(
                        resourceStorage.GetField("dependencies")
                    );

                    if (dependencies != null && dependencies.ToArray().Length > 0)
                    {
                        GetAllDependenciesList(ref allDependenciesList, dependencies);

                        // 排重后add入
                        foreach (string dependency in dependencies)
                        {
                            if (!allDependenciesList.Contains(dependency))
                            {
                                allDependenciesList.Add(dependency);
                            }
                        }
                    }
                    // 加入它本身
                    if (!allDependenciesList.Contains(resourcePath))
                    {
                        allDependenciesList.Add(resourcePath);
                    }
                }
            }
        }
    }

}