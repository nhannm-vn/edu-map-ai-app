import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HomeScreen } from "./src/screens/HomeScreen";
import { SignUpScreen } from "./src/screens/SignUpScreen";
import { SignInScreen } from "./src/screens/SignInScreen";
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { MobileMenu } from "./src/components/MobileMenu";
import { UserData } from "./src/services/authService";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "home" | "signin" | "signup" | "dashboard"
  >("home");
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("user");
    setCurrentUser(null);
    setCurrentScreen("home");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#ffffff" }}
        edges={["top"]}
      >
        <StatusBar style="dark" />

        {/* Modal Menu thả xuống */}
        <MobileMenu
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          onNavigateToSignIn={() => setCurrentScreen("signin")}
        />

        {/* 1. Màn hình Trang Chủ */}
        {currentScreen === "home" && (
          <HomeScreen
            onOpenMenu={() => setMenuVisible(true)}
            onNavigateToSignIn={() => setCurrentScreen("signin")}
          />
        )}

        {/* 2. Màn hình Đăng Nhập */}
        {currentScreen === "signin" && (
          <SignInScreen
            onNavigateToSignUp={() => setCurrentScreen("signup")}
            onBackToHome={() => setCurrentScreen("home")}
            onLoginSuccess={(user) => {
              console.log("User đăng nhập:", user);
              setCurrentUser(user);
              setCurrentScreen("dashboard"); // Đổi state sang dashboard
            }}
          />
        )}

        {/* 3. Màn hình Đăng Ký */}
        {currentScreen === "signup" && (
          <SignUpScreen
            onNavigateToSignIn={() => setCurrentScreen("signin")}
            onBackToHome={() => setCurrentScreen("home")}
            onRegisterSuccess={(user) => {
              console.log("User đăng ký thành công:", user);
              setCurrentUser(user);
              setCurrentScreen("dashboard"); // Vào thẳng dashboard
            }}
          />
        )}

        {/* 4. Màn hình Dashboard sau khi Login */}
        {currentScreen === "dashboard" && (
          <DashboardScreen user={currentUser} onLogout={handleLogout} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
