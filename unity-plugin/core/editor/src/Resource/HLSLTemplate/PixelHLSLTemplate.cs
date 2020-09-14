namespace WeChat
{
    class PixelHLSLTemplate : BaseHLSLTemplate
    {
        public new static string Export(WXEffect wxbb_shader)
        {
            return string.Format(
                "#include <common.inc>\n\n// vertex的输出，pixel的输入，请和.vertex.hlsl文件保持一致\nstruct FVertexOutput\n{{\n    float4 Position : SV_Position;\n    float2 TexCoord : TEXCOORD0; }};\n\n// 根据原shader的properties自动生成\n{0}\n\n// 根据原shader的properties自动生成\n{1}\n\nfloat4 Main(in FVertexOutput In) : SV_Target0\n{{\n    // 请根据原shader的frag函数填充代码\n    return SAMPLE_TEXTURE(_MainTex, In.TexCoord);\n}}\n",
                GetUniformString(wxbb_shader),
                GetTextureDeclaration(wxbb_shader)
            );
        }
    }

}
