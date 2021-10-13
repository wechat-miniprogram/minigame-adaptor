using System;
using UnityEditor;
using UnityEngine;
using UnityEngine.Rendering;

namespace WeChat
{

    public class WXLODGroup : WXComponent
    {
        private readonly LODGroup lodGroup;

        public override string getTypeName()
        {
            return "LODGroup";
        }

        public WXLODGroup(LODGroup lodGroup)
        {
            this.lodGroup = lodGroup;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject lodList = new JSONObject(JSONObject.Type.ARRAY);
            json.AddField("type", getTypeName());
            json.AddField("data", data);

            data.AddField("active", lodGroup.enabled);
            data.AddField("lodCount", lodGroup.lodCount);
            float radius = 0f;
            JSONObject center = new JSONObject(JSONObject.Type.OBJECT);
            center.AddField("x", 0);
            center.AddField("y", 0);
            center.AddField("z", 0);


            LOD[] lods = lodGroup.GetLODs();
            int lodIndex = 0;
            int radiusCountIndex = 0;
            string matchedRenderer = "";
            foreach(LOD lod in lods)
            {
                JSONObject lodObject = new JSONObject(JSONObject.Type.OBJECT);
                JSONObject rendererList = new JSONObject(JSONObject.Type.ARRAY);
                lodObject.AddField("screenRelativeTransitionHeight", lod.screenRelativeTransitionHeight);
                lodObject.AddField("fadeTransitionWidth", lod.fadeTransitionWidth);
                Renderer[] renderers = lod.renderers;
                int renderersCount = renderers.Length;
                int rendererIndex = 0;
                foreach(Renderer renderer in renderers)
                {
                    string targetRenderer = HandleRenderer(rendererList, renderer, context);
                    /* 计算LODGroup包围球面积的逻辑：
                     * 1. 如果当前的半径是0，说明一直未得到合法的Mesh半径信息，（比如当前LOD里就没有添加Renderer），说明需要进行一次计算
                     * 2. 如果当前半径不是0，需要分两种情况讨论
                     *  2.1. 如果当前的rendererIndex为0，说明是新的一轮LOD遍历，说明此前已经计算出了radius了，已经不用再进行计算了
                     *  2.2. 如果当前的rendererIndex不为0，且半径也有值，需要判断一下这个值是否是当前轮次计算出来的，如果是的话，也需要继续计算取最大值；如果是上一轮次计算出来的，那么就不需要继续计算了。
                    */
                    if (
                        radius == 0f ||
                        (rendererIndex != 0 && (radiusCountIndex == lodIndex))
                    )
                    {
                        JSONObject tempBoundingBall = HandleRendererCapsuleBoundingBall(renderer);
                        float tempRadius = tempBoundingBall.GetField("radius").n;
                        if (tempRadius > radius) {
                            radius = tempRadius;
                            center = tempBoundingBall.GetField("center");
                            matchedRenderer = targetRenderer;
                        }
                        radiusCountIndex = lodIndex;
                    }
                    rendererIndex++;
                }
                lodObject.AddField("renderers", rendererList);
                lodList.Add(lodObject);
                lodIndex++;
            }

            data.AddField("lodList", lodList);
            data.AddField("radius", radius);
            data.AddField("center", center);
            data.AddField("renderer", matchedRenderer);
            return json;
        }

        // 一个LOD里的renderer可能有多种renderer: meshRenderer\lineRenderer等
        private string HandleRenderer(JSONObject rendererList, Renderer renderer, WXHierarchyContext context)
        {
            GameObject go = renderer.gameObject;
            MeshRenderer meshRenderer = go.GetComponent(typeof(MeshRenderer)) as MeshRenderer;
            string targetRenderer = "";
            if ((UnityEngine.Object)meshRenderer != (UnityEngine.Object)null) {
                targetRenderer = context.AddComponentInProperty(
                    new WXMeshRenderer(meshRenderer),
                    meshRenderer
                );
                rendererList.Add(targetRenderer);
            }
            LineRenderer lineRenderer = go.GetComponent(typeof(LineRenderer)) as LineRenderer;
            if ((UnityEngine.Object)lineRenderer != (UnityEngine.Object)null)
            {
                targetRenderer = context.AddComponentInProperty(
                    new WXLineRenderer(lineRenderer),
                    lineRenderer
                );
                rendererList.Add(targetRenderer);
            }
            TrailRenderer trailRenderer = go.GetComponent(typeof(TrailRenderer)) as TrailRenderer;
            if ((UnityEngine.Object)trailRenderer != (UnityEngine.Object)null)
            {
                targetRenderer = context.AddComponentInProperty(
                    new WXTrailRenderer(trailRenderer),
                    trailRenderer
                );
                rendererList.Add(targetRenderer);
            }
            SkinnedMeshRenderer skinnedMeshRenderer = go.GetComponent(typeof(SkinnedMeshRenderer)) as SkinnedMeshRenderer;
            if ((UnityEngine.Object)skinnedMeshRenderer != (UnityEngine.Object)null)
            {
                targetRenderer = context.AddComponentInProperty(
                    new WXSkinnedMeshRenderer(skinnedMeshRenderer),
                    skinnedMeshRenderer
                );
                rendererList.Add(targetRenderer);
            }
            return targetRenderer;
        }

        // 处理Mesh包围球信息
        private JSONObject HandleMeshBoundingBall(Mesh mesh)
        {
            Vector3 vertexPositionMax = WXMesh.GetVertexPositionMax(mesh);
            float radius = WXMesh.CalCapsuleRadius(vertexPositionMax, mesh.vertices);
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject center = new JSONObject(JSONObject.Type.OBJECT);
            center.AddField("x", vertexPositionMax.x);
            center.AddField("y", vertexPositionMax.y);
            center.AddField("z", vertexPositionMax.z);
            res.AddField("radius", radius);
            res.AddField("center", center);
            return res;
        }

        private JSONObject HandleRendererCapsuleBoundingBall(Renderer renderer)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            res.AddField("radius", 0);
            MeshFilter meshFilter = renderer.gameObject.GetComponent<MeshFilter>();
            if (meshFilter != null && meshFilter.sharedMesh != null)
            {
                Mesh mesh = meshFilter.sharedMesh;
                res = HandleMeshBoundingBall(mesh);
            }
            return res;
        }
    }


}
