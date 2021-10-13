using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
using System.Text.RegularExpressions;
using System.IO;

namespace WeChat
{
	class WXFont : WXResource
	{
		public WXFont(string fontPath): base(fontPath)
		{
		}

        public override string GetHash()
        {
            return WXUtility.GetMD5FromAssetPath(unityAssetPath);
		}

        protected override string GetResourceType()
        {
            return "font";
        }

        public override string GetExportPath()
        {
            return unityAssetPath + ".font";
        }

        protected override JSONObject ExportResource(ExportPreset preset)
		{
            string fileName = Path.GetFileName(unityAssetPath);
            string lowerFileName = fileName.ToLower();
            string _fontPath = unityAssetPath.Replace(fileName, lowerFileName);

            JSONObject jsonFile = JSONObject.Create("{\"file\": {}}");
            jsonFile.GetField("file").AddField(
                "src",
                AddFile(new WXEngineCopyFile(_fontPath, "font"))
            );

            jsonFile.AddField("version", 2);
            return jsonFile;
		}

	}
}
