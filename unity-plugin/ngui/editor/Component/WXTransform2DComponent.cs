using UnityEngine;
using System;


namespace WeChat
{
    public class WXTransform2DComponent : WXComponent
    {
        public override string getTypeName()
        {
            return "Transform2D";
        }

        float transformPositionX = 0;
        float transformPositionY = 0;
        float transformScaleX = 1;
        float transformScaleY = 1;
        float transformRotation = 0;

        public float[] size = { 0, 0 };

        public float[] anchor = { 0.5F, 0.5F };

        // 根据unity transform生成transform
        public WXTransform2DComponent(Transform transform)
        {

            transformPositionX = transform.localPosition.x;
            transformPositionY = transform.localPosition.y;

            transformScaleX = transform.localScale.x;
            transformScaleY = transform.localScale.y;

            transformRotation = -Mathf.Deg2Rad * transform.localRotation.eulerAngles.z;
            _gameObject = transform.gameObject;
        }

        private GameObject _gameObject;
        // 使用全是0的transform
        //public WXTransform2DComponent(GameObject gameObject)
        //{
        //    _gameObject = gameObject;
        //}

        public void setPosition(float x, float y)
        {
            this.transformPositionX = x;
            this.transformPositionY = y;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);

            UIPanel uiPanel = _gameObject.GetComponent(typeof(UIPanel)) as UIPanel;
            if ((UnityEngine.Object)uiPanel != (UnityEngine.Object)null)
            {
                size[0] = uiPanel.width;
                size[1] = uiPanel.height;
            }

            UIWidget uiWidget = _gameObject.GetComponent(typeof(UIWidget)) as UIWidget;
            if ((UnityEngine.Object)uiWidget != (UnityEngine.Object)null)
            {
                size[0] = uiWidget.width;
                size[1] = uiWidget.height;

                WXUIWidget.changeTransform(uiWidget, this);
            }

            UISprite uiSprite = _gameObject.GetComponent(typeof(UISprite)) as UISprite;
            if ((UnityEngine.Object)uiSprite != (UnityEngine.Object)null)
            {
                size[0] = uiSprite.width;
                size[1] = uiSprite.height;

                // finish by roamye 2019.3.25
                anchor[0] = (
                    uiSprite.pivot == UIWidget.Pivot.Left ||
                    uiSprite.pivot == UIWidget.Pivot.TopLeft ||
                    uiSprite.pivot == UIWidget.Pivot.BottomLeft
                ) ? 0.0f : ((
                    uiSprite.pivot == UIWidget.Pivot.Center ||
                    uiSprite.pivot == UIWidget.Pivot.Top ||
                    uiSprite.pivot == UIWidget.Pivot.Bottom) ? 0.5f : 1.0f);

                anchor[1] = (
                    uiSprite.pivot == UIWidget.Pivot.Bottom ||
                    uiSprite.pivot == UIWidget.Pivot.BottomLeft ||
                    uiSprite.pivot == UIWidget.Pivot.BottomRight
                ) ? 0.0f : ((
                    uiSprite.pivot == UIWidget.Pivot.Left ||
                    uiSprite.pivot == UIWidget.Pivot.Center ||
                    uiSprite.pivot == UIWidget.Pivot.Right) ? 0.5f : 1.0f);
            }
            UITexture uiTexture = _gameObject.GetComponent(typeof(UITexture)) as UITexture;
            if ((UnityEngine.Object)uiTexture != (UnityEngine.Object)null)
            {
                size[0] = uiTexture.width;
                size[1] = uiTexture.height;

                // finish by roamye 2019.3.25
                anchor[0] = (
                    uiTexture.pivot == UIWidget.Pivot.Left ||
                    uiTexture.pivot == UIWidget.Pivot.TopLeft ||
                    uiTexture.pivot == UIWidget.Pivot.BottomLeft
                ) ? 0.0f : ((
                    uiTexture.pivot == UIWidget.Pivot.Center ||
                    uiTexture.pivot == UIWidget.Pivot.Top ||
                    uiTexture.pivot == UIWidget.Pivot.Bottom) ? 0.5f : 1.0f);
                anchor[1] = (
                    uiTexture.pivot == UIWidget.Pivot.Bottom ||
                    uiTexture.pivot == UIWidget.Pivot.BottomLeft ||
                    uiTexture.pivot == UIWidget.Pivot.BottomRight
                ) ? 0.0f : ((
                    uiTexture.pivot == UIWidget.Pivot.Left ||
                    uiTexture.pivot == UIWidget.Pivot.Center ||
                    uiTexture.pivot == UIWidget.Pivot.Right) ? 0.5f : 1.0f);
            }
            UILabel uiLabel = _gameObject.GetComponent(typeof(UILabel)) as UILabel;
            if ((UnityEngine.Object)uiLabel != (UnityEngine.Object)null)
            {
                size[0] = uiLabel.width;
                size[1] = uiLabel.height;

                // TODO anchor
                // finish by roamye 2019.3.25
                anchor[0] = (
                    uiLabel.pivot == UIWidget.Pivot.Left ||
                    uiLabel.pivot == UIWidget.Pivot.TopLeft ||
                    uiLabel.pivot == UIWidget.Pivot.BottomLeft
                ) ? 0.0f : ((
                    uiLabel.pivot == UIWidget.Pivot.Center ||
                    uiLabel.pivot == UIWidget.Pivot.Top ||
                    uiLabel.pivot == UIWidget.Pivot.Bottom) ? 0.5f : 1.0f);
                anchor[1] = (
                    uiLabel.pivot == UIWidget.Pivot.Bottom ||
                    uiLabel.pivot == UIWidget.Pivot.BottomLeft ||
                    uiLabel.pivot == UIWidget.Pivot.BottomRight
                ) ? 0.0f : ((
                    uiLabel.pivot == UIWidget.Pivot.Left ||
                    uiLabel.pivot == UIWidget.Pivot.Center ||
                    uiLabel.pivot == UIWidget.Pivot.Right) ? 0.5f : 1.0f);
            }

