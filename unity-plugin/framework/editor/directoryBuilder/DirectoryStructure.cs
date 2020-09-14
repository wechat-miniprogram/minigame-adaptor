using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using UnityEngine;

namespace WeChat {
    public class DirectoryStructure {

        public sealed class ResInfo {
            public string src;
            public string dst;
            public bool hashCheck;
            public bool isDirectory;

        }

        public sealed class SubDirWrapper {

            private DirectoryStructure structure;
            public string this [string path] {
                get {
                    return structure.GetFile (subDirectory, path);
                }
                set {
                    structure.SetFile (subDirectory, path, value);
                } 
            }

            public SubDirWrapper (DirectoryStructure s) {
                this.structure = s;
            }

            public string subDirectory {
                private get;
                set;
            }

            public string PathToAssets {
                get {
                    return Path.Combine (structure.FullPath, subDirectory).PathToAssets ();
                }
            }

            public string FullPath {
                get {
                    return Path.Combine (structure.FullPath, subDirectory);
                }
            }

            public string GetFilePath (string path) {
                var dst = Path.Combine (FullPath, path);
                var dir = Path.GetDirectoryName (dst);
                if (!Directory.Exists (dir)) {
                    Directory.CreateDirectory (dir);
                }
                return dst;
            }

            public bool Exists(string path) {
                var fullPath = Path.Combine(this.FullPath, path);
                if (Directory.Exists(fullPath)) {
                    return true;
                }
                if (File.Exists(fullPath)) {
                    return true;
                }
                return false;
            }
        }

        private static readonly string topRoot = Path.Combine (Application.dataPath, "WeChatMiniGame");
        private string rootName;
        private DirectoryInfo rootInfo;

        private Dictionary<string, DirectoryInfo> subDirectoriesMap;
        private Dictionary<DirectoryInfo, string> subDirectoriesReadmeMap;
        private Dictionary<DirectoryInfo, Dictionary<string, ResInfo>> subDirectoriesFilesMap;

        private SubDirWrapper wrapper;

        private string topRootDefaultReadmeContent = "## 微信小游戏数据目录\r\n### 请勿手动**移动**或**随意改动**该文件夹及该文件夹内所有文件\r\n";
        private string readmeContent;

        public static string TopRoot {

            get { return topRoot; }
        }

        public string Root {
            get {
                return rootName;
            }
            set {
                rootName = value;

                if (rootInfo != null && rootInfo.FullName == value) return;

                rootInfo = new DirectoryInfo (Path.Combine (topRoot, value));
            }
        }

        public string FullPath {
            get {
                return rootInfo.FullName;
            }
        }

        public DirectoryStructure (string root) {
            this.Root = root;

            this.subDirectoriesMap = new Dictionary<string, DirectoryInfo> ();
            this.subDirectoriesReadmeMap = new Dictionary<DirectoryInfo, string> ();
            this.subDirectoriesFilesMap = new Dictionary<DirectoryInfo, Dictionary<string, ResInfo>> ();

            this.wrapper = new SubDirWrapper (this);
        }

        public void AddReadme (string content) {
            this.readmeContent = content;
        }

        public void AddSubDirectory (string pathToRoot, string readmeContent = null) {
            if (!this.subDirectoriesMap.ContainsKey (pathToRoot)) {
                var fullPath = Path.Combine (this.FullPath, pathToRoot);
                var sub = new DirectoryInfo (fullPath);
                this.subDirectoriesMap.Add (pathToRoot, sub);

                if (!this.subDirectoriesReadmeMap.ContainsKey (sub) && readmeContent != null) {
                    this.subDirectoriesReadmeMap.Add (sub, readmeContent);
                }
            }

        }

        public void SetReadmeAtSubDirectory (string subDir, string readmeContent) {
            if (this.subDirectoriesMap.ContainsKey (subDir)) {
                var sub = this.subDirectoriesMap[subDir];

                if (this.subDirectoriesReadmeMap.ContainsKey (sub)) {
                    this.subDirectoriesReadmeMap[sub] = readmeContent;
                } else {
                    this.subDirectoriesReadmeMap.Add (sub, readmeContent);
                }
            }
        }

        public string GetSubDirectoryFullPath (string sub) {
            try {
                var d = this.subDirectoriesMap[sub];
                return d.FullName;
            } catch (System.Collections.Generic.KeyNotFoundException e) {
                throw new System.Exception ("[Directory Builder]: no such key <" + sub + ">\n" + e);
            }
        }

        public void AddFileAtSubDirectory (string subDirToRoot, string fileSrc, string fileDstToSub, bool overwrite = false) {
            if (!this.subDirectoriesMap.ContainsKey (subDirToRoot)) {
                AddSubDirectory (subDirToRoot);
            }

            var sub = this.subDirectoriesMap[subDirToRoot];

            var res = new ResInfo () {
                src = fileSrc,
                dst = Path.Combine (sub.FullName, fileDstToSub),
                hashCheck = overwrite,
                isDirectory = false
            };

            if (this.subDirectoriesFilesMap.ContainsKey (sub)) {
                var files = this.subDirectoriesFilesMap[sub];
                if (!files.ContainsKey (fileDstToSub)) {
                    files.Add (fileDstToSub, res);
                } else {
                    files[fileDstToSub] = res;
                }
            } else {
                var map = new Dictionary<string, ResInfo> ();
                map.Add (fileDstToSub, res);
                this.subDirectoriesFilesMap.Add (sub, map);
            }
        }

        public string AddExistFileAtSubDirectory (string subDirToRoot, string pathToSub) {
            if (!this.subDirectoriesMap.ContainsKey (subDirToRoot)) {
                AddSubDirectory (subDirToRoot);
            }

            var sub = this.subDirectoriesMap[subDirToRoot];

            var res = new ResInfo () {
                src = "existed",
                dst = Path.Combine (sub.FullName, pathToSub),
                hashCheck = false,
                isDirectory = false
            };

            if (this.subDirectoriesFilesMap.ContainsKey (sub)) {
                var m = this.subDirectoriesFilesMap[sub];
                if (!m.ContainsKey (pathToSub)) {
                    m.Add (pathToSub, res);
                }
            } else {
                var map = new Dictionary<string, ResInfo> ();
                map.Add (pathToSub, res);
                this.subDirectoriesFilesMap.Add (sub, map);
            }

            return res.dst;
        }

        public void AddDirectoryAtSubDirectory (string subDirToRoot, string dirSrc, string dirDstToSub, bool overwrite = false) {
            if (!this.subDirectoriesMap.ContainsKey (subDirToRoot)) {
                AddSubDirectory (subDirToRoot);
            }

            var sub = this.subDirectoriesMap[subDirToRoot];

            var res = new ResInfo () {
                src = dirSrc,
                dst = Path.Combine (sub.FullName, dirDstToSub),
                hashCheck = overwrite,
                isDirectory = true
            };

            if (this.subDirectoriesFilesMap.ContainsKey (sub)) {
                var files = this.subDirectoriesFilesMap[sub];
                if (!files.ContainsKey (dirDstToSub)) {
                    files.Add (dirDstToSub, res);
                } else {
                    files[dirDstToSub] = res;
                }
            } else {
                var map = new Dictionary<string, ResInfo> ();
                map.Add (dirDstToSub, res);
                this.subDirectoriesFilesMap.Add (sub, map);
            }
        }

        public SubDirWrapper this [string sub] {
            get { 
                return GetWrapper (sub);
            }
        }

        private SubDirWrapper GetWrapper (string sub) {
            this.wrapper.subDirectory = sub;
            return this.wrapper;
        }

        public string GetFile (string sub, string pathToSub) {
            if (!subDirectoriesMap.ContainsKey(sub)) {
                var _sub = Path.Combine(FullPath, sub);
                if (Directory.Exists(_sub)) {
                    subDirectoriesMap.Add(sub, new DirectoryInfo(_sub));
                }
            }

            var dirInfo = subDirectoriesMap[sub];
            var fullPathDir = Path.GetDirectoryName (Path.Combine (dirInfo.FullName, pathToSub));
            if (!Directory.Exists (fullPathDir)) {
                Directory.CreateDirectory (fullPathDir);
            }
            if (subDirectoriesFilesMap.ContainsKey (dirInfo)) {
                var info = subDirectoriesFilesMap[dirInfo];
                if (info.ContainsKey (pathToSub)) {
                    return info[pathToSub].dst;
                } else {
                    var full = Path.Combine (dirInfo.FullName, pathToSub);
                    if (File.Exists (full)) {
                        return AddExistFileAtSubDirectory (sub, pathToSub);
                    } else {
                        // throw new Exception("[Directory Builder]: no such File or Directory <" + dirInfo.FullName + ">\n");
                        return full;
                    }
                }
            } else {
                var full = Path.Combine (dirInfo.FullName, pathToSub);
                if (File.Exists (full)) {
                    return AddExistFileAtSubDirectory (sub, pathToSub);
                } else {
                    // throw new Exception("[Directory Builder]: no such File or Directory <" + dirInfo.FullName + ">\n");
                    return full;
                }
            }
        }

        public void SetFile(string sub, string pathToSub, string src)
        {
            if (!File.Exists(src)) {
                Debug.LogWarning("File not exist: " + src);
                return;
            }

            // Debug.Log("=== " + pathToSub + "\n" + sub + "\n" + src);
            if (IsDirectory (src)) {
                AddDirectoryAtSubDirectory (sub, src, pathToSub, true);
            } else {
                AddFileAtSubDirectory (sub, src, pathToSub, true);
                WriteFile (sub, pathToSub);
            }
        }

