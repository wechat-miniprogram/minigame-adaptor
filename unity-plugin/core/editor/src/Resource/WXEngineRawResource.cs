
using System.IO;
using System;
using System.Runtime.CompilerServices;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

[assembly: InternalsVisibleToAttribute("ScriptExport")]
namespace WeChat
{
    internal class WXRawResource : WXResource
    {

        public WXRawResource(string iPath): base(iPath)
        {
            if (unityAssetPath == null || unityAssetPath == "")
            {
                ErrorUtil.ExportErrorReporter.create()
                    .setResource(this)
                    .error(ErrorUtil.ErrorCode.RawResource_PathError, "RawResource文件的unity路径为空");
            }
        }

        private static string GetFileType(string path)
        {
            // unity supported audio/video formats
            string[] audio_video_formats = { ".map", ".ogg", ".wav", ".aiff", ".aif", ".mod", ".it", ".s3m", ".xm", // audio
            ".mp4", ".asf", ".avi", ".dv", ".m4v", ".mov", ".mpg", ".mpeg", ".ogv", ".vp8", ".webm", ".wmv" // video
             };

            // unity supported text formats
            string[] text_formats = { ".txt", ".html", ".htm", ".xml", ".bytes", ".csv", ".yaml", ".fnt" };

            // unity supported image formats
            string[] image_formats = { ".bmp", ".exr", ".jpg", ".iff", ".pict", ".png", ".psd", ".tga", ".tiff"/*,".gif", ".hdr", ""*/ };

            // json format 
            string[] json_formats = { ".json" };

            int dot_index = path.IndexOf('.');

            if (dot_index == -1) return "arraybuffer";

            string suffix_name = path.Substring(dot_index);

            if (Array.IndexOf(audio_video_formats, suffix_name) != -1) return "url";
            else if (Array.IndexOf(text_formats, suffix_name) != -1) return "text";
            else if (Array.IndexOf(image_formats, suffix_name) != -1) return "image";
            else if (Array.IndexOf(json_formats, suffix_name) != -1) return "json";
            // 为了做fbx导出做的逻辑 详讯jasonjwang
            else if (suffix_name == ".fbx") return "url";

            return "";
        }

        public override string GetHash()
        {
            string asset_version = WXUtility.GetMD5FromAssetPath(unityAssetPath);
            return asset_version;
        }

        protected override string GetResourceType()
        {
            return "raw";
        }

        public override string GetExportPath()
        {
            return unityAssetPath + ".raw";
        }

        protected override JSONObject ExportResource(ExportPreset preset)
        {
            JSONObject metadata = JSONObject.Create("{\"file\": {}}");

            string file_type = GetFileType(unityAssetPath);
            metadata.GetField("file").SetField("src", AddFile(new WXEngineCopyFile(unityAssetPath, file_type)));

            return metadata;
        }
    }
}
