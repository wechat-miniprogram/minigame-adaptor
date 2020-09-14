// Warning: Some assembly references could not be loaded. This might lead to incorrect decompilation of some parts,
// for ex. property getter/setter access. To get optimal decompilation results, please manually add the references to the list of loaded assemblies.
// Util.wxFileUtil
using System;
using System.IO;
using System.Text;
using UnityEditor;
using UnityEngine;
using WeChat;

using Path = Pri.LongPath.Path;
using Directory = Pri.LongPath.Directory;
using DirectoryInfo = Pri.LongPath.DirectoryInfo;
using File = Pri.LongPath.File;
namespace WeChat {
    public class wxWinFileUtil {
        public static FileStream saveFile (string fileName, JSONObject node = null) {

            string directoryName = Path.GetDirectoryName (fileName);
            if (!Directory.Exists (directoryName)) {
                Directory.CreateDirectory (directoryName);
            }
            FileStream fileStream = new FileStream (fileName, FileMode.Create, FileAccess.Write);
            if (node == null) {
                return fileStream;
            }
            StreamWriter streamWriter = new StreamWriter (fileStream);
            string value = node.Print (true);
            streamWriter.Write (value);
            streamWriter.Close ();
            return fileStream;
        }

        public static void CopyFile (string from, string to) {
            string directoryName = Path.GetDirectoryName (to);
            if (!Directory.Exists (directoryName)) {
                Directory.CreateDirectory (directoryName);
            }
            // FileUtil.CopyFileOrDirectory(from, to);
            try {
                File.Copy (from, to, true);
            } catch (Exception ex) {
                //Debug.LogError (string.Format ("{0}: {1}", ex.Message, ex.StackTrace));
            }
        }

        // clean all files and directories in iPath, then delete iPath dir...
        public static void DeleteDirectory (string iPath, string[] ignoreFiles = null) {
            if (iPath == null) return;
            if (Application.platform == RuntimePlatform.WindowsEditor) {
                iPath = iPath.Replace ('/', '\\');
            }

            if (!Directory.Exists (iPath)) return;

            // delete subDir 
            string[] dirPaths = Directory.GetDirectories (iPath);
            for (int i = 0; i < dirPaths.Length; i++) {
                DeleteDirectory (dirPaths[i], ignoreFiles);
            }

            // delete files
            string[] filePaths = Directory.GetFiles (iPath);
            for (int i = 0; i < filePaths.Length; ++i) {
                string extension = Path.GetExtension (filePaths[i]);
                if (ignoreFiles != null && Array.IndexOf (ignoreFiles, extension) >= 0) {
                    continue;
                }
                if (filePaths[i] != null) {
                    File.Delete (filePaths[i]);
                }

            }

            // delete iPath dir...
            if (Directory.GetDirectories (iPath).Length == 0 && Directory.GetFiles (iPath).Length == 0) {
                Directory.Delete (iPath);
            }

        }

        public static void RenameFileExtension (string iPath, string src, string dest) {
            if (!Directory.Exists (iPath)) return;

            // rename subDir 
            string[] dirPaths = Directory.GetDirectories (iPath);
            for (int i = 0; i < dirPaths.Length; i++) {
                RenameFileExtension (dirPaths[i], src, dest);
            }

            // rename files
            string[] filePaths = Directory.GetFiles (iPath);
            for (int i = 0; i < filePaths.Length; ++i) {
                string extension = Path.GetExtension (filePaths[i]);
                if (extension == src) {
                    string dir = Path.GetDirectoryName (filePaths[i]);
                    string name = Path.GetFileNameWithoutExtension (filePaths[i]);
                    string destFile = dir + name + dest;

                    MoveWithReplace (filePaths[i], destFile);

                }
            }
        }

        public static void MoveWithReplace (string sourceFileName, string destFileName) {

            //first, delete target file if exists, as File.Move() does not support overwrite
            if (File.Exists (destFileName)) {
                File.Delete (destFileName);
            }

            File.Move (sourceFileName, destFileName);

        }

        public static bool CheckAccessToPath (string iPath) {
            string UniqueDirName = iPath + "kumo@Path@Check@Dir";
            try {
                Directory.CreateDirectory (UniqueDirName);
                Directory.Delete (UniqueDirName);
                return true;
            } catch (Exception e) {
                return false;
            }
        }

    }
}