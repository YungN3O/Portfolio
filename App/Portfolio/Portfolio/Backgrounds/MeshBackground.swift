//
//  MeshBackground.swift
//  Portfolio
//
//  Six Lissajous-drifting color blobs, rendered per-pixel in Metal.
//  Port of Web/src/components/backgrounds/MeshBackground.jsx.
//

import SwiftUI

struct MeshBackground: View {
    let from: Color
    let to: Color

    @State private var start = Date()

    var body: some View {
        GeometryReader { geo in
            TimelineView(.animation) { timeline in
                let t = timeline.date.timeIntervalSince(start)
                Rectangle()
                    .fill(Color.appBackground)
                    .colorEffect(ShaderLibrary.meshBackdrop(
                        .float2(geo.size),
                        .float(Float(t)),
                        .color(from),
                        .color(to)
                    ))
            }
        }
    }
}
