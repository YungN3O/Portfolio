//
//  BackdropHost.swift
//  Portfolio
//
//  Hosts the active animated backdrop and cross-fades on switch.
//

import SwiftUI

struct BackdropHost: View {
    @Environment(ThemeStore.self) private var store
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    var body: some View {
        Group {
            if reduceMotion {
                // Static gradient wash instead of animated canvases/shaders.
                RadialGradient(
                    colors: [store.theme.from.opacity(0.25), .clear],
                    center: .topLeading, startRadius: 0, endRadius: 600
                )
            } else {
                switch store.backdrop {
                case .mesh:
                    MeshBackground(from: store.theme.from, to: store.theme.to)
                case .aurora:
                    AuroraBackground(from: store.theme.from, to: store.theme.to)
                case .bokeh:
                    BokehBackground(from: store.theme.from, to: store.theme.to)
                case .codeRain:
                    CodeRainBackground(accent: store.theme.from)
                }
            }
        }
        .id("\(store.backdrop.rawValue)-\(store.theme.rawValue)")
        .transition(.opacity)
        .animation(.easeInOut(duration: 0.6), value: store.backdrop)
        .animation(.easeInOut(duration: 0.6), value: store.theme)
        .ignoresSafeArea()
        .allowsHitTesting(false)
    }
}
