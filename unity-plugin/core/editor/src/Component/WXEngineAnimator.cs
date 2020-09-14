using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using UnityEditor;
using UnityEditor.Animations;
using UnityEngine;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleToAttribute("ScriptExport")]
namespace WeChat
{

    class WXAnimator : WXComponent
    {
        public static Dictionary<AnimatorControllerParameterType, int> ParameterType = new Dictionary<AnimatorControllerParameterType, int>
    {
        {AnimatorControllerParameterType.Float,1 },
        {AnimatorControllerParameterType.Int,3 },
        {AnimatorControllerParameterType.Bool,4 },
        {AnimatorControllerParameterType.Trigger,9 }
    };

        private Animator animator;
        private GameObject gameObject;
        private bool curNodeHasLegalChild = false;
        private JSONObject dependencies = new JSONObject(JSONObject.Type.ARRAY);

        public override string getTypeName()
        {
            return "Animator";
        }

        public WXAnimator(Animator animator, GameObject gameObject)
        {
            this.gameObject = gameObject;
            this.animator = animator;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            List<string> linkSprite = new List<string>();
            JSONObject child = new JSONObject(JSONObject.Type.ARRAY);
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject layers = new JSONObject(JSONObject.Type.ARRAY);
            json.AddField("type", getTypeName());
            json.AddField("data", data);
            Avatar avatar = animator.avatar;
            if ((UnityEngine.Object)avatar != (UnityEngine.Object)null)
            {
                WXAvatar converter = new WXAvatar(avatar, gameObject);
                string avatarPath = converter.Export(context.preset);
                if (avatarPath != null && avatarPath != "")
                {
                    data.AddField("avatar", avatarPath);
                    context.AddResource(avatarPath);
                }
            }

            if (gameObject.GetComponent<Animator>().runtimeAnimatorController != null)
            {
                //string controllerId = SaveController(gameObject);
                WXResource controllerConverter = (WXResource)WXResource.getConverter(
                    gameObject.GetComponent<Animator>().runtimeAnimatorController,
                    gameObject
                );
                string animatorControllerPath = controllerConverter.Export(context.preset);
                data.AddField("controller", animatorControllerPath);
                context.AddResource(animatorControllerPath);
            }

            return json;
        }
    }
}
