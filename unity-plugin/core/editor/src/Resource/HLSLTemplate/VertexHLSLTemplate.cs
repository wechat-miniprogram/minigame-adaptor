using System;
namespace WeChat
{
    class VertexHLSLTemplate : BaseHLSLTemplate
    {
        public new static string Export(WXEffect wxbb_shader)
        {
            return string.Format(
                "#include <common.inc>\n\n// vertex的输出，pixel的输入，请根据原shader文件修改\nstruct FVertexOutput\n{{\n    float4 Position : SV_Position;\n    float2 TexCoord : TEXCOORD0;\n}};\n\n// 根据原shader的properties自动生成\n{0}\n\n// 根据原shader的properties自动生成\n{1}\n\nvoid Main(in FEffect3DVertexInput In, out FVertexOutput Out)\n{{\n    FVertexProcessOutput VPOut;\n	Effect3DVertexProcess(In, VPOut);\n\n    Out.Position = WorldToClipPosition(VPOut.WorldPosition);\n\n  Out.TexCoord = TRANSFER_TEXCOORD(VPOut.TexCoord, _MainTex_ST);\n }}",
                GetUniformString(wxbb_shader),
                GetTextureDeclaration(wxbb_shader)
            );
        }
    }
}
