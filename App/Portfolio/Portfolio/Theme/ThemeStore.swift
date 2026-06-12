//
//  ThemeStore.swift
//  Portfolio
//

import SwiftUI

@Observable
final class ThemeStore {
    var theme: AccentTheme {
        didSet { UserDefaults.standard.set(theme.rawValue, forKey: Self.themeKey) }
    }

    var backdrop: Backdrop {
        didSet { UserDefaults.standard.set(backdrop.rawValue, forKey: Self.backdropKey) }
    }

    private static let themeKey = "accentTheme"
    private static let backdropKey = "backdrop"

    init() {
        theme = UserDefaults.standard.string(forKey: Self.themeKey)
            .flatMap { AccentTheme(rawValue: $0) } ?? .blue
        backdrop = UserDefaults.standard.string(forKey: Self.backdropKey)
            .flatMap { Backdrop(rawValue: $0) } ?? .mesh
    }
}