        public void BuildDirectory () {
            // Build Top Root
            if (!Directory.Exists (topRoot)) {
                Directory.CreateDirectory (topRoot);
            }

            // Build Root
            if (!this.rootInfo.Exists) {
                this.rootInfo.Create ();
                var rootReadmePath = Path.Combine (this.rootInfo.FullName, "README.md");
                using (var sw = new StreamWriter (rootReadmePath)) {
                    sw.WriteLine (this.topRootDefaultReadmeContent);
                }
            }

            // Build Sub Directory
            if (this.subDirectoriesMap != null && this.subDirectoriesMap.Count > 0) {
                foreach (var sub in this.subDirectoriesMap.Values) {
                    sub.Create ();
                }
            }

            // Write Readmes
            // Root
			if (this.readmeContent != null) {
				var readmePath = Path.Combine (this.FullPath, "README.md");
				using (var sw = new StreamWriter (readmePath)) {
					sw.WriteLine (this.readmeContent);
				}
			}
            // Sub Directory
            if (this.subDirectoriesReadmeMap != null && this.subDirectoriesReadmeMap.Count > 0) {
                foreach (var sub in this.subDirectoriesReadmeMap) {
                    var readmePath = Path.Combine (this.FullPath, sub.Key.FullName);
                    readmePath = Path.Combine (readmePath, "README.md");
                    using (var sw = new StreamWriter (readmePath)) {
                        sw.WriteLine (sub.Value);
                    }
                }
            }

            // Write Files
            if (this.subDirectoriesFilesMap != null && this.subDirectoriesFilesMap.Count > 0) {
                foreach (var sub in this.subDirectoriesFilesMap.Values) {
                    foreach (var res in sub.Values) {
                        if (!res.isDirectory) {
                            var dstDir = Path.GetDirectoryName (res.dst);
                            if (!Directory.Exists (dstDir)) {
                                Directory.CreateDirectory (dstDir);
                            }
                            // Debug.Log("dst: " + res.src);
                            // Debug.Log("src: " + res.dst);
                            try {
                                if (!res.hashCheck && File.Exists (res.dst) && CompareMD5 (res.src, res.dst)) {
                                    // Debug.Log("same file, do nothing");
                                } else {
                                    if (File.Exists (res.src)) {
                                        File.Copy (res.src, res.dst, true);
                                    }
                                }
                            } catch (Exception e) {
                                throw new Exception ("[Directory Builder]: " + e);
                            }
                        } else {
                            DirectoryCopy (res.src, res.dst, true, res.hashCheck);
                        }
                    }
                }
            }
        }

        public void WriteFile (string sub, string dst) {
            try {
                var res = subDirectoriesFilesMap[subDirectoriesMap[sub]][dst];
                if (res.isDirectory) return;

                var dstDir = Path.GetDirectoryName (res.dst);
                if (!Directory.Exists (dstDir)) {
                    Directory.CreateDirectory (dstDir);
                }

                if (!res.hashCheck && File.Exists (res.dst) && CompareMD5 (res.src, res.dst)) {
                    // Debug.Log("same file, do nothing");
                } else {
                    File.Copy (res.src, res.dst, true);
                }
            } catch (Exception e) {
                throw new Exception ("[Directory Builder]: " + e);
            }
        }

        public bool HasFileAtSubDirectory (string sub, string pathToSub) {
            var path = Path.Combine(FullPath, sub);
            path = Path.Combine(path, pathToSub);

            return File.Exists (path);
        }

        private static bool IsDirectory (string path) {
            return Directory.Exists (path);
        }

        private static void DirectoryCopy (string sourceDirName, string destDirName, bool copySubDirs, bool overwrite) {
            // Get the subdirectories for the specified directory.
            DirectoryInfo dir = new DirectoryInfo (sourceDirName);

            if (!dir.Exists) {
                throw new DirectoryNotFoundException (
                    "Source directory does not exist or could not be found: " +
                    sourceDirName);
            }

            DirectoryInfo[] dirs = dir.GetDirectories ();
            // If the destination directory doesn't exist, create it.
            if (!Directory.Exists (destDirName)) {
                Directory.CreateDirectory (destDirName);
            }

            // Get the files in the directory and copy them to the new location.
            FileInfo[] files = dir.GetFiles ();
            foreach (FileInfo file in files) {
                string temppath = Path.Combine (destDirName, file.Name);
                if (!overwrite && File.Exists (temppath) && CompareMD5 (file.FullName, temppath)) {
                    // Debug.Log("same file, do nothing");
                    continue;
                }

                file.CopyTo (temppath, true);
            }

            // If copying subdirectories, copy them and their contents to new location.
            if (copySubDirs) {
                foreach (DirectoryInfo subdir in dirs) {
                    string temppath = Path.Combine (destDirName, subdir.Name);
                    DirectoryCopy (subdir.FullName, temppath, copySubDirs, overwrite);
                }
            }
        }

        private static string CalculateMD5 (string filename) {
            using (var md5 = MD5.Create ()) {
                using (var stream = File.OpenRead (filename)) {
                    var hash = md5.ComputeHash (stream);
                    var res = BitConverter.ToString (hash).Replace ("-", "").ToLowerInvariant ();
                    // Debug.Log(filename + ": " + res);
                    return res;
                }
            }
        }

        private static bool CompareMD5 (string file1, string file2) {
            if (file1 == "existed") return true;
            return CalculateMD5 (file1) == CalculateMD5 (file2);
        }
    }

}