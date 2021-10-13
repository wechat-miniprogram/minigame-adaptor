using System;
using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEditor.Animations;
using UnityEngine;
using System.IO;
using System.Text;
using System.Threading;

namespace WeChat
{

    class WXAvatarMask : WXResource
    {
        protected override string GetResourceType()
        {
            return "avatarmask";
        }

        public override string GetHash()
        {
            return WXUtility.GetMD5FromAssetPath(unityAssetPath) + WXUtility.GetMD5FromString(avatarMask.name);
        }

        public override string GetExportPath()
        {
            int index = unityAssetPath.LastIndexOf('.');
            string filename = index == -1 ? unityAssetPath : unityAssetPath.Substring(0, index);
            return wxFileUtil.cleanIllegalChar(filename, false) + ".avatarmask";
        }

        protected override JSONObject ExportResource(ExportPreset preset)
        {
            JSONObject avatarMaskJSON = new JSONObject(JSONObject.Type.OBJECT);
            avatarMaskJSON.AddField("name", avatarMask.name);
            JSONObject elementsJSON = new JSONObject(JSONObject.Type.OBJECT);
            avatarMaskJSON.AddField("paths", elementsJSON);
            for (int i = 0; i < avatarMask.transformCount; i++)
            {
                elementsJSON.AddField("/" + avatarMask.GetTransformPath(i), avatarMask.GetTransformActive(i) ? 1 : 0);
            }
            return avatarMaskJSON;
        }

        public AvatarMask avatarMask;

        public WXAvatarMask(AvatarMask _avatarMask) : base(AssetDatabase.GetAssetPath(_avatarMask.GetInstanceID()))
        {
            avatarMask = _avatarMask;
        }
    }
}
