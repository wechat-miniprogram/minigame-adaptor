using System;
using UnityEditor;
using UnityEngine;

using System;
using UnityEditor;
using UnityEngine;

namespace WeChat
{
    class WXBlinnPhongNewParser : WXMaterialParser
    {
        public override void onParse(WXMaterial wxbb_material)
        {
            Material material = m_material;

            SetEffect("@system/blinnPhongNew");

			// diffuse texture
			AddTexture("_MainTex","_MainTex");
			// diffuse texture scale offset
			Vector2 textureScale = material.GetTextureScale("_MainTex");
			Vector2 textureOffset = material.GetTextureOffset("_MainTex");
			AddShaderParam("_MainTex_ST",new float[4] {textureScale.x,textureScale.y,textureOffset.x,textureOffset.y});
			// diffuse intensity
			AddShaderParam("_AlbedoIntensity",material.GetFloat("_AlbedoIntensity"));
			// diffuse color
			AddShaderParam("_Color", material.GetColor("_Color"), true);
			// shininess
			AddShaderParam("_Shininess", material.GetFloat("_Shininess"));
			// specular color
			AddShaderParam("_SpecColor", material.GetColor("_SpecColor"), true);

			AddShaderParam("_Cutoff", material.GetFloat("_Cutoff"));

			AddShaderParam("_EmissionColor",material.GetColor("_EmissionColor"),true);

			AddShaderDefination("USE_FOG", (double)material.GetFloat("_Fog") == 1.0 ? false : true);

			// alpha test
			if (material.IsKeywordEnabled("_ALPHATEST_ON"))
			{
				AddShaderDefination("USE_ALPHA_TEST", true);
			}

			// spec map
			if (material.GetTexture("_SpecGlossMap") != null)
			{
				AddTexture("_SpecGlossMap", "_SpecGlossMap");
				AddShaderDefination("USE_SPECMAP", true);
			}

			// normal map
			if (material.GetTexture("_BumpMap") != null)
			{
				AddTexture("_BumpMap", "_BumpMap");
				AddShaderDefination("USE_NORMALMAP", true);
			}

			// emission map
			if (material.GetTexture("_EmissionMap") != null)
			{
				AddTexture("_EmissionMap","_EmissionMap");
				AddShaderDefination("USE_EMISSIONMAP", true);
			}

			// alpha blend
			if(material.IsKeywordEnabled("_ALPHABLEND_ON")){
				SetBlendOn(true);
				SetBlendFactor(ConvertBlendFactor(material.GetInt("_SrcBlend")) ,ConvertBlendFactor(material.GetInt("_DstBlend")));
			}else{
				SetBlendOn(false);
			}
			// depth write
			SetDepthWrite(material.GetInt("_ZWrite") == 1? true:false);
			// depth test
			SetDepthTest(ConvertCompareFunc(material.GetInt("_ZTest")));
			// cull
			SetCullMode(ConvertCullMode(material.GetInt("_Cull")));
        }

        protected override void SetEffect(String effect)
        {
            m_mainJson.SetField("effect", effect);
        }
    }
}
