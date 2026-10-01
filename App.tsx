import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { HomeScreen } from "./src/screens/HomeScreen";
import { SignUpScreen } from "./src/screens/SignUpScreen";
import { SignInScreen } from "./src/screens/SignInScreen";
import { MobileMenu } from "./src/components/MobileMenu";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "home" | "signin" | "signup"
  >("home");
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#ffffff" }}
        edges={["top"]}
      >
        <StatusBar style="dark" />

        {/* Modal Menu hiển thị toàn màn hình */}
        <MobileMenu
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          onNavigateToSignIn={() => setCurrentScreen("signin")}
          onNavigateToSignUp={() => setCurrentScreen("signup")}
        />

        {/* Chuyển màn hình */}
        {currentScreen === "home" && (
          <HomeScreen />
        )}

        {currentScreen === "signup" && (
          <SignUpScreen
            onNavigateToSignIn={() => setCurrentScreen("signin")}
            onBackToHome={() => setCurrentScreen("home")}
          />
        )}

        {currentScreen === "signin" && (
          <SignInScreen onNavigateToSignUp={() => setCurrentScreen("signup")} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
