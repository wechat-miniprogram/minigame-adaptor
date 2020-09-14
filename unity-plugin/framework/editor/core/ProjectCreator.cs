using System.IO;
using System.Runtime.CompilerServices;
using ICSharpCode.SharpZipLib.Zip;
using UnityEditor;
using UnityEngine;
using UnityEngine.Networking;

[assembly : InternalsVisibleToAttribute ("Core"), InternalsVisibleToAttribute ("ScriptExport")]
namespace WeChat {
    public class ProjectCreator {
        const int MAX_LENGTH = 204800000;
        const string EngineQuickStartCDNPrefix = "https://dldir1.qq.com/WechatWebDev/plugins/gameide/quickstart/unity/engine_unity_quickstart_";

        public static void createQuickStartProject (string outputPath) {
            string EngineQuickStartProjURL = EngineQuickStartCDNPrefix + PluginHub.frameworkVersion + ".zip";
            downloadAndUnpackWebURL (outputPath, EngineQuickStartProjURL);
        }

        private static MemoryStream download (string outputPath, string url) {
            UnityWebRequest request = UnityWebRequest.Get (url);

            // if (UnityVersion.UNITY_2017_1_OR_NEWER) {
            //     request.SendWebRequest ();
            // } else if (UnityVersion.UNITY_5_5_OR_NEWER) {
                request.Send ();
            // } else {
            //     return null;
            // }

            while (!request.isDone) { }

            // if ((UnityVersion.UNITY_2017_1_OR_NEWER && !request.isHttpError) || (UnityVersion.UNITY_5_5_OR_NEWER && !request.isError)) {
            if (!request.isError) {
                MemoryStream stream = new MemoryStream (request.downloadHandler.data);
                return stream;
            }

            return null;
        }
        public static bool downloadFromWebURl (string outputPath, string url) {
            MemoryStream stream = download (outputPath, url);
            if (stream == null) {
                Debug.LogError ("下载" + url + "失败");
                return false;
            }
            byte[] buffer = new byte[MAX_LENGTH];
            var length = stream.Read (buffer, 0, MAX_LENGTH);

            using (FileStream fs = new FileStream (outputPath, FileMode.OpenOrCreate)) {
                fs.Write (buffer, 0, length);
            }
            return true;
        }

        public static void downloadAndUnpackWebURL (string outputPath, string url) {
            MemoryStream stream = download (outputPath, url);
            if (stream == null) {
                Debug.LogError ("下载" + url + "失败");
                return;
            }

            ZipInputStream zipStream = new ZipInputStream (stream);
            ZipEntry zipEntry = zipStream.GetNextEntry ();
            byte[] buffer = new byte[MAX_LENGTH];

            while (zipEntry is ZipEntry) {
                var output = new MemoryStream ();
                var length = zipStream.Read (buffer, 0, MAX_LENGTH);
                output.Write (buffer, 0, length);

                if (zipEntry.IsDirectory) {
                    Directory.CreateDirectory (Path.Combine (outputPath, zipEntry.Name));
                } else {
                    FileStream writer = new FileStream (
                        Path.Combine (outputPath, zipEntry.Name),
                        FileMode.OpenOrCreate
                    );

                    writer.Write (buffer, 0, length);
                    writer.Close ();
                }

                zipEntry = zipStream.GetNextEntry ();
            }
        }
    }

}