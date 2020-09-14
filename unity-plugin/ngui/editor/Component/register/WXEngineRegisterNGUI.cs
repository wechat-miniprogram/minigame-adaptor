using UnityEngine;
using UnityEditor;

namespace WeChat
{
    [InitializeOnLoad]
    internal class WXEngineRegisterNgui
    {
        static WXEngineRegisterNgui()
        {
            WXHierarchyContext.registerComponentConverter("010", IterateNguiComponent);
        }


        private static void IterateNguiComponent(
            GameObject gameObject,
            WXEntity entity,
            WXHierarchyContext context,
            ExportPreset preset
        )
        {
            if (!preset.presetKey.Contains("ngui"))
            {
                return;
            }

            bool isUIRoot = false;
            UIRoot uiRoot = gameObject.GetComponent(typeof(UIRoot)) as UIRoot;
            if (uiRoot != null)
            {
                isUIRoot = true;
            }

            UISprite uiSprite = gameObject.GetComponent(typeof(UISprite)) as UISprite;
            if (uiSprite != null)
            {
                entity.components.Add(context.AddComponent(new WXUISprite(uiSprite, gameObject, entity), uiSprite));
            }

            UILabel uiLabel = gameObject.GetComponent(typeof(UILabel)) as UILabel;
            if (uiLabel != null)
            {
                entity.components.Add(context.AddComponent(new WXUILabel(uiLabel, gameObject, entity), uiLabel));
            }

            UIInput uiInput = gameObject.GetComponent(typeof(UIInput)) as UIInput;
            if (uiInput != null)
            {
                entity.components.Add(context.AddComponent(new WXUITextInput(uiInput, gameObject, entity), uiInput));
            }

            UITexture uiTexture = gameObject.GetComponent(typeof(UITexture)) as UITexture;
            if (uiTexture != null)
            {
                entity.components.Add(context.AddComponent(new WXUITexture(uiTexture, gameObject, entity), uiTexture));
            }

            WXTransform2DComponent transform2D = new WXTransform2DComponent(gameObject.transform);
            //if (isUIRoot)
            //{
            //    transform2D = new WXTransform2DComponent(go);
            //}
            //else
            //{
            //    // 如果不是UIRoot，那么该Transform有可能在遍历之前的节点的时候，被用target指向，并且已经转换过。
            //    // 所以这里要把之前的取出来
            //    transform2D = (WXTransform2DComponent)context.GetConvertedComponent(typeof(WXTransform2DComponent), go.transform);
            //    if (transform2D == null)
            //    {
            //        // 如果没有，才去创建新的transform2D
            //        transform2D = new WXTransform2DComponent(go.transform, go);
            //    }
            //}

            UIWidget uiWidget = gameObject.GetComponent(typeof(UIWidget)) as UIWidget;
            if (uiWidget != null)
            {
                if (uiWidget.isAnchored)
                {
                    entity.components.Add(context.AddComponent(new WXUIWidget(uiWidget, gameObject, entity), uiWidget));
                }
            }

            UIGrid uiGrid = gameObject.GetComponent(typeof(UIGrid)) as UIGrid;
            if (uiGrid != null)
            {
                entity.components.Add(context.AddComponent(new WXUIGrid(uiGrid, gameObject, entity), uiGrid));
            }

            UIAnchor uiAnchor = gameObject.GetComponent(typeof(UIAnchor)) as UIAnchor;
            if (uiAnchor != null)
            {
                entity.components.Add(context.AddComponent(new WXUIAnchor(uiAnchor, gameObject, entity), uiAnchor));
            }

            UITable uiTable = gameObject.GetComponent(typeof(UITable)) as UITable;
            if (uiTable != null)
            {
                entity.components.Add(context.AddComponent(new WXUITable(uiTable, gameObject, entity), uiTable));
            }

            UIScrollView uiScrollView = gameObject.GetComponent(typeof(UIScrollView)) as UIScrollView;
            if (uiScrollView != null)
            {
                /* delete 19/8.5 roamye 更新使用逻辑，将center，offset等属性作为动态创建的mask元素的坐标位移量 */
                entity.components.Add(context.AddComponent(new WXUIScrollView(uiScrollView, gameObject, entity), uiScrollView));

            }

            entity.components.Add(context.AddComponent(transform2D, gameObject.transform));


            UIButton uiButton = gameObject.GetComponent(typeof(UIButton)) as UIButton;
            if (uiButton != null)
            {
                if (uiSprite == null)
                {
                    // obj.components.Add(context.AddComponent(new WXUISprite(null), null));
                }
                entity.components.Add(context.AddComponent(new WXUIButton(uiButton, gameObject, entity), uiButton));
                // TODO pivot
            }

            BoxCollider boxCollider = gameObject.GetComponent(typeof(BoxCollider)) as BoxCollider;
            if (boxCollider != null)
            {
                entity.components.Add(context.AddComponent(new WXTouchInputComponent(boxCollider, gameObject, entity), boxCollider));
            }

            UIToggle uiToggle = gameObject.GetComponent(typeof(UIToggle)) as UIToggle;
            if (uiToggle != null)
            {
                entity.components.Add(context.AddComponent(new WXUIToggle(uiToggle, gameObject, entity), uiToggle));
            }

            UIAtlas uiAtlas = gameObject.GetComponent(typeof(UIAtlas)) as UIAtlas;
            if (uiAtlas != null)
            {
                entity.components.Add(context.AddComponent(new WXUIAtlas(uiAtlas, gameObject, entity), uiAtlas));
            }

        }
    }
}
