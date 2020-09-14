using System.Collections.Generic;
using UnityEngine;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleToAttribute("ScriptExport")]
namespace WeChat
{

    class WXAnimation : WXComponent
    {

        private Animation animation;
        private GameObject gameObject;

        public override string getTypeName()
        {
            return "Animation";
        }

        public WXAnimation(Animation animation, GameObject gameObject)
        {
            this.gameObject = gameObject;
            this.animation = animation;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());
            json.AddField("data", data);
            List<KeyValuePair<string, string>> clips = new List<KeyValuePair<string, string>>();
            string defaultClip = null;
            foreach (var anim in animation)
            {
                if (anim.GetType() == typeof(AnimationState))
                {
                    var uid = HandleAnimationClip(context, (anim as AnimationState).clip);
                    clips.Add(new KeyValuePair<string, string>((anim as AnimationState).clip.name, uid));
                    if (animation.clip == (anim as AnimationState).clip)
                    {
                        defaultClip = (anim as AnimationState).clip.name;
                    }
                }
            }
            if (defaultClip == null)
            {
                data.AddField("clip", new JSONObject(JSONObject.Type.NULL));
            }
            else
            {
                data.AddField("clip", defaultClip);
            }
            JSONObject clipsJSON = new JSONObject(JSONObject.Type.ARRAY);
            data.AddField("clips", clipsJSON);
            for (int i = 0; i < clips.Count; i++)
            {
                var childClip = clips[i];
                JSONObject clipInfo = new JSONObject(JSONObject.Type.OBJECT);
                clipInfo.AddField("name", childClip.Key);
                clipInfo.AddField("clip", childClip.Value);
                clipsJSON.Add(clipInfo);
            }
            data.AddField("autoPlay", animation.playAutomatically);
            return json;
        }
        public string HandleAnimationClip(WXHierarchyContext context, AnimationClip animationClip)
        {
            string uid = new WXAnimationClip(animationClip).Export(context.preset);

            // 因为AnimationClip没走AddFile，这里要手动加dependenices
            //WXBeefBallExportContext.instance.keys.Add(uid, true);
            context.AddResource(uid);
            return uid;
        }

    }

}
