using System;
using UnityEditor;
using UnityEngine;
using UnityEngine.Rendering;

namespace WeChat
{

  public class WXSkinnedMeshRenderer : WXComponent
  {
    private SkinnedMeshRenderer renderer;

    public override string getTypeName()
    {
      return "MeshRenderer";
    }

    public WXSkinnedMeshRenderer(SkinnedMeshRenderer renderer)
    {
      this.renderer = renderer;
    }

    private JSONObject GenProps()
    {
      JSONObject props = new JSONObject(JSONObject.Type.OBJECT);
      //props.AddField("rootBone", ((bool)renderer.rootBone) ? renderer.rootBone.name : "");
      //Bounds localBounds = renderer.localBounds;
      //Vector3 center = localBounds.center;
      //Vector3 vector = new Vector3(0f - center.x, center.y, center.z);
      //Vector3 extents = localBounds.extents;
      //Vector3 vector2 = vector - extents;
      //Vector3 vector3 = vector + extents;
      //float val = Vector3.Distance(vector2, vector3) / 2f;
      //JSONObject jSONObject = new JSONObject(JSONObject.Type.OBJECT);
      //props.AddField("boundBox", jSONObject);
      //JSONObject jSONObject2 = new JSONObject(JSONObject.Type.ARRAY);
      //jSONObject2.Add(vector2.x);
      //jSONObject2.Add(vector2.y);
      //jSONObject2.Add(vector2.z);
      //jSONObject.AddField("min", jSONObject2);
      //JSONObject jSONObject3 = new JSONObject(JSONObject.Type.ARRAY);
      //jSONObject3.Add(vector3.x);
      //jSONObject3.Add(vector3.y);
      //jSONObject3.Add(vector3.z);
      //jSONObject.AddField("max", jSONObject3);
      //JSONObject jSONObject4 = new JSONObject(JSONObject.Type.OBJECT);
      //props.AddField("boundSphere", jSONObject4);
      //JSONObject jSONObject5 = new JSONObject(JSONObject.Type.ARRAY);
      //jSONObject5.Add(vector.x);
      //jSONObject5.Add(vector.y);
      //jSONObject5.Add(vector.z);
      //jSONObject4.AddField("center", jSONObject5);
      //jSONObject4.AddField("radius", val);
      return props;
    }

    protected override JSONObject ToJSON(WXHierarchyContext context)
    {
      JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
      JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
      json.AddField("type", "SkinnedMeshRenderer");
      json.AddField("data", data);

      // Mesh mesh = (renderer.gameObject.GetComponent (typeof(MeshFilter)) as MeshFilter).sharedMesh;
      // SkinnedMeshRenderer component = renderer.gameObject.GetComponent<SkinnedMeshRenderer>();
      Mesh mesh = renderer.sharedMesh;
      if (mesh != null)
      {
        WXSkinnedMesh meshConverter = new WXSkinnedMesh(mesh, renderer);
        string meshPath = meshConverter.Export(context.preset);
        data.AddField("mesh", meshPath);
        context.AddResource(meshPath);
      }
      else
      {
        Debug.LogWarning("mesh is null");
      }
      JSONObject materialArray = new JSONObject(JSONObject.Type.ARRAY);
      Material[] materials = renderer.sharedMaterials;
      foreach (Material material in materials)
      {
        WXMaterial materialConverter = new WXMaterial(material, renderer);
        string materialPath = materialConverter.Export(context.preset);
        materialArray.Add(materialPath);
        context.AddResource(materialPath);
      }
      data.AddField("materials", materialArray);
      data.AddField("props", GenProps());

      int lightmapIndex = renderer.lightmapIndex;
        JSONObject litmapScaleArr = new JSONObject(JSONObject.Type.ARRAY);
        data.AddField("lightMapScaleOffset", litmapScaleArr);
        litmapScaleArr.Add(renderer.lightmapScaleOffset.x);
        litmapScaleArr.Add(renderer.lightmapScaleOffset.y);
        litmapScaleArr.Add(renderer.lightmapScaleOffset.z);
        litmapScaleArr.Add(renderer.lightmapScaleOffset.w);
        data.AddField("lightMapIndex", lightmapIndex);

        ShadowCastingMode mode = renderer.shadowCastingMode;
        if (mode == ShadowCastingMode.Off)
        {
            data.AddField("castShadow", false);
        }
        else
        {
            data.AddField("castShadow", true);
        }

        bool receiveShadow = renderer.receiveShadows;
        data.AddField("receiveShadow", receiveShadow);

        return json;
    }
  }
}


// WXBeefBallComponentExporter.TypeStruct data = new WXBeefBallComponentExporter.TypeStruct();
// data.componentType = typeof(Transform);
// data.exporterType = typeof(WXBBTransform3DComponent);
// WXBeefBallComponentExporter.typeMap.Add()