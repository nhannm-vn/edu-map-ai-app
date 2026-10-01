import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Sparkles, Menu } from "lucide-react-native";

interface HeaderProps {
  onOpenMenu: () => void;
  onNavigateToSignIn: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onNavigateToSignIn,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.brandContainer}>
        <View style={styles.logoSquare}>
          <Sparkles size={20} color="#ffffff" />
        </View>
        <Text style={styles.brandTitle}>EduMap AI</Text>
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.btnHeaderStart}
          activeOpacity={0.8}
          onPress={onNavigateToSignIn}
        >
          <Text style={styles.btnHeaderStartText}>Get started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnMenu}
          activeOpacity={0.7}
          onPress={onOpenMenu}
        >
          <Menu size={22} color="#1E293B" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    backgroundColor: "#ffffff",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoSquare: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  btnHeaderStart: {
    backgroundColor: "#4F46E5",
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnHeaderStartText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  btnMenu: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
});
