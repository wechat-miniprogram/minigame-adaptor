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

    class WXSkinnedMesh : WXResource
    {
        private Mesh mesh;
        private SkinnedMeshRenderer renderer;
        string meshName;

        public WXSkinnedMesh(Mesh _mesh, SkinnedMeshRenderer renderer) : base(AssetDatabase.GetAssetPath(_mesh.GetInstanceID()))
        {
            mesh = _mesh;
            this.meshName = wxFileUtil.cleanIllegalChar(_mesh.name, true);
            this.renderer = renderer;
            if (unityAssetPath == null || unityAssetPath == "")
            {
                ErrorUtil.ExportErrorReporter.create()
                .setResource(this)
                .setGameObject(renderer.gameObject)
                .error(ErrorUtil.ErrorCode.SkinnedMesh_PathError, "SkinnedMesh文件的unity路径为空");
            }
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

        private string GetExportPathRaw()
        {

            string assetPath = wxFileUtil.cleanIllegalChar(unityAssetPath, false);
            int index = assetPath.LastIndexOf('.');
            if (index > 0)
            {
                assetPath = assetPath.Substring(0, index);
            }
            return assetPath + "-" + meshName;
        }

        public override string GetExportPath()
        {
            return GetExportPathRaw() + ".mesh";
        }

        public override string GetHash()
        {
            return WXUtility.GetMD5FromAssetPath(unityAssetPath) + WXUtility.GetMD5FromString(meshName);
        }

        protected override JSONObject ExportResource(ExportPreset preset)
        {
            JSONObject meta = JSONObject.Create("{\"file\": {}}");
            JSONObject metadata = new JSONObject();
            meta.AddField("data", metadata);

            byte[] content = WriteMeshFile(ref metadata);

            meta.GetField("file").AddField(
                "src",
                AddFile(new WXEngineMeshFile(unityAssetPath, meshName, content))
            );

            // 在importsetting里关联fbx文件
            if (Path.GetExtension(unityAssetPath).ToLower() == ".fbx")
            {
                importSetting = new JSONObject();
                WXRawResource fbx = new WXRawResource(unityAssetPath);
                string fbxExportedPath = fbx.Export(preset);
                importSetting.AddField("associateFbx", fbxExportedPath);
                AddDependencies(fbxExportedPath);
            }

            return meta;
        }

        class WXEngineMeshFile : WXEngineBinaryFile
        {
            private byte[] content;
            private string meshName;

            public WXEngineMeshFile(string assetPath, string meshName, byte[] content) : base(assetPath)
            {
                this.content = content;
                this.meshName = wxFileUtil.cleanIllegalChar(meshName, true);
            }

            protected string GetExportPathRaw()
            {

                string assetPath = wxFileUtil.cleanIllegalChar(unityAssetPath, false);
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



        private static int MaxBoneCount = 24;

        public struct VertexData
        {
            public int index;

            public Vector3 vertice;

            public Vector3 normal;

            public Color color;

            public Vector2 uv;

            public Vector2 uv2;

            public Vector4 boneWeight;

            public Vector4 boneIndex;

            public Vector4 tangent;
        }

        public static VertexData getVertexData(Mesh mesh, int index, WXMeshVertexLayout vertexLayout)
        {
            VertexData result = default(VertexData);
            result.index = index;
            result.vertice = mesh.vertices[index];
            if (vertexLayout.NORMAL)
            {
                result.normal = mesh.normals[index];
            }
            else
            {
                result.normal = default(Vector3);
            }
            if (vertexLayout.COLOR)
            {
                result.color = mesh.colors[index];
            }
            else
            {
                result.color = default(Color);
            }
            if (vertexLayout.UV)
            {
                result.uv = mesh.uv[index];
            }
            else
            {
                result.uv = default(Vector2);
            }
            if (vertexLayout.UV1)
            {
                result.uv2 = mesh.uv2[index];
            }
            else
            {
                result.uv2 = default(Vector2);
            }
            if (vertexLayout.BONE)
            {
                BoneWeight boneWeight = mesh.boneWeights[index];
                result.boneWeight.x = boneWeight.weight0;
                result.boneWeight.y = boneWeight.weight1;
                result.boneWeight.z = boneWeight.weight2;
                result.boneWeight.w = boneWeight.weight3;
                result.boneIndex.x = (float)boneWeight.boneIndex0;
                result.boneIndex.y = (float)boneWeight.boneIndex1;
                result.boneIndex.z = (float)boneWeight.boneIndex2;
                result.boneIndex.w = (float)boneWeight.boneIndex3;
            }
            else
            {
                result.boneWeight = default(Vector4);
                result.boneIndex = default(Vector4);
            }
            if (vertexLayout.TANGENT)
            {
                result.tangent = mesh.tangents[index];
            }
            else
            {
                result.tangent = default(Vector4);
            }
            return result;
        }


        private byte[] WriteMeshFile(ref JSONObject metadata)
        {
            MemoryStream fileStream = new MemoryStream();

            //ushort subMeshCount = (ushort)mesh.subMeshCount;
            string item = meshName;

            // 分析vertexLayout
            WXMeshVertexLayout vertexLayout = new WXMeshVertexLayout(mesh, true);

            List<Transform> bones = new List<Transform>();
            for (int j = 0; j < renderer.bones.Length; j++)
            {
                Transform item2 = renderer.bones[j];
                if (bones.IndexOf(item2) == -1)
                {
                    bones.Add(item2);
                }
            }

            //List<VertexData> vertexDatas = new List<VertexData>();
            //List<VertexData> boneGroupVertex = new List<VertexData>();
            //List<VertexData> vertexDataQueue = new List<VertexData>();
            //int[] positionInBoneGroup = new int[3];
            //List<int> indiceList = new List<int>();
            //List<int> allBoneIndexes = new List<int>();
            //List<int> vertexUsingBone = new List<int>();
            //VertexData vertexData;
            //for (int i = 0; i < subMeshCount; i++)
            //{
            //    int[] indices = mesh.GetIndices(i);
            //    for (int indiceIter = 0; indiceIter < indices.Length; indiceIter += 3)
            //    {
            //        // indice start
            //        for (int k = 0; k < 3; k++)
            //        {
            //            int indiceIndex = indiceIter + k;
            //            int vertexIndex = indices[indiceIndex];
            //            positionInBoneGroup[k] = -1;
            //            int ii = 0;
            //            while (ii < boneGroupVertex.Count)
            //            {
            //                if (boneGroupVertex[ii].index == vertexIndex)
            //                {
            //                    positionInBoneGroup[k] = ii;
            //                    break;
            //                }
            //                ii++;
            //                continue;
            //            }
            //            if (positionInBoneGroup[k] == -1)
            //            {
            //                vertexData = getVertexData(mesh, vertexIndex, vertexLayout);
            //                vertexDataQueue.Add(vertexData);
            //                // 每个点最多关联4根骨骼，所以遍历4下
            //                for (ii = 0; ii < 4; ii++)
            //                {
            //                    float bone = vertexData.boneIndex[ii];
            //                    if (allBoneIndexes.IndexOf((int)bone) == -1 && vertexUsingBone.IndexOf((int)bone) == -1)
            //                    {
            //                        vertexUsingBone.Add((int)bone);
            //                    }
            //                }
            //            }
            //        }
            //        // 没到达最大骨骼数 目前不知道这个24最大骨骼限制是干嘛用的
            //        if (allBoneIndexes.Count + vertexUsingBone.Count <= MaxBoneCount)
            //        {
            //            for (int l = 0; l < vertexUsingBone.Count; l++)
            //            {
            //                allBoneIndexes.Add(vertexUsingBone[l]);
            //            }
            //            int num8 = 1;
            //            for (int l = 0; l < 3; l++)
            //            {
            //                if (positionInBoneGroup[l] == -1)
            //                {
            //                    indiceList.Add(vertexDatas.Count + boneGroupVertex.Count - 1 + num8++);
            //                }
            //                else
            //                {
            //                    indiceList.Add(vertexDatas.Count + positionInBoneGroup[l]);
            //                }
            //            }
            //            for (int l = 0; l < vertexDataQueue.Count; l++)
            //            {
            //                boneGroupVertex.Add(vertexDataQueue[l]);
            //            }
            //        }
            //        else
            //        {
            //            for (int l = 0; l < boneGroupVertex.Count; l++)
            //            {
            //                vertexDatas.Add(boneGroupVertex[l]);
            //            }
            //            // 回退一位？
            //            indiceIter -= 3;
            //            boneGroupVertex = new List<VertexData>();
            //            allBoneIndexes = new List<int>();
            //        }

            //        // 最后一个face了
            //        if (indiceIter + 3 == indices.Length)
            //        {
            //            for (int l = 0; l < boneGroupVertex.Count; l++)
            //            {
            //                vertexDatas.Add(boneGroupVertex[l]);
            //            }
            //            boneGroupVertex = new List<VertexData>();
            //            allBoneIndexes = new List<int>();
            //        }
            //        vertexUsingBone = new List<int>();
            //        vertexDataQueue = new List<VertexData>();
            //        // indice end
            //    }
            //}
            long vertexStart = 0L;
            long vertexLength = 0L;
            long indiceStart = 0L;
            long indiceLength = 0L;
            long boneEndPosition = 0L;
            // 记录vertexBuffer在总buffer里的起始位置,一般是0
            vertexStart = fileStream.Position;
            // 用于算包围球，计算模型的重心（所有点的位置均值）
            Vector3 vertexPositionAddup = new Vector3(0, 0, 0);

            // 遍历mesh里的所有定点
            for (int j = 0; j < mesh.vertexCount; j++)
            {
                Vector3 vector = mesh.vertices[j];

                // 写入position
                wxFileUtil.WriteData(fileStream, vector.x * -1f, vector.y, vector.z);
                // 统计position，用于算包围盒
                vertexPositionAddup.Set(vertexPositionAddup.x + vector.x * -1f, vertexPositionAddup.y + vector.y, vertexPositionAddup.z + vector.z);

                // 如果vertexLayout有normal，写入normal
                if (vertexLayout.NORMAL)
                {
                    Vector3 vector2 = mesh.normals[j];
                    wxFileUtil.WriteData(fileStream, vector2.x * -1f, vector2.y, vector2.z);
                }
                // 如果vertexLayout有color，写入color
                if (vertexLayout.COLOR)
                {
                    Color color = mesh.colors[j];
                    wxFileUtil.WriteData(fileStream, color.r, color.g, color.b, color.a);
                }
                // 如果vertexLayout有uv，写入uv
                if (vertexLayout.UV)
                {
                    Vector2 vector3 = mesh.uv[j];
                    wxFileUtil.WriteData(fileStream, vector3.x, vector3.y * -1f + 1f);
                }
                // 如果vertexLayout有uv1，写入uv1
                if (vertexLayout.UV1)
                {
                    Vector2 vector4 = mesh.uv2[j];
                    wxFileUtil.WriteData(fileStream, vector4.x, vector4.y * -1f + 1f);
                }
                if (vertexLayout.BONE)
                {
                    BoneWeight boneWeight = mesh.boneWeights[j];
                    wxFileUtil.WriteData(
                        fileStream,
                        boneWeight.weight0,
                        boneWeight.weight1,
                        boneWeight.weight2,
                        boneWeight.weight3
                    );
                    wxFileUtil.WriteData(
                        fileStream,
                        (float)boneWeight.boneIndex0,
                        (float)boneWeight.boneIndex1,
                        (float)boneWeight.boneIndex2,
                        (float)boneWeight.boneIndex3
                    );
                }
                // 如果vertexLayout有tangent，写入tangent
                if (vertexLayout.TANGENT)
                {
                    Vector4 vector5 = mesh.tangents[j];
                    wxFileUtil.WriteData(fileStream, vector5.x * -1f, vector5.y, vector5.z, vector5.w);
                }
            }
            // 记录vertexBuffer在buffer里的结束位置
            vertexLength = fileStream.Position - vertexStart;

            // 记录indiceBuffer在buffer里的起始位置
            indiceStart = fileStream.Position;
            // indiceBuffer指的是给模型绘制面时，每个面所用的顶点index。在unity里叫triangles
            int[] triangles = mesh.triangles;
            for (int j = 0; j < triangles.Length; j++)
            {
                wxFileUtil.WriteData(fileStream, (ushort)triangles[j]);
            }
            // 记录indexBuffer在buffer里的结束位置
            indiceLength = fileStream.Position - indiceStart;

            // 因为读取的时候是根据4位来读的所以末尾补0
            long isFour = indiceLength % 4;
            if (isFour != 0)
            {
                wxFileUtil.WriteData(fileStream, (ushort)0.0);
            }

            long boneStartPosition = fileStream.Position;
            if (mesh.bindposes != null && mesh.bindposes.Length != 0)
            {
                Matrix4x4[] bonePoses = new Matrix4x4[mesh.bindposes.Length];
                for (int i = 0; i < mesh.bindposes.Length; i++)
                {
                    bonePoses[i] = mesh.bindposes[i];
                    bonePoses[i] = bonePoses[i].inverse;
                    Vector3 s = default(Vector3);
                    Quaternion q = default(Quaternion);
                    Vector3 pos = default(Vector3);
                    MathUtil.Decompose(bonePoses[i].transpose, out s, out q, out pos);
                    pos.x *= -1f;
                    q.x *= -1f;
                    q.w *= -1f;
                    bonePoses[i] = Matrix4x4.TRS(pos, q, s);
                }
                for (int i = 0; i < mesh.bindposes.Length; i++)
                {
                    Matrix4x4 matrix4x = bonePoses[i];
                }
                for (int i = 0; i < mesh.bindposes.Length; i++)
                {
                    Matrix4x4 inverse = bonePoses[i].inverse;
                    for (int j = 0; j < 16; j++)
                    {
                        wxFileUtil.WriteData(fileStream, inverse[j]);
                    }
                }
                boneEndPosition = fileStream.Position;
            }
            long bonePoseLength = boneEndPosition - boneStartPosition;
            fileStream.Close();

            metadata.AddField("indiceFormat", 1); //   BIT16 = 1,BIT32 = 2
            metadata.AddField("vertexLayout", vertexLayout.GetLayoutString()); //"POSITION,NORMAL,COLOR,UV,BLENDWEIGHT,BLENDINDICES,TANGENT",
            metadata.AddField("vertexStart", 0);
            metadata.AddField("vertexLength", vertexLength);
            metadata.AddField("indiceStart", vertexLength); // indice的偏移量
            metadata.AddField("indiceLength", indiceLength); // indice的长度
            metadata.AddField("bonePoseStart", boneStartPosition);
            metadata.AddField("bonePoseLength", bonePoseLength);
            metadata.AddField("capsule", GetCapsule());

            bool succ = false;
            JSONObject bonesObject = GetSkinPaths(renderer.sharedMesh.name, ref succ);
            metadata.AddField("rootBone", bonesObject.GetField("root"));
            metadata.AddField("bones", bonesObject.GetField("bones"));
            metadata.AddField("version", 1);

            // 加入submesh
            JSONObject subMeshs = new JSONObject(JSONObject.Type.ARRAY);

#if !UNITY_2017_1_OR_NEWER
            int indexStart = 0;
#endif
            ushort subMeshCount = (ushort)mesh.subMeshCount;
            for (int i = 0; i < subMeshCount; i++)
            {
                JSONObject subMeshObj = new JSONObject(JSONObject.Type.OBJECT);
#if !UNITY_2017_1_OR_NEWER
                subMeshObj.AddField("start", indexStart);
                subMeshObj.AddField("length", mesh.GetIndices(i).Length);
                indexStart += mesh.GetIndices(i).Length;
#else
                subMeshObj.AddField("start", mesh.GetIndexStart(i));
                subMeshObj.AddField("length", mesh.GetIndexCount(i));
#endif
                subMeshs.Add(subMeshObj);
            }
            // submesh一般指的是mesh里的其中一部分，所以用indiceBuffer的区间表示
            metadata.AddField("subMeshs", subMeshs);


            return fileStream.ToArray();
        }

        private JSONObject GetCapsule()
        {
            JSONObject capsule = new JSONObject(JSONObject.Type.OBJECT);

            capsule.AddField("x", -1.0f * renderer.localBounds.center.x);
            capsule.AddField("y", renderer.localBounds.center.y);
            capsule.AddField("z", renderer.localBounds.center.z);
            capsule.AddField("radius", new Vector3(renderer.localBounds.extents.x, renderer.localBounds.extents.y, renderer.localBounds.extents.z).magnitude);

            return capsule;
        }

        public JSONObject GetSkinPaths(string name, ref bool succ)
        {

            Transform trans = renderer.transform;
            Animator animator = trans.GetComponent(typeof(Animator)) as Animator;
            while (!animator && trans)
            {
                trans = trans.parent;
                if (trans)
                {
                    animator = trans.GetComponent(typeof(Animator)) as Animator;
                }
            }
            if (animator)
            {
                string filePath = Path.GetFullPath(Directory.GetParent(Application.dataPath) + "/" + AssetDatabase.GetAssetPath(renderer.sharedMesh.GetInstanceID()));
                if (Path.GetExtension(filePath).ToLower() == ".fbx")
                {

                    bool useFBXSDK = false;
                    AssetImporter importer = AssetImporter.GetAtPath(AssetDatabase.GetAssetPath(renderer.sharedMesh.GetInstanceID()));
                    ModelImporter mImporter = importer as ModelImporter;
                    if (mImporter != null && mImporter.optimizeGameObjects) {
                        useFBXSDK = true;
                    }

                    if (useFBXSDK)
                    {
                        string toolDir = WXConfig.GetModelToolPath();
                        if (toolDir != null)
                        {
                            string result = WXUtility.ExecProcess(
                                    toolDir,
                                    "\"" + filePath + "\" --skin=\"" + name + "\"",
                                    out succ
                                );
                            if (succ)
                            {
                                return JSONObject.Create(result);
                            }
                            else
                            {
                                ErrorUtil.ExportErrorReporter.create()
                                    .setGameObject(trans.gameObject)
                                    .setResource(this)
                                    .error(ErrorUtil.ErrorCode.SkinnedMesh_FBXToolInvokeFailed, "导出骨骼模型失败:" + result);
                            }
                        }
                        else
                        {
                            ErrorUtil.ExportErrorReporter.create()
                                .setGameObject(trans.gameObject)
                                .setResource(this)
                                .error(ErrorUtil.ErrorCode.SkinnedMesh_FBXToolMissed, "模型导出工具缺失");
                        }
                    }
                    else
                    {
                        return GetSkinPathsOnScene(trans);
                    }
                }
                else
                {
                    ErrorUtil.ExportErrorReporter.create()
                        .setGameObject(trans.gameObject)
                        .setResource(this)
                        .error(ErrorUtil.ErrorCode.SkinnedMesh_MeshFormatUnsupported, "导出的模型格式不支持");
                }
                succ = false;
                return GetSkinPathsOnScene(trans);
            }
            else
            {
                ErrorUtil.ExportErrorReporter.create()
                    .setGameObject(renderer.gameObject)
                    .setResource(this)
                    .error(ErrorUtil.ErrorCode.SkinnedMesh_AnimatorNotFound, "MeshRenderer导出的时候没有找到对应Animator");
            }
            return new JSONObject(JSONObject.Type.OBJECT);
        }

        private JSONObject GetSkinPathsOnScene(Transform trans)
        {
            JSONObject bonesObject = new JSONObject(JSONObject.Type.ARRAY);
            string rootBone = null;
            if (renderer.rootBone)
            {
                Transform node = renderer.rootBone;
                List<string> pathArray = new List<string>();
                while (node != null && node != trans)
                {
                    pathArray.Add(node.name);
                    node = node.parent;
                }
                if (node != null)
                {
                    pathArray.Reverse();
                    rootBone = "/" + String.Join("/", pathArray.ToArray());
                }
            }
            for (int i = 0; i < renderer.bones.Length; i++)
            {
                Transform node = renderer.bones[i];
                List<string> pathArray = new List<string>();
                while (node != null && node != trans)
                {
                    pathArray.Add(node.name);
                    node = node.parent;
                }
                if (node != null)
                {
                    pathArray.Reverse();
                    bonesObject.Add("/" + String.Join("/", pathArray.ToArray()));
                }
            }
            JSONObject resultObject = new JSONObject(JSONObject.Type.OBJECT);
            resultObject.AddField("root", rootBone);
            resultObject.AddField("bones", bonesObject);
            return resultObject;
        }
    }
}
