using System;
using UnityEditor;
using UnityEngine;
using System.Collections.Generic;
using System.Linq;
using UnityEditor.Animations;
using System.IO;
using System.Text;

namespace WeChat
{
	public class WXEngineAudioSource : WXComponent
	{
		private AudioSource audio;

		public override string getTypeName() {
			string result;
			if (audio) {
				result = this.audio.GetType().ToString();
			} else {
				result = "UnityEngine.AudioSource";
			}
			return WXMonoBehaviourExportHelper.EscapeNamespace(result);
		}

		public WXEngineAudioSource(AudioSource audio)
		{
			this.audio = audio;
		}

		protected override JSONObject ToJSON(WXHierarchyContext context)
		{
			JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
			JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
			json.AddField("type", getTypeName());
			json.AddField("data", data);

			if (audio != null && audio.clip != null)
			{
				AudioClip clip = audio.clip;
				// var clipResource = new WXBeefBallAudioClip(clip);
				// var path = clipResource.Export();
				// if (!path.Equals("")) {
				//     context.AddResource(path);
				// }

				var path = AssetDatabase.GetAssetPath(clip);
				//string copyToPath = Path.Combine(WXResourceStore.storagePath, path);
                path = new WXRawResource(path).Export(context.preset);
				context.AddResource(path);

				//string subpath = path;
				//if (subpath.StartsWith("Assets"))
				//{
				//	subpath = path.Substring(6);
				//}
				//#if UNITY_EDITOR_WIN
				//string fromPath = Application.dataPath + "\\" + subpath;
				//#else
				//string fromPath = Application.dataPath + "/" + subpath;
				//#endif
				//try
				//{
				//	wxFileUtil.CopyFile(fromPath, copyToPath);
				//}
				//catch (Exception e1)
				//{
				//	Debug.Log(e1);
				//}

				data.AddField("action", true);
				data.AddField("_clip", path);

				data.AddField("_mute", this.audio.mute);
				data.AddField("_playOnAwake", this.audio.playOnAwake);
				data.AddField("_loop", this.audio.loop);
				data.AddField("_volume", this.audio.volume);
			}

			return json;
		}
	}
}
