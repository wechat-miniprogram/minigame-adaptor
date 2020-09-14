using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
using System.Text.RegularExpressions;
using System.IO;

namespace WeChat
{
	class WXUGUIFont : WXResource
	{
		string _fontPath;
		public WXUGUIFont(string fontPath)
		{
			_fontPath = fontPath;
		}

        public override string GetHash()
        {
            return WXUtility.GetMD5FromAssetPath(_fontPath);
		}

        protected override string GetResourceType()
        {
            return "font";
        }

        public override string GetExportPath()
        {
            return _fontPath + ".font";
        }

        protected override JSONObject ExportResource(ExportPreset preset)
		{
            string fileName = Path.GetFileName(_fontPath);
            string lowerFileName = fileName.ToLower();
            _fontPath = _fontPath.Replace(fileName, lowerFileName);

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
