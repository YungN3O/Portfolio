//
//  Backdrop.swift
//  Portfolio
//
//  The four animated backgrounds, ported from the website.
//  Named `Backdrop` to avoid colliding with SwiftUI's `BackgroundStyle`.
//

import Foundation

enum Backdrop: String, CaseIterable, Identifiable {
    case mesh, aurora, bokeh, codeRain

    var id: String { rawValue }

    var label: String {
        switch self {
        case .mesh: "Mesh"
        case .aurora: "Aurora"
        case .bokeh: "Bokeh"
        case .codeRain: "Code Rain"
        }
    }

    var icon: String {
        switch self {
        case .mesh: "circle.hexagongrid.fill"
        case .aurora: "water.waves"
        case .bokeh: "bubbles.and.sparkles.fill"
        case .codeRain: "chevron.left.forwardslash.chevron.right"
        }
    }
}
