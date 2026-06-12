//
//  ContentView.swift
//  Portfolio
//
//  Root: animated backdrop behind the Orbit hub, control dock floating on top.
//

import SwiftUI

struct ContentView: View {
    @Environment(ThemeStore.self) private var store

    var body: some View {
        ZStack {
            Color.appBackground
                .ignoresSafeArea()

            BackdropHost()

            HubView()

            VStack {
                Spacer()
                ControlDock()
            }
        }
    }
}

#Preview {
    ContentView()
        .environment(ThemeStore())
        .preferredColorScheme(.dark)
}
