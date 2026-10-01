import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import { Sparkles, X } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MobileMenuProps {
  visible: boolean;
  onClose: () => void;
  onNavigateToSignIn: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  visible,
  onClose,
  onNavigateToSignIn,
}) => {
  const handleOpenSignIn = () => {
    onClose();
    onNavigateToSignIn();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={false}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.logoSquare}>
              <Sparkles size={20} color="#ffffff" />
            </View>
            <Text style={styles.brandTitle}>EduMap AI</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.btnHeaderStart}
              onPress={handleOpenSignIn}
            >
              <Text style={styles.btnHeaderStartText}>Get started</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnClose} onPress={onClose}>
              <X size={22} color="#1E293B" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.menuBody}>
          <TouchableOpacity style={styles.menuLink} onPress={onClose}>
            <Text style={styles.menuLinkText}>Features</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuLink} onPress={onClose}>
            <Text style={styles.menuLinkText}>Pricing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuLink} onPress={onClose}>
            <Text style={styles.menuLinkText}>FAQ</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuLink} onPress={handleOpenSignIn}>
            <Text style={styles.menuLinkText}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnFullStart}
            onPress={handleOpenSignIn}
          >
            <Text style={styles.btnFullStartText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  brand: { flexDirection: "row", alignItems: "center" },
  logoSquare: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  brandTitle: { fontSize: 18, fontWeight: "700", color: "#0F172A" },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  btnHeaderStart: {
    backgroundColor: "#4F46E5",
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnHeaderStartText: { color: "#ffffff", fontSize: 14, fontWeight: "600" },
  btnClose: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  menuBody: { paddingHorizontal: 24, paddingTop: 20 },
  menuLink: { paddingVertical: 14 },
  menuLinkText: { fontSize: 16, color: "#475569", fontWeight: "500" },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 10 },
  btnFullStart: {
    backgroundColor: "#4F46E5",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  btnFullStartText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
});
