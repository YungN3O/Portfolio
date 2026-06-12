//
//  MeshShader.metal
//  Portfolio
//
//  Six radial color blobs drifting on Lissajous paths.
//  Constants match Web/src/components/backgrounds/MeshBackground.jsx.
//

#include <metal_stdlib>
using namespace metal;

// { x, y } base anchors (fractions of view size)
constant float2 MESH_P[6] = {
    float2(0.20, 0.25), float2(0.80, 0.20), float2(0.55, 0.65),
    float2(0.10, 0.75), float2(0.90, 0.55), float2(0.45, 0.10)
};
// { ax, ay } drift amplitudes
constant float2 MESH_A[6] = {
    float2(0.18, 0.14), float2(0.14, 0.20), float2(0.20, 0.16),
    float2(0.12, 0.14), float2(0.16, 0.12), float2(0.10, 0.18)
};
// { fx, fy } drift frequencies
constant float2 MESH_F[6] = {
    float2(0.28, 0.32), float2(0.36, 0.25), float2(0.22, 0.40),
    float2(0.45, 0.30), float2(0.32, 0.42), float2(0.40, 0.28)
};
// { px, py } phases
constant float2 MESH_PH[6] = {
    float2(0.00, 1.20), float2(2.10, 0.70), float2(4.20, 3.10),
    float2(1.00, 2.50), float2(3.20, 0.30), float2(5.10, 1.80)
};

[[ stitchable ]] half4 meshBackdrop(float2 position, half4 color,
                                    float2 size, float time,
                                    half4 from, half4 to) {
    // Web: t = ms * 0.00028  →  0.28 rad/s
    float t = time * 0.28;
    float R = max(size.x, size.y) * 0.62;

    half3 col = half3(10.0 / 255.0, 10.0 / 255.0, 11.0 / 255.0);

    for (int i = 0; i < 6; i++) {
        float cx = size.x * (MESH_P[i].x + sin(t * MESH_F[i].x + MESH_PH[i].x) * MESH_A[i].x);
        float cy = size.y * (MESH_P[i].y + cos(t * MESH_F[i].y + MESH_PH[i].y) * MESH_A[i].y);
        float d = distance(position, float2(cx, cy)) / R;
        float pulse = 0.13 + 0.04 * sin(t * 0.6 + float(i) * 1.2);

        // Radial gradient stops: 1.0 @ 0, 0.45 @ 0.4, 0 @ 1.0
        float a = d < 0.4
            ? mix(1.0, 0.45, d / 0.4)
            : mix(0.45, 0.0, clamp((d - 0.4) / 0.6, 0.0, 1.0));
        a *= pulse;

        half3 c = (i % 2 == 0) ? from.rgb : to.rgb;
        col = c * half(a) + col * half(1.0 - a);
    }

    return half4(col, 1.0h);
}
