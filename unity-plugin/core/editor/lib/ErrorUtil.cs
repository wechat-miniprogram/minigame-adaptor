using UnityEngine;
using UnityEditor;
using System.Collections.Generic;
using System;

namespace WeChat
{

    /**
     * 专门处理导出插件错误的通用类
     */
    public class ErrorUtil
    {
        public enum ErrorCode
        {
            Cache_NotInited,
            MeshRenderer_MeshNotFound,
            Avatar_PathError,
            Particle_RendererNotFound,
            Texture_TypeUnsupported,
            AnimationClip_PathError,
            AnimationController_PathError,
            TextureCube_PathError,
            Texture_PathError,
            SkinnedMesh_AnimatorNotFound,
            SkinnedMesh_PathError,
            Scene_PathError,
            RawResource_PathError,
            Prefab_PathError,
            Mesh_PathError,
            Material_UnsupportedShader,
            Material_PathError,
            LightMap_PathError,
            EnvironmentMap_PathError,
            SkinnedMesh_FBXToolMissed,
            SkinnedMesh_FBXToolInvokeFailed,
            SkinnedMesh_MeshFormatUnsupported,
            AudioClip_PathError,
            Timeline_PathError,
        }


        /**
         * 错误报告器，方便开发者找到出问题的资源或者节点
         * ExportErrorReporter reporter = new ExportErrorReporter();
         * reporter.setEntity(xxx).setResource(xxx).warn(2, "警告信息");
         */
        public class ExportErrorReporter
        {
            public static ExportErrorReporter create()
            {
                return new ExportErrorReporter();
            }
            // 对warn进行计数，防止导出完成后开发者没看到
            public static int warnCount;
            public static void cleanWarnCount()
            {
                warnCount = 0;
            }

            protected WXEntity entity;
            protected GameObject gameObject;
            protected WXHierarchyContext hierarchyContext;
            protected WXResource resource;
            protected Exception exception;

            public ExportErrorReporter setEntity(WXEntity entity)
            {
                this.entity = entity;
                return this;
            }
            public ExportErrorReporter setGameObject(GameObject gameObject)
            {
                this.gameObject = gameObject;
                return this;
            }
            public ExportErrorReporter setHierarchyContext(WXHierarchyContext hierarchyContext)
            {
                this.hierarchyContext = hierarchyContext;
                return this;
            }
            public ExportErrorReporter setResource(WXResource resource)
            {
                this.resource = resource;
                return this;
            }

            public void warn(string errorName, string message)
            {
                string messageTemplate = string.Format("WARN({0})：{1}\n", errorName, message);

                if (entity != null)
                {
                    messageTemplate += string.Format("相关GameObject名称：{0}。\n", entity.gameObject.name);
                }
                else if (gameObject != null)
                {
                    messageTemplate += string.Format("相关GameObject名称：{0}。\n", gameObject.name);
                }
                if (hierarchyContext != null)
                {
                    messageTemplate += string.Format("相关Prefab和Scene路径：{0}。\n", hierarchyContext.resourcePath);
                }
                if (resource != null)
                {
                    messageTemplate += string.Format("相关资源路径：{0}。\n", resource.GetExportPath());
                }

                Debug.LogWarning(messageTemplate);
                warnCount++;
            }

            public void error(ErrorCode errorName, string message)
            {
                string messageTemplate = string.Format("ERROR({0})：{1}。\n", errorName.ToString(), message);

                if (entity != null)
                {
                    messageTemplate += string.Format("相关GameObject名称：{0}。\n", entity.gameObject.name);
                }
                else if (gameObject != null)
                {
                    messageTemplate += string.Format("相关GameObject名称：{0}。\n", gameObject.name);
                }
                if (hierarchyContext != null)
                {
                    messageTemplate += string.Format("相关Prefab和Scene路径：{0}。\n", hierarchyContext.resourcePath);
                }
                if (resource != null)
                {
                    messageTemplate += string.Format("相关资源路径：{0}。\n", resource.GetExportPath());
                }

                Debug.LogError(messageTemplate);
                throw new Exception("遇到以上错误，终止导出。你可以在 https://developers.weixin.qq.com/minigame/dev/game-engine/QA/error-code.html 查看错误码详情");
            }
        }
    }

}