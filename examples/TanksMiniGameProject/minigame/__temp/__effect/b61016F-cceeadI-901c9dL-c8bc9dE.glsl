#version 100 
precision mediump float;
precision mediump int;

#ifndef DONTEMITSAMPLERDEFAULTPRECISION
precision mediump sampler2D;
precision mediump samplerCube;

#endif

#ifdef TEXCOORDPRECISIONWORKAROUND
vec4 texture2DTexCoordPrecisionWorkaround(sampler2D p, vec2 tcoord)
{
	return texture2D(p, tcoord);
}
#define texture2D texture2DTexCoordPrecisionWorkaround
#endif
void main()
{
	gl_FragColor.xyzw = vec4(1.000000e+00,0.000000e+00,1.000000e+00,1.000000e+00);
}

