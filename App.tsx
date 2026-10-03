import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HomeScreen } from "./src/screens/HomeScreen";
import { SignUpScreen } from "./src/screens/SignUpScreen";
import { SignInScreen } from "./src/screens/SignInScreen";
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { SubscriptionScreen } from "./src/screens/SubscriptionScreen";
import { UsageScreen } from "./src/screens/UsageScreen";
import { ChatAiScreen } from "./src/screens/ChatAiScreen";
import { UploadAnalyzeScreen } from "./src/screens/UploadAnalyzeScreen";
import { MobileMenu } from "./src/components/MobileMenu";
import { UserData } from "./src/services/apiService";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    | "home"
    | "signin"
    | "signup"
    | "dashboard"
    | "subscription"
    | "usage"
    | "chat"
    | "upload"
  >("home");
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("user");
    } catch (e) {
      console.warn("Lỗi xoá token AsyncStorage:", e);
    }
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

        {/* Modal Menu thả xuống của trang chủ */}
        <MobileMenu
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          onNavigateToSignIn={() => setCurrentScreen("signin")}
        />

        {/* 1. Màn hình Landing Home */}
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
              setCurrentUser(user);
              setCurrentScreen("dashboard");
            }}
          />
        )}

        {/* 3. Màn hình Đăng Ký */}
        {currentScreen === "signup" && (
          <SignUpScreen
            onNavigateToSignIn={() => setCurrentScreen("signin")}
            onBackToHome={() => setCurrentScreen("home")}
            onRegisterSuccess={(user) => {
              setCurrentUser(user);
              setCurrentScreen("dashboard");
            }}
          />
        )}

        {/* 4. Màn hình Dashboard */}
        {currentScreen === "dashboard" && (
          <DashboardScreen
            user={currentUser}
            onLogout={handleLogout}
            onNavigateToSubscription={() => setCurrentScreen("subscription")}
            onNavigateToUsage={() => setCurrentScreen("usage")}
            onNavigateToChat={() => setCurrentScreen("chat")}
            onNavigateToUpload={() => setCurrentScreen("upload")}
          />
        )}

        {/* 5. Màn hình Subscription */}
        {currentScreen === "subscription" && (
          <SubscriptionScreen
            user={currentUser}
            onLogout={handleLogout}
            onNavigateToDashboard={() => setCurrentScreen("dashboard")}
            onNavigateToUsage={() => setCurrentScreen("usage")}
          />
        )}

        {/* 6. Màn hình Usage */}
        {currentScreen === "usage" && (
          <UsageScreen
            user={currentUser}
            onLogout={handleLogout}
            onNavigateToSubscription={() => setCurrentScreen("subscription")}
            onNavigateToDashboard={() => setCurrentScreen("dashboard")}
          />
        )}

        {/* 7. Màn hình Chat với AI */}
        {currentScreen === "chat" && (
          <ChatAiScreen
            user={currentUser}
            onLogout={handleLogout}
            onNavigateToDashboard={() => setCurrentScreen("dashboard")}
            onNavigateToSubscription={() => setCurrentScreen("subscription")}
            onNavigateToUsage={() => setCurrentScreen("usage")}
          />
        )}

        {/* 8. Màn hình Upload & Analyze */}
        {currentScreen === "upload" && (
          <UploadAnalyzeScreen
            user={currentUser}
            onLogout={handleLogout}
            onNavigateToDashboard={() => setCurrentScreen("dashboard")}
            onNavigateToSubscription={() => setCurrentScreen("subscription")}
            onNavigateToUsage={() => setCurrentScreen("usage")}
            onNavigateToChat={() => setCurrentScreen("chat")}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
