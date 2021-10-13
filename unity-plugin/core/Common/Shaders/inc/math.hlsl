
#ifndef __MATH_HLSL_
#define __MATH_HLSL_

#define FLT_MAX  3.402823466e+38 // Maximum representable floating-point number
#define HALF_MIN 6.103515625e-5
#define kDieletricSpec half4(0.04, 0.04, 0.04, 1.0 - 0.04)

#define PositivePow(a,b) pow(a,b)

fixed3 TransformTangentToWorld(fixed3 vectorTS, fixed3x3 tangentToWorld)
{
    return mul(vectorTS, tangentToWorld);
}

half3 SafeNormalize(half3 inVec)
{
    half3 dp3 = max(HALF_MIN, dot(inVec, inVec));
    return inVec * rsqrt(dp3);
}

float pow5( float x )
{
	float xx = x*x;
	return xx * xx * x;
}

half pow4(half x){
    half xx = x*x;
    return xx*xx;
}

#endif//__MATH_H_