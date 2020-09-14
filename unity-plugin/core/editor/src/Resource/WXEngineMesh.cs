using System;
using UnityEditor;
using UnityEngine;
using System.Collections.Generic;
using System.Linq;
using UnityEditor.Animations;
using System.IO;
using System.Text;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleToAttribute("ScriptExport")]
namespace WeChat
{
    class WXMeshVertexLayout
    {

        public bool POSITION = false;
        public bool NORMAL = false;
        public bool COLOR = false;
        public bool UV = false;
        public bool UV1 = false;
        public bool TANGENT = false;
        public bool BONE = false;

        public int layoutSize = 0;

        public WXMeshVertexLayout(Mesh mesh)
        {
            if (mesh.vertices != null && mesh.vertices.Length != 0)
            {
                POSITION = true;
                layoutSize += 12;
            }
            if (mesh.normals != null && mesh.normals.Length != 0)
            {
                NORMAL = true;
                layoutSize += 12;
            }
            if (mesh.colors != null && mesh.colors.Length != 0)
            {
                COLOR = true;
                layoutSize += 16;
            }
            if (mesh.uv != null && mesh.uv.Length != 0)
            {
                UV = true;
                layoutSize += 8;
            }
            if (mesh.uv2 != null && mesh.uv2.Length != 0)
            {
                UV1 = true;
                layoutSize += 8;
            }
            if (mesh.boneWeights != null && mesh.boneWeights.Length != 0)
            {
                BONE = true;
                layoutSize += 32;
            }
            if (mesh.tangents != null && mesh.tangents.Length != 0)
            {
                TANGENT = true;
                layoutSize += 16;
            }
        }

        public string GetLayoutString()
        {
            List<string> layout = new List<string>();

            if (POSITION)
            {
                layout.Add("POSITION");
            }
            if (NORMAL)
            {
                layout.Add("NORMAL");
            }
            if (COLOR)
            {
                layout.Add("COLOR");
            }
            if (UV)
            {
                layout.Add("UV");
            }
            if (UV1)
            {
                layout.Add("UV1");
            }
            if (BONE)
            {
                layout.Add("BLENDWEIGHT,BLENDINDICES");
            }
            if (TANGENT)
            {
                layout.Add("TANGENT");
            }

            return String.Join(",", layout.ToArray());
        }
    }

    class WXMesh : WXResource
    {
        private Mesh mesh;
        string unityAssetPath;
        public WXMesh(Mesh _mesh)
        {
            this.mesh = _mesh;
            unityAssetPath = AssetDatabase.GetAssetPath(mesh.GetInstanceID());
        }

        protected override string GetResourceType()
        {
            return "mesh";
        }

        public static float CalCapsuleRadius(Vector3 centerVertex, Vector3[] vertices)
        {
            float MaxRadius = 0f;
            for (int j = 0; j < vertices.Length; j++)
            {
                float radius = Vector3.Distance(vertices[j], centerVertex);
                if (radius > MaxRadius)
                {
                    MaxRadius = radius;
                }
            }
            return MaxRadius;
        }

        protected string GetExportPathRaw()
        {

            string assetPath = unityAssetPath;
            int index = assetPath.LastIndexOf('.');
            if (index > 0)
            {
                assetPath = assetPath.Substring(0, index);
            }
            return assetPath + "-" + mesh.name;
        }
        public override string GetExportPath()
        {
            return GetExportPathRaw() + ".mesh";
        }

        public override string GetHash()
        {
            return WXUtility.GetMD5FromAssetPath(unityAssetPath) + WXUtility.GetMD5FromString(mesh.name);
        }

        protected override JSONObject ExportResource(ExportPreset preset)
        {
            JSONObject meta = JSONObject.Create("{\"file\": {}}");
            JSONObject metadata = new JSONObject();
            meta.AddField("data", metadata);

            byte[] content = WriteMeshFile(ref metadata);

            meta.GetField("file").AddField(
                "src",
                AddFile(new WXEngineMeshFile(unityAssetPath, mesh.name, content))
            );

            meta.AddField("version", 2);
            return meta;
        }

        class WXEngineMeshFile : WXEngineBinaryFile
        {
            private byte[] content;
            private string meshName;

            public WXEngineMeshFile(string unityAssetPath, string meshName, byte[] content) : base(unityAssetPath)
            {
                this.content = content;
                this.meshName = wxFileUtil.cleanIllegalChar(meshName, true);
            }

            protected string GetExportPathRaw()
            {

                string assetPath = unityAssetPath;
                int index = assetPath.LastIndexOf('.');
                if (index > 0)
                {
                    assetPath = assetPath.Substring(0, index);
                }
                return assetPath + "-" + meshName;
            }

            public override string GetExportPath()
            {
                return GetExportPathRaw() + ".mesh.bin";
            }

            protected override byte[] GetContent()
            {
                return content;
            }
        }

