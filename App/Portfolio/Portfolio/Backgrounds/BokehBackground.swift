//
//  BokehBackground.swift
//  Portfolio
//
//  Eighty depth-of-field orbs drifting upward.
//  Port of Web/src/components/backgrounds/BokehBackground.jsx.
//

import SwiftUI

private struct BokehParticle {
    var x: CGFloat
    var y: CGFloat
    var depth: CGFloat       // 0 = far/small, 1 = near/large
    var radius: CGFloat
    var speed: CGFloat       // points/second
    var drift: CGFloat       // points/second
    var opacity: CGFloat
    var colorMix: CGFloat    // 0 = from, 1 = to

    static func random(in size: CGSize, initial: Bool) -> BokehParticle {
        let depth = CGFloat.random(in: 0...1)
        return BokehParticle(
            x: CGFloat.random(in: 0...size.width),
            y: initial ? CGFloat.random(in: 0...size.height) : size.height + 60,
            depth: depth,
            radius: 2 + depth * 38,
            speed: (0.07 + depth * 0.22) * 60,
            drift: CGFloat.random(in: -0.09...0.09) * 60,
            opacity: 0.05 + depth * 0.38,
            colorMix: CGFloat.random(in: 0...1)
        )
    }
}

private final class BokehStore {
    var particles: [BokehParticle] = []
    var size: CGSize = .zero
    var lastDate: Date?

    func update(size: CGSize, date: Date) {
        if particles.isEmpty || self.size != size {
            self.size = size
            particles = (0..<80).map { _ in .random(in: size, initial: true) }
        }
        let dt = min(max(lastDate.map { date.timeIntervalSince($0) } ?? 0, 0), 0.05)
        lastDate = date

        for i in particles.indices {
            particles[i].y -= particles[i].speed * dt
            particles[i].x += particles[i].drift * dt
            if particles[i].y < -particles[i].radius * 3 {
                particles[i] = .random(in: size, initial: false)
            }
        }
        // Back-to-front so large near orbs draw on top.
        particles.sort { $0.depth < $1.depth }
    }
}

struct BokehBackground: View {
    let from: Color
    let to: Color

    @State private var store = BokehStore()

    var body: some View {
        TimelineView(.animation) { timeline in
            Canvas { context, size in
                store.update(size: size, date: timeline.date)

                for p in store.particles {
                    let color = from.mix(with: to, by: p.colorMix)
                    let center = CGPoint(x: p.x, y: p.y)

                    // Outer halo stands in for the canvas shadow-blur glow.
                    let haloR = p.radius * (1.4 + p.depth * 0.8)
                    let halo = Gradient(stops: [
                        .init(color: color.opacity(p.opacity * 0.35), location: 0),
                        .init(color: color.opacity(0), location: 1),
                    ])
                    context.fill(
                        Path(ellipseIn: CGRect(x: p.x - haloR, y: p.y - haloR,
                                               width: haloR * 2, height: haloR * 2)),
                        with: .radialGradient(halo, center: center, startRadius: 0, endRadius: haloR)
                    )

                    let body = Gradient(stops: [
                        .init(color: color.opacity(p.opacity), location: 0),
                        .init(color: color.opacity(p.opacity * 0.5), location: 0.5),
                        .init(color: color.opacity(0), location: 1),
                    ])
                    context.fill(
                        Path(ellipseIn: CGRect(x: p.x - p.radius, y: p.y - p.radius,
                                               width: p.radius * 2, height: p.radius * 2)),
                        with: .radialGradient(body, center: center, startRadius: 0, endRadius: p.radius)
                    )
                }
            }
        }
    }
}