            UITable uiTable = _gameObject.GetComponent(typeof(UITable)) as UITable;
            if (uiTable != null)
            {
                var contentPivotValue = WXUtility.TryGetContainField(uiTable, "pivot");
                if (contentPivotValue != null)
                {
                    UIWidget.Pivot tableContentPivot = (UIWidget.Pivot)contentPivotValue;
                    anchor[0] = (
                    tableContentPivot == UIWidget.Pivot.Left ||
                    tableContentPivot == UIWidget.Pivot.TopLeft ||
                    tableContentPivot == UIWidget.Pivot.BottomLeft
                    ) ? 0.0f : ((
                    tableContentPivot == UIWidget.Pivot.Center ||
                    tableContentPivot == UIWidget.Pivot.Top ||
                    tableContentPivot == UIWidget.Pivot.Bottom) ? 0.5f : 1.0f);

                    anchor[1] = (
                    tableContentPivot == UIWidget.Pivot.Bottom ||
                    tableContentPivot == UIWidget.Pivot.BottomLeft ||
                    tableContentPivot == UIWidget.Pivot.BottomRight
                    ) ? 0.0f : ((
                    tableContentPivot == UIWidget.Pivot.Left ||
                    tableContentPivot == UIWidget.Pivot.Center ||
                    tableContentPivot == UIWidget.Pivot.Right) ? 0.5f : 1.0f);
                }
            }

            UIGrid uiGrid = _gameObject.GetComponent(typeof(UIGrid)) as UIGrid;
            if (uiGrid != null)
            {
                int entityChildrenCount = _gameObject.transform.childCount;
                if ((int)uiGrid.arrangement == 0) // Horizontal
                {
                    size[0] = uiGrid.maxPerLine * uiGrid.cellWidth == 0 ? entityChildrenCount * uiGrid.cellWidth : uiGrid.maxPerLine * uiGrid.cellWidth;
                    size[1] = uiGrid.maxPerLine == 0 ? uiGrid.cellHeight : uiGrid.cellHeight * ((entityChildrenCount - entityChildrenCount % uiGrid.maxPerLine) / uiGrid.maxPerLine + entityChildrenCount % uiGrid.maxPerLine);

                }
                else if ((int)uiGrid.arrangement == 1) // Vertical
                {
                    size[0] = uiGrid.maxPerLine == 0 ? uiGrid.cellWidth : uiGrid.cellWidth * ((entityChildrenCount - entityChildrenCount % uiGrid.maxPerLine) / uiGrid.maxPerLine + entityChildrenCount % uiGrid.maxPerLine);
                    size[1] = uiGrid.maxPerLine * uiGrid.cellHeight == 0 ? entityChildrenCount * uiGrid.cellHeight : uiGrid.maxPerLine * uiGrid.cellHeight;
                }

                UIWidget.Pivot contentPivot = uiGrid.pivot;
                anchor[0] = (
                    contentPivot == UIWidget.Pivot.Left ||
                    contentPivot == UIWidget.Pivot.TopLeft ||
                    contentPivot == UIWidget.Pivot.BottomLeft
                ) ? 0.0f : ((
                    contentPivot == UIWidget.Pivot.Center ||
                    contentPivot == UIWidget.Pivot.Top ||
                    contentPivot == UIWidget.Pivot.Bottom) ? 0.5f : 1.0f);

                anchor[1] = (
                    contentPivot == UIWidget.Pivot.Bottom ||
                    contentPivot == UIWidget.Pivot.BottomLeft ||
                    contentPivot == UIWidget.Pivot.BottomRight
                ) ? 0.0f : ((
                    contentPivot == UIWidget.Pivot.Left ||
                    contentPivot == UIWidget.Pivot.Center ||
                    contentPivot == UIWidget.Pivot.Right) ? 0.5f : 1.0f);
            }

            if (_gameObject.GetComponent(typeof(UIRoot)) != null)
            {
                size[0] = 0;
                size[1] = 0;
                transformPositionX = 0;
                transformPositionY = 0;
                transformScaleX = 1;
                transformScaleY = 1;
                transformRotation = 0;
            }

            // 位置信息
            JSONObject position = new JSONObject(JSONObject.Type.ARRAY);
            position.Add(transformPositionX);
            position.Add(transformPositionY);

            // 缩放信息
            JSONObject scale = new JSONObject(JSONObject.Type.ARRAY);
            scale.Add(transformScaleX);
            scale.Add(transformScaleY);

            JSONObject sizeArray = new JSONObject(JSONObject.Type.ARRAY);
            //Debug.Log(size[0] + ":" + size[1]);
            sizeArray.Add(size[0]);
            sizeArray.Add(size[1]);

            JSONObject anchorArray = new JSONObject(JSONObject.Type.ARRAY);
            anchorArray.Add(anchor[0]); // 0.5
            anchorArray.Add(anchor[1]); // 0.5

            json.AddField("type", this.getTypeName());
            JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);
            subJSON.AddField("position", position);
            subJSON.AddField("rotation", transformRotation);
            subJSON.AddField("scale", scale);
            subJSON.AddField("size", sizeArray);
            subJSON.AddField("anchor", anchorArray);
            json.AddField("data", subJSON);

            return json;
        }
    }
}