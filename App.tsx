import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { HomeScreen } from "./src/screens/HomeScreen";
import { SignUpScreen } from "./src/screens/SignUpScreen";
import { SignInScreen } from "./src/screens/SignInScreen";
import { MobileMenu } from "./src/components/MobileMenu";

// Khởi tạo QueryClient cho React Query (dùng cho các hook gọi API đăng nhập/đăng ký)
const queryClient = new QueryClient();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "home" | "signin" | "signup"
  >("home");
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
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
            onNavigateToSignIn={() => {
              setMenuVisible(false);
              setCurrentScreen("signin");
            }}
            onNavigateToSignUp={() => {
              setMenuVisible(false);
              setCurrentScreen("signup");
            }}
          />

          {/* Quản lý hiển thị các màn hình và truyền sự kiện chuyển trang */}
          {currentScreen === "home" && (
            <HomeScreen
              onGetStarted={() => {
                console.log("Đã bấm Get started thành công!");
                setCurrentScreen("signin");
              }}
              onOpenMenu={() => setMenuVisible(true)}
            />
          )}

          {currentScreen === "signup" && (
            <SignUpScreen
              onNavigateToSignIn={() => setCurrentScreen("signin")}
              onBackToHome={() => setCurrentScreen("home")}
            />
          )}

          {currentScreen === "signin" && (
            <SignInScreen
              onNavigateToSignUp={() => setCurrentScreen("signup")}
              onBackToHome={() => setCurrentScreen("home")}
            />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
