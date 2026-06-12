//
//  Theme.swift
//  Portfolio
//
//  The three accent themes from the website (ThemeContext.jsx).
//

import SwiftUI

enum AccentTheme: String, CaseIterable, Identifiable {
    case blue, amber, indigo

    var id: String { rawValue }

    var label: String {
        switch self {
        case .blue: "Blue"
        case .amber: "Amber"
        case .indigo: "Indigo"
        }
    }

    var from: Color {
        switch self {
        case .blue: Color(hex: 0x1C77FF)
        case .amber: Color(hex: 0xF59E0B)
        case .indigo: Color(hex: 0x6366F1)
        }
    }

    var to: Color {
        switch self {
        case .blue: Color(hex: 0x00C9FF)
        case .amber: Color(hex: 0xFB923C)
        case .indigo: Color(hex: 0x8B5CF6)
        }
    }

    var gradient: LinearGradient {
        LinearGradient(colors: [from, to], startPoint: .topLeading, endPoint: .bottomTrailing)
    }
}
