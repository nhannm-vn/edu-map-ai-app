import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import {
  X,
  LayoutGrid,
  MessageSquare,
  UploadCloud,
  GitBranch,
  BookOpen,
  Clock,
  Briefcase,
  User,
  Bell,
  Award,
  Activity,
  Settings,
  LogOut,
  FolderClosed,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface DashboardSidebarProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
  onNavigateToSubscription?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToUsage?: () => void; // <-- Thêm prop này
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  visible,
  onClose,
  onLogout,
  onNavigateToSubscription,
  onNavigateToDashboard,
  onNavigateToUsage, // <-- Thêm prop này
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <SafeAreaView style={styles.sidebarContainer}>
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>MENU</Text>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.menuScroll}
            contentContainerStyle={styles.menuScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* WORKSPACE */}
            <Text style={styles.groupLabel}>Workspace</Text>
            <TouchableOpacity
              style={[styles.menuItem, styles.menuItemActive]}
              onPress={() => {
                onClose();
                if (onNavigateToDashboard) onNavigateToDashboard();
              }}
            >
              <LayoutGrid size={18} color="#0F172A" />
              <Text style={[styles.menuItemText, styles.menuItemTextActive]}>
                Dashboard
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <MessageSquare size={18} color="#64748B" />
              <Text style={styles.menuItemText}>AI Mentor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <UploadCloud size={18} color="#64748B" />
              <Text style={styles.menuItemText}>Upload & Analyze</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <GitBranch size={18} color="#64748B" />
              <Text style={styles.menuItemText}>Skill Tree</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <BookOpen size={18} color="#64748B" />
              <Text style={styles.menuItemText}>Resources</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Clock size={18} color="#64748B" />
              <Text style={styles.menuItemText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <FolderClosed size={18} color="#64748B" />
              <Text style={styles.menuItemText}>Portfolio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Briefcase size={18} color="#64748B" />
              <Text style={styles.menuItemText}>Jobs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <User size={18} color="#64748B" />
              <Text style={styles.menuItemText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Bell size={18} color="#64748B" />
              <Text style={styles.menuItemText}>Notifications</Text>
              <View style={styles.badgeCount}>
                <Text style={styles.badgeCountText}>7</Text>
              </View>
            </TouchableOpacity>
            {/* ACCOUNT */}
            <Text style={[styles.groupLabel, { marginTop: 24 }]}>Account</Text>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                if (onNavigateToSubscription) onNavigateToSubscription();
              }}
            >
              <Award size={18} color="#64748B" />
              <Text style={styles.menuItemText}>Subscription</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                if (onNavigateToUsage) onNavigateToUsage();
              }}
            >
              <Activity size={18} color="#64748B" />
              <Text style={styles.menuItemText}>Usage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Settings size={18} color="#64748B" />
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
            {/* UPGRADE PRO BOX */}
            <View style={styles.upgradeCard}>
              <Text style={styles.upgradeTitle}>Upgrade to Pro</Text>
              <Text style={styles.upgradeDesc}>
                Unlimited AI mentor and analytics.
              </Text>
              <TouchableOpacity
                style={styles.btnUpgrade}
                activeOpacity={0.85}
                onPress={() => {
                  onClose();
                  if (onNavigateToSubscription) onNavigateToSubscription();
                }}
              >
                <Text style={styles.btnUpgradeText}>Upgrade</Text>
              </TouchableOpacity>
            </View>
            {/* SIGN OUT */}
            <TouchableOpacity
              style={styles.signOutItem}
              onPress={() => {
                onClose();
                onLogout();
              }}
              activeOpacity={0.7}
            >
              <LogOut size={18} color="#475569" />
              <Text style={styles.signOutText}>Sign out</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(15, 23, 42, 0.4)",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  sidebarContainer: {
    width: "72%",
    maxWidth: 300,
    backgroundColor: "#ffffff",
    height: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 4, height: 0 },
    shadowRadius: 10,
    elevation: 8,
  },
  sidebarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  sidebarTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 0.8,
  },
  menuScroll: {
    flex: 1,
  },
  menuScrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  groupLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94A3B8",
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  menuItemActive: {
    backgroundColor: "#F1F5F9",
  },
  menuItemText: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
    flex: 1,
  },
  menuItemTextActive: {
    color: "#0F172A",
    fontWeight: "600",
  },
  badgeCount: {
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  badgeCountText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
  },
  upgradeCard: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  upgradeTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  upgradeDesc: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 16,
    marginBottom: 14,
  },
  btnUpgrade: {
    backgroundColor: "#4F46E5",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  btnUpgradeText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  signOutItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  signOutText: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
  },
});
