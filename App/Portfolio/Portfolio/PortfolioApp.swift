//
//  PortfolioApp.swift
//  Portfolio
//
//  Created by Vasilis Gkoumas on 10/6/26.
//

import SwiftUI

@main
struct PortfolioApp: App {
    @State private var store = ThemeStore()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(store)
                .preferredColorScheme(.dark)
        }
    }
}