        private byte[] WriteMeshFile(ref JSONObject metadata)
        {
            MemoryStream fileStream = new MemoryStream();

            string meshName = mesh.name;
            WXMeshVertexLayout vertexLayout = new WXMeshVertexLayout(mesh);
            ushort subMeshCount = (ushort)mesh.subMeshCount;

            long vertexStart = 0L;
            long vertexLength = 0L;
            long indiceStart = 0L;
            long indiceLength = 0L;

            vertexStart = fileStream.Position;
            Vector3 vertexPositionMax = new Vector3(0, 0, 0);
            for (int j = 0; j < mesh.vertexCount; j++)
            {
                Vector3 vector = mesh.vertices[j];
                wxFileUtil.WriteData(fileStream, vector.x * -1f, vector.y, vector.z);
                vertexPositionMax.Set(vertexPositionMax.x + vector.x * -1f, vertexPositionMax.y + vector.y, vertexPositionMax.z + vector.z);

                if (vertexLayout.NORMAL)
                {
                    Vector3 vector2 = mesh.normals[j];
                    wxFileUtil.WriteData(fileStream, vector2.x * -1f, vector2.y, vector2.z);
                }
                if (vertexLayout.COLOR)
                {
                    Color color = mesh.colors[j];
                    wxFileUtil.WriteData(fileStream, color.r, color.g, color.b, color.a);
                }
                if (vertexLayout.UV)
                {
                    Vector2 vector3 = mesh.uv[j];
                    wxFileUtil.WriteData(fileStream, vector3.x, vector3.y * -1f + 1f);
                }
                if (vertexLayout.UV1)
                {
                    Vector2 vector4 = mesh.uv2[j];
                    wxFileUtil.WriteData(fileStream, vector4.x, vector4.y * -1f + 1f);
                }
                if (vertexLayout.TANGENT)
                {
                    Vector4 vector5 = mesh.tangents[j];
                    wxFileUtil.WriteData(fileStream, vector5.x * -1f, vector5.y, vector5.z, vector5.w);
                }
            }
            vertexLength = fileStream.Position - vertexStart;

            indiceStart = fileStream.Position;
            int[] triangles = mesh.triangles;
            for (int j = 0; j < triangles.Length; j++)
            {
                wxFileUtil.WriteData(fileStream, (ushort)triangles[j]);
            }
            indiceLength = fileStream.Position - indiceStart;
            fileStream.Close();

            vertexPositionMax.Set(vertexPositionMax.x / mesh.vertices.Length, vertexPositionMax.y / mesh.vertices.Length, vertexPositionMax.z / mesh.vertices.Length);
            float capsuleRadius = CalCapsuleRadius(vertexPositionMax, mesh.vertices);

            JSONObject capsule = new JSONObject(JSONObject.Type.OBJECT);
            capsule.AddField("x", vertexPositionMax.x);
            capsule.AddField("y", vertexPositionMax.y);
            capsule.AddField("z", vertexPositionMax.z);
            capsule.AddField("radius", capsuleRadius);

            metadata.AddField("indiceFormat", 1); //   BIT16 = 1,BIT32 = 2
            metadata.AddField("vertexLayout", vertexLayout.GetLayoutString()); //"POSITION,NORMAL,COLOR,UV,BLENDWEIGHT,BLENDINDICES,TANGENT",
            metadata.AddField("vertexStart", 0);
            metadata.AddField("vertexLength", vertexLength);
            metadata.AddField("indiceStart", vertexLength); // indice的偏移量
            metadata.AddField("indiceLength", indiceLength); // indice的长度
            metadata.AddField("capsule", capsule);
            metadata.AddField("version", 1);


            JSONObject subMeshs = new JSONObject(JSONObject.Type.ARRAY);

#if !UNITY_2017_1_OR_NEWER
            int indexStart = 0;
#endif
            for (int i = 0; i < subMeshCount; i++)
            {
                JSONObject subMeshObj = new JSONObject(JSONObject.Type.OBJECT);
#if UNITY_2017_1_OR_NEWER
                subMeshObj.AddField("start", mesh.GetIndexStart(i));
                subMeshObj.AddField("length", mesh.GetIndexCount(i));
#else
                subMeshObj.AddField("start", indexStart);
                subMeshObj.AddField("length", mesh.GetIndices(i).Length);
                indexStart += mesh.GetIndices(i).Length;
#endif
                subMeshs.Add(subMeshObj);
            }
            metadata.AddField("subMeshs", subMeshs);

            JSONObject boundBox = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject boundBoxCenter = new JSONObject(JSONObject.Type.ARRAY);
            boundBoxCenter.Add(mesh.bounds.center.x);
            boundBoxCenter.Add(mesh.bounds.center.y);
            boundBoxCenter.Add(mesh.bounds.center.z);
            JSONObject boundBoxSize = new JSONObject(JSONObject.Type.ARRAY);
            boundBoxSize.Add(mesh.bounds.size.x);
            boundBoxSize.Add(mesh.bounds.size.y);
            boundBoxSize.Add(mesh.bounds.size.z);
            boundBox.AddField("center", boundBoxCenter);
            boundBox.AddField("size", boundBoxSize);
            metadata.AddField("boundBox", boundBox);

            return fileStream.ToArray();
        }
    }
}
