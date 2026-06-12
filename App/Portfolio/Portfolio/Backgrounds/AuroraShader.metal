//
//  AuroraShader.metal
//  Portfolio
//
//  Five sine-wave aurora ribbons with dual-frequency edges.
//  Ribbon table adapted from Web/src/components/backgrounds/AuroraBackground.jsx.
//

#include <metal_stdlib>
using namespace metal;

// { yFrac, ampFrac, widthFrac, alpha }
constant float4 AUR_R[5] = {
    float4(0.18, 0.08, 0.16, 0.40),
    float4(0.30, 0.06, 0.12, 0.32),
    float4(0.10, 0.05, 0.10, 0.28),
    float4(0.40, 0.04, 0.09, 0.24),
    float4(0.22, 0.07, 0.11, 0.20)
};
// { waves across width, speed (rad/s), phase }
constant float3 AUR_W[5] = {
    float3(2.2, 0.44, 0.0),
    float3(2.8, 0.32, 2.1),
    float3(1.8, 0.56, 4.5),
    float3(3.2, 0.38, 1.3),
    float3(1.4, 0.40, 3.7)
};

[[ stitchable ]] half4 auroraBackdrop(float2 position, half4 color,
                                      float2 size, float time,
                                      half4 from, half4 to) {
    float u = position.x / size.x;
    half3 col = half3(10.0 / 255.0, 10.0 / 255.0, 11.0 / 255.0);

    // Fade ribbons in from the horizontal edges, boost the middle.
    float edge = smoothstep(0.0, 0.15, u) * (1.0 - smoothstep(0.85, 1.0, u));
    float centered = 1.0 - abs(u - 0.5) * 2.0;

    for (int i = 0; i < 5; i++) {
        float4 r = AUR_R[i];
        float3 w = AUR_W[i];
        float amp = size.y * r.y;
        float width = size.y * r.z;

        float arg = u * w.x * 6.2832;
        float yC = size.y * r.x
            + sin(arg + time * w.y + w.z) * amp
            + sin(arg * 0.45 + time * w.y * 1.8 + w.z + 0.9) * amp * 0.35;

        // Soft band between the ribbon's centerline and centerline + width.
        float m = (position.y - yC) / width;
        float band = smoothstep(0.0, 0.3, m) * (1.0 - smoothstep(0.7, 1.0, m));

        float a = r.w * band * edge * (1.0 + 0.2 * centered);

        half3 cA = (i % 2 == 0) ? from.rgb : to.rgb;
        half3 cB = (i % 2 == 0) ? to.rgb : from.rgb;
        half3 c = mix(cA, cB, half(clamp(centered, 0.0, 1.0)));

        col = c * half(a) + col * half(1.0 - a);
    }

    return half4(col, 1.0h);
}
