/*
* @Athour: kumozheng
* @Date: 2020-08-13 08:15:55
 * @LastEditors: kumozheng
 * @LastEditTime: 2020-08-15 17:19:30
* @Description: 
 * @FilePath: /UnityWork/Assets/unity-plugin/core/Common/Shaders/Forward.cginc
*/


#define HALF_MIN 6.103515625e-5

struct Light{
    half3 direction;
    half attenuation;
};

// distance attenuation
float distanceAttenuation(float distanceSqr, float2 distAtten)
{
    float atten = rcp(distanceSqr);
    /*
    * 从80%Range开始smooth fade:
    *   fadeDistance = (0.8 * 0.8 *rangeSqr)
    *   smoothFactor = (rangeSqr - distanceSqr) / (rangeSqr - fadeDistance)
    * 简化为：
    *   smoothFactor = d2 * (-1/(0.36*r2)) + 1/0.36
    *   distAtten.x = -1/(0.36*r2), distAtten.y = 1/0.36
    */
    float smoothFactor = saturate(distanceSqr * distAtten.x + distAtten.y);
    return atten * smoothFactor;
}

// angle attenuation
float angleAttenuation(float3 spotDir, float3 lightDir, half2 spotAtten)
{
    /*
    * 线性spot atten: (SdotL - cosOutAngle)/(cosInnerAngle - cosOutAngle)
    * spotAtten.x = 1/(cosInnerAngle - cosOuterAngle)
    * spotAtten.y = (-cosOuterAngle * spotAtten.x)
    * 点光源 spotAtten.x = (0, 1) return 1;
    */
    half sol = dot(spotDir, lightDir);
    half atten = saturate(sol * spotAtten.x + spotAtten.y);
    return atten * atten;
}

Light GetAdditionalLight(float4 posWorld){

    Light light;
    #ifdef USING_DIRECTIONAL_LIGHT
        light.attenuation = 1.0;
        light.direction = _WorldSpaceLightPos0.xyz;
    #else 
        float3 lightPosWS = _WorldSpaceLightPos0.xyz;
        float3 lightVec = lightPosWS - posWorld.xyz;
        float distanceSqr = max(dot(lightVec, lightVec), HALF_MIN);

        half3 lightDirection = half3(lightVec * rsqrt(distanceSqr));
        half4 distanceAndSpotAtten = float4(0, 2.8, 0, 1);

        // trick get light range
        float4 lightCoord=mul(unity_WorldToLight, float4(posWorld.xyz, 1));
        float range = length(lightVec) / length(lightCoord.xyz);

        distanceAndSpotAtten.x = -2.8 /(range * range);
        float atten = distanceAttenuation(distanceSqr, distanceAndSpotAtten.xy);
        
        #if defined(SPOT)
            // trick get spot angle
            float cotanHalfSpotAngle = 2. * lightCoord.z / lightCoord.w;
            float outSpotAngle = atan(1/cotanHalfSpotAngle);
            float innerSpotAngle = outSpotAngle * 0.8;
            float cosInner = cos(innerSpotAngle);
            float cosOuter = cos(outSpotAngle);
            distanceAndSpotAtten.z = 1/(cosInner - cosOuter);
            distanceAndSpotAtten.w = -(cosOuter * distanceAndSpotAtten.z);
            // trick get spot direction
            float3 spotDirection = normalize(mul(float3(0,0,-1), (float3x3)unity_WorldToLight));
            atten = atten * angleAttenuation(spotDirection, lightDirection, distanceAndSpotAtten.zw);
        #endif
        light.direction = lightDirection;
        light.attenuation = atten;
    #endif	

    return light;
}
