//
//  CodeRainBackground.swift
//  Portfolio
//
//  Falling Swift keywords with glowing heads.
//  Port of Web/src/components/backgrounds/CodeRainBackground.jsx.
//

import SwiftUI

private enum Rain {
    static let pool: [String] = "letvarfuncclassstructenumprotocolextensionoverridereturnselfguardifelseforinopaquewheretruefalsenil{}()[]<>:=!?@.->/|&+01"
        .map(String.init)
    static let fontSize: CGFloat = 13
    static let columnWidth: CGFloat = 18
}

private struct RainColumn {
    var x: CGFloat
    var y: CGFloat
    var speed: CGFloat   // points/second
    var len: Int
    var chars: [String]

    static func random(x: CGFloat, height: CGFloat, initial: Bool) -> RainColumn {
        RainColumn(
            x: x,
            y: -CGFloat.random(in: 0...1) * height * (initial ? 1.2 : 0.6),
            speed: CGFloat.random(in: 0.9...3.1) * 60,
            len: Int.random(in: 10...29),
            chars: (0..<32).map { _ in Rain.pool.randomElement()! }
        )
    }
}

private final class RainStore {
    var columns: [RainColumn] = []
    var size: CGSize = .zero
    var lastDate: Date?
    var lastMutate: Date = .distantPast

    func update(size: CGSize, date: Date) {
        if columns.isEmpty || self.size != size {
            self.size = size
            let count = Int(ceil(size.width / Rain.columnWidth))
            columns = (0..<count).map {
                .random(x: CGFloat($0) * Rain.columnWidth + 4, height: size.height, initial: true)
            }
        }
        let dt = min(max(lastDate.map { date.timeIntervalSince($0) } ?? 0, 0), 0.05)
        lastDate = date

        // Mutate random characters every ~70ms for flicker.
        if date.timeIntervalSince(lastMutate) > 0.07 {
            lastMutate = date
            for i in columns.indices where Double.random(in: 0...1) < 0.4 {
                columns[i].chars[Int.random(in: 0..<columns[i].chars.count)] = Rain.pool.randomElement()!
            }
        }

        for i in columns.indices {
            columns[i].y += columns[i].speed * dt
            if columns[i].y - CGFloat(columns[i].len) * Rain.fontSize > size.height {
                let x = columns[i].x
                columns[i] = .random(x: x, height: size.height, initial: false)
            }
        }
    }
}

struct CodeRainBackground: View {
    let accent: Color

    @State private var store = RainStore()

    var body: some View {
        TimelineView(.animation(minimumInterval: 1.0 / 30.0)) { timeline in
            Canvas { context, size in
                store.update(size: size, date: timeline.date)
                let font = Font.system(size: Rain.fontSize, design: .monospaced)

                for col in store.columns {
                    for i in 0..<col.len {
                        let cy = col.y - CGFloat(i) * Rain.fontSize
                        guard cy > -Rain.fontSize, cy < size.height + Rain.fontSize else { continue }

                        let ch = col.chars[i % col.chars.count]
                        let at = CGPoint(x: col.x, y: cy)

                        if i == 0 {
                            // Bright glowing head.
                            context.drawLayer { layer in
                                layer.addFilter(.shadow(color: accent, radius: 6))
                                layer.draw(
                                    Text(ch).font(font).foregroundStyle(.white.opacity(0.95)),
                                    at: at, anchor: .leading
                                )
                            }
                        } else {
                            let alpha = max(0, (1 - Double(i) / Double(col.len)) * 0.6)
                            context.draw(
                                Text(ch).font(font).foregroundStyle(accent.opacity(alpha)),
                                at: at, anchor: .leading
                            )
                        }
                    }
                }
            }
        }
    }
}
