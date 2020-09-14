using UnityEngine;
using UnityEditor;
using UnityEngine.UI;

namespace WeChat
{
    [InitializeOnLoad]
    internal class WXEngineRegisterUgui
    {
        static WXEngineRegisterUgui()
        {
            WXHierarchyContext.registerComponentConverter("011", IterateUguiComponent);
        }


        private static void IterateUguiComponent(
            GameObject gameObject,
            WXEntity entity,
            WXHierarchyContext context,
            ExportPreset preset
        )
        {
            if (!preset.presetKey.Contains("ugui"))
            {
                return;
            }

            //Canvas uiCanvas = gameObject.GetComponent(typeof(Canvas)) as Canvas;
            //if (uiCanvas != null)
            //{
            //    entity.components.Add(context.AddComponent(new WXUIUCanvas(uiCanvas, gameObject, entity), uiCanvas));
            //}

            Image uiSprite = gameObject.GetComponent(typeof(Image)) as Image;
            if (uiSprite != null)
            {
                entity.components.Add(context.AddComponent(new WXUIUSprite(uiSprite, gameObject, entity), uiSprite));
            }

            Text uiLabel = gameObject.GetComponent(typeof(Text)) as Text;
            if (uiLabel != null)
            {
                entity.components.Add(context.AddComponent(new WXUIULabel(uiLabel, gameObject, entity), uiLabel));
            }

            Button button = gameObject.GetComponent(typeof(Button)) as Button;
            if (button != null)
            {
                entity.components.Add(context.AddComponent(new WXUIUButton(button, gameObject, entity), button));
            }

            Toggle toggle = gameObject.GetComponent(typeof(Toggle)) as Toggle;
            if (toggle != null)
            {
                entity.components.Add(context.AddComponent(new WXUIUToggle(toggle, gameObject, entity), toggle));
            }

            ToggleGroup toggleGroup = gameObject.GetComponent(typeof(ToggleGroup)) as ToggleGroup;
            if (toggleGroup != null)
            {
                entity.components.Add(context.AddComponent(new WXUIUToggleGroup(toggleGroup, gameObject, entity), toggleGroup));
            }

            ScrollRect scrollRect = gameObject.GetComponent(typeof(ScrollRect)) as ScrollRect;
            if (scrollRect != null)
            {
                entity.components.Add(context.AddComponent(new WXUIUScrollRect(scrollRect, gameObject, entity), scrollRect));
            }

            Mask mask = gameObject.GetComponent(typeof(Mask)) as Mask;
            if (mask != null)
            {
                entity.components.Add(context.AddComponent(new WXUIUMask(mask, gameObject, entity), mask));
            }

            InputField input = gameObject.GetComponent(typeof(InputField)) as InputField;
            if (input != null)
            {
                entity.components.Add(context.AddComponent(new WXUIUInputField(input, gameObject, entity), input));
            }


            WXUGUITransform2DComponent transform2D = new WXUGUITransform2DComponent(gameObject.transform);
            


            entity.components.Add(context.AddComponent(transform2D, gameObject.transform));

        }
    }
}
