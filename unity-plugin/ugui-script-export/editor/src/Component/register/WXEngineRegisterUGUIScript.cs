using UnityEngine;
using UnityEditor;
using UnityEngine.UI;
using WeChat;

namespace WeChat {
    [InitializeOnLoad]
    internal class WXEngineRegisterUGUIScript {
        static WXEngineRegisterUGUIScript() {
            WXHierarchyContext.registerComponentConverter("092", IterateUGUIScriptComponent);
        }

        private static void IterateUGUIScriptComponent(GameObject go, WXEntity obj, WXHierarchyContext context, ExportPreset preset) {


            Text text = go.GetComponent<Text>();
            if (text != null) {
                obj.components.Add(context.AddComponent(new WXUIULabelScript(text, go, obj), text));
            }

            Image image = go.GetComponent<Image>();
            if (image != null)
            {
                obj.components.Add(context.AddComponent(new WXUIUSpriteScript(image, go, obj), image));
            }

            Button button = go.GetComponent<Button>();
            if (button != null)
            {
                obj.components.Add(context.AddComponent(new WXUIUButtonScript(button, go, obj), button));
            }

            Slider slider = go.GetComponent<Slider>();
            if (slider != null)
            {
                obj.components.Add(context.AddComponent(new WXUIUSliderScript(slider, go, obj), slider));
            }

            Toggle toggle = go.GetComponent<Toggle>();
            if (toggle != null)
            {
                obj.components.Add(context.AddComponent(new WXUIUToggleScript(toggle, go, obj), toggle));
            }

            ToggleGroup toggleGroup = go.GetComponent<ToggleGroup>();
            if (toggleGroup != null)
            {
                obj.components.Add(context.AddComponent(new WXUIUToggleGroupScript(toggleGroup, go, obj), toggleGroup));
            }

            ScrollRect scrollRect = go.GetComponent<ScrollRect>();
            if (scrollRect != null)
            {
                obj.components.Add(context.AddComponent(new WXUIUScrollRectScript(scrollRect, go, obj), scrollRect));
            }

            CanvasScaler canvasScaler = go.GetComponent<CanvasScaler>();
            if (canvasScaler != null)
            {
                obj.components.Add(context.AddComponent(new WXUIUCanvasScalerScript(canvasScaler, go, obj), canvasScaler));
            }

            InputField input = go.GetComponent<InputField>();
            if (input != null)
            {
                obj.components.Add(context.AddComponent(new WXUIUInputFieldScript(input, go, obj), input));
            }

        }

    }
}