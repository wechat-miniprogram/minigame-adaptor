using UnityEngine;
using UnityEditor;
using WeChat;

namespace WeChat {
    [InitializeOnLoad]
    internal class WXEngineRegisterNGUIScript {
        static WXEngineRegisterNGUIScript() {
            WXHierarchyContext.registerComponentConverter("091", IterateNGUIScriptComponent);
        }

        private static void IterateNGUIScriptComponent(GameObject go, WXEntity obj, WXHierarchyContext context, ExportPreset preset) {

            UITexture texture = go.GetComponent<UITexture>();
            if (texture != null) {
                obj.components.Add(context.AddComponent(new WXUITextureScript(texture, go, obj), texture));
            }

            UISprite sprite = go.GetComponent<UISprite>();
            if (sprite != null) {
                obj.components.Add(context.AddComponent(new WXUISpriteScript(sprite, go, obj), sprite));
            }

            UIButton button = go.GetComponent<UIButton>();
            if (button != null) {
                obj.components.Add(context.AddComponent(new WXUIButtonScript(button, go, obj), button));
            }

            UILabel label = go.GetComponent<UILabel>();
            if (label != null) {
                obj.components.Add(context.AddComponent(new WXUILabelScript(label, go, obj), label));
            }

            UIInput input = go.GetComponent<UIInput>();
            if (input != null) {
                obj.components.Add(context.AddComponent(new WXUITextInputScript(input, go, obj), input));
            }

            UIScrollView sv = go.GetComponent<UIScrollView>();
            if (sv != null) {
                obj.components.Add(context.AddComponent(new WXUIScrollViewScript(sv, go, obj), sv));
            }

            UIScrollBar sb = go.GetComponent<UIScrollBar>();
            if (sb != null) {
                obj.components.Add(context.AddComponent(new WXUIScrollBarScript(sb, go, obj), sb));
            }

            UIGrid grid = go.GetComponent<UIGrid>();
            if (grid != null) {
                obj.components.Add(context.AddComponent(new WXUIGridScript(grid, go, obj), grid));
            }

            UIToggle toggle = go.GetComponent<UIToggle>();
            if (toggle != null) {
                obj.components.Add(context.AddComponent(new WXUIToggleScript(toggle, go, obj), toggle));
            }

            UIWidget widget = go.GetComponent<UIWidget>();
            if (widget != null) {
                obj.components.Add(context.AddComponent(new WXUIWidgetScript(widget, go, obj), widget));
            }

        }

    }
}
