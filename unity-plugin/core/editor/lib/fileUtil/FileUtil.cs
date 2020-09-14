// Warning: Some assembly references could not be loaded. This might lead to incorrect decompilation of some parts,
// for ex. property getter/setter access. To get optimal decompilation results, please manually add the references to the list of loaded assemblies.
// Util.wxFileUtil
using System;
using System.IO;
using System.Text;
using UnityEditor;
using UnityEngine;
using WeChat;
namespace WeChat {
    public class wxFileUtil {
        public static FileStream saveFile (string fileName, JSONObject node = null) {

            if (Application.platform == RuntimePlatform.WindowsEditor) {
                return wxWinFileUtil.saveFile (fileName, node);
            }
            return wxMacFileUtil.saveFile (fileName, node);
        }

        public static void CopyFile (string from, string to) {

            if (Application.platform == RuntimePlatform.WindowsEditor) {
                wxWinFileUtil.CopyFile (from, to);
            }
            wxMacFileUtil.CopyFile (from, to);
        }

        public static bool SaveJsonFile (JSONObject json, string path) {

            bool suc = false;
            if (path != null && path.Length != 0) {
                FileStream fileStream = saveFile (path, null);
                WriteJSON (fileStream, json.ToString (true));
                fileStream.Close ();
                suc = true;
            }
            return suc;
        }

        public static string getRelativePath (string path1, string path2) {
            string text = "";
            string[] array = path1.Split ('/');
            string[] array2 = path2.Split ('/');
            int num = 0;
            for (int i = 0; i < array.Length - 1 && !(array[i] != array2[i]); i++) {
                num++;
            }
            for (int j = 0; j < array.Length - num - 1; j++) {
                text += "../";
            }
            for (int k = num; k < array2.Length; k++) {
                text += array2[k];
                if (k < array2.Length - 1) {
                    text += "/";
                }
            }
            return text;
        }

        // path2 is subDir of path1
        public static string getSubDirectoryPath (string path1, string path2) {
            string text = "";
            string[] array = path1.Split ('/');
            string[] array2 = path2.Split ('/');
            int num = 0;
            for (int i = 0; i < array.Length - 1 && !(array[i] != array2[i]); i++) {
                num++;
            }
            for (int k = num; k < array2.Length; k++) {
                if (k > num) {
                    text += "/";
                }
                text += array2[k];
            }
            return text;
        }

        public static void WriteData (Stream fs, params int[] datas) {
            for (int i = 0; i < datas.Length; i++) {
                byte[] bytes = BitConverter.GetBytes (datas[i]);
                fs.Write (bytes, 0, bytes.Length);
            }
        }

        public static void WriteData (Stream fs, params long[] datas) {
            for (int i = 0; i < datas.Length; i++) {
                byte[] bytes = BitConverter.GetBytes (datas[i]);
                fs.Write (bytes, 0, bytes.Length);
            }
        }

        public static void WriteData (Stream fs, params byte[] datas) {
            foreach (byte value in datas) {
                fs.WriteByte (value);
            }
        }

        public static void WriteData (Stream fs, params ushort[] datas) {
            for (int i = 0; i < datas.Length; i++) {
                byte[] bytes = BitConverter.GetBytes (datas[i]);
                fs.Write (bytes, 0, bytes.Length);
            }
        }

        public static void WriteData (Stream fs, params short[] datas) {
            for (int i = 0; i < datas.Length; i++) {
                byte[] bytes = BitConverter.GetBytes (datas[i]);
                fs.Write (bytes, 0, bytes.Length);
            }
        }

        public static void WriteData (Stream fs, params uint[] datas) {
            for (int i = 0; i < datas.Length; i++) {
                byte[] bytes = BitConverter.GetBytes (datas[i]);
                fs.Write (bytes, 0, bytes.Length);
            }
        }

        public static void WriteData (Stream fs, params sbyte[] datas) {
            BinaryWriter binaryWriter = new BinaryWriter (fs);
            foreach (sbyte value in datas) {
                binaryWriter.Write (value);
            }
        }

        public static void WriteData (Stream fs, params float[] datas) {
            for (int i = 0; i < datas.Length; i++) {
                byte[] bytes = BitConverter.GetBytes (datas[i]);
                fs.Write (bytes, 0, bytes.Length);
            }
        }

        public static void WriteData (Stream fs, params double[] datas) {
            for (int i = 0; i < datas.Length; i++) {
                byte[] bytes = BitConverter.GetBytes (datas[i]);
                fs.Write (bytes, 0, bytes.Length);
            }
        }

        public static void WriteData (Stream fs, params bool[] datas) {
            for (int i = 0; i < datas.Length; i++) {
                byte[] bytes = BitConverter.GetBytes (datas[i]);
                fs.Write (bytes, 0, bytes.Length);
            }
        }

        public static void WriteData (Stream fs, string data) {
            byte[] bytes = Encoding.UTF8.GetBytes (data);
            fs.Write (bytes, 0, bytes.Length);
        }

        public static void WriteJSON (Stream fs, string data) {
            byte[] bytes = Encoding.UTF8.GetBytes (data);
            fs.Write (bytes, 0, bytes.Length);
        }

        public static string cleanIllegalChar (string str, bool heightLevel) {
            str = str.Replace ("<", "_");
            str = str.Replace (">", "_");
            str = str.Replace ("\"", "_");
            str = str.Replace ("|", "_");
            str = str.Replace ("?", "_");
            str = str.Replace ("*", "_");
            str = str.Replace ("#", "_");
            str = str.Replace (" ", "__");
            if (heightLevel) {
                str = str.Replace ("/", "_");
                str = str.Replace (":", "_");
            }
            return str;
        }

        // ../dir0/.. ../dir1 ==========> ../dir0/.. ../dir1/..
        // 逐个文件拷贝 为了不覆盖meta文件
        public static void CopyDirectory (string src, string dest, string[] ignoreFiles = null) {
            if (src == null || dest == null) return;
            if (Application.platform == RuntimePlatform.WindowsEditor) {
                src = src.Replace ('/', '\\');
            }
            if (!Directory.Exists (src) || !Directory.Exists (dest)) return;

            // Copy sub dir
            string[] dirPaths = Directory.GetDirectories (src);

            for (int i = 0; i < dirPaths.Length; i++) {
                string folderName = getSubDirectoryPath (src, dirPaths[i]);
                string destDir = Path.Combine (dest, folderName);
                if (!Directory.Exists (destDir)) {
                    Directory.CreateDirectory (destDir);
                }
                CopyDirectory (dirPaths[i], destDir);
            }

            // copy files
            string[] filePaths = Directory.GetFiles (src);
            for (int i = 0; i < filePaths.Length; ++i) {
                string extension = Path.GetExtension (filePaths[i]);
                if (ignoreFiles != null && Array.IndexOf (ignoreFiles, extension) >= 0) {
                    continue;
                }
                if (filePaths[i] != null) {
                    CopyFile (filePaths[i], Path.Combine (dest, Path.GetFileName (filePaths[i])));
                }
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

            if (Application.platform == RuntimePlatform.WindowsEditor) {
                return wxWinFileUtil.CheckAccessToPath (iPath);
            }
            return wxMacFileUtil.CheckAccessToPath (iPath);

        }

    }
}