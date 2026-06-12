//
//  Color+Hex.swift
//  Portfolio
//

import SwiftUI

extension Color {
    init(hex: UInt32) {
        self.init(
            red: Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8) & 0xFF) / 255,
            blue: Double(hex & 0xFF) / 255
        )
    }

    /// Near-black app background — matches the website's `--bg` (#0a0a0b).
    static let appBackground = Color(hex: 0x0A0A0B)
    /// Card surface — matches `--surface` (#15151a).
    static let surface = Color(hex: 0x15151A)
    /// Muted text — matches `--text-muted` (#a1a1aa).
    static let textMuted = Color(hex: 0xA1A1AA)
}
