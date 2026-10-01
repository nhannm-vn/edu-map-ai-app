import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Sparkles,
  LogOut,
  User,
  Award,
  BookOpen,
  CheckCircle,
} from "lucide-react-native";
import { UserData } from "../services/authService";

interface DashboardScreenProps {
  user: UserData | null;
  onLogout: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  onLogout,
}) => {
  return (
    <View style={styles.screen}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.brand}>
          <View style={styles.logoSquare}>
            <Sparkles size={20} color="#ffffff" />
          </View>
          <Text style={styles.brandTitle}>EduMap AI</Text>
        </View>

        <TouchableOpacity
          style={styles.btnLogout}
          onPress={onLogout}
          activeOpacity={0.8}
        >
          <LogOut size={18} color="#EF4444" />
          <Text style={styles.btnLogoutText}>Log out</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarText}>
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.fullName || "Học viên"}</Text>
            <Text style={styles.userEmail}>
              {user?.email || "email@example.com"}
            </Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{user?.role || "STUDENT"}</Text>
            </View>
          </View>
        </View>

        {/* Quick Stat Highlights */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Overview</Text>
        </View>

        <View style={styles.statGrid}>
          <View style={styles.statBox}>
            <BookOpen size={22} color="#4F46E5" />
            <Text style={styles.statNum}>47/120</Text>
            <Text style={styles.statLabel}>Skill Nodes</Text>
          </View>

          <View style={styles.statBox}>
            <Award size={22} color="#10B981" />
            <Text style={styles.statNum}>87</Text>
            <Text style={styles.statLabel}>Career Score</Text>
          </View>

          <View style={styles.statBox}>
            <CheckCircle size={22} color="#3B82F6" />
            <Text style={styles.statNum}>94%</Text>
            <Text style={styles.statLabel}>Job Match</Text>
          </View>

          <View style={styles.statBox}>
            <User size={22} color="#F59E0B" />
            <Text style={styles.statNum}>AI Mentor</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
        </View>

        {/* Welcome message */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Ready to start your roadmap?</Text>
          <Text style={styles.bannerDesc}>
            EduMap AI is ready to assess your skill gaps and prepare
            personalized interview prep.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FAFAFA" },
  header: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  brand: { flexDirection: "row", alignItems: "center" },
  logoSquare: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  brandTitle: { fontSize: 18, fontWeight: "700", color: "#0F172A" },
  btnLogout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#FEF2F2",
  },
  btnLogoutText: { color: "#EF4444", fontSize: 14, fontWeight: "600" },
  container: { padding: 20 },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 24,
  },
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarText: { fontSize: 24, fontWeight: "700", color: "#4F46E5" },
  userInfo: { flex: 1 },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 2,
  },
  userEmail: { fontSize: 13, color: "#64748B", marginBottom: 6 },
  roleBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  roleText: { fontSize: 11, fontWeight: "700", color: "#475569" },
  sectionHeader: { marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#0F172A" },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    width: "48%",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statNum: { fontSize: 20, fontWeight: "800", color: "#0F172A", marginTop: 10 },
  statLabel: { fontSize: 12, color: "#64748B", marginTop: 2 },
  banner: {
    backgroundColor: "#4F46E5",
    padding: 20,
    borderRadius: 16,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 6,
  },
  bannerDesc: { fontSize: 13, color: "#E0E7FF", lineHeight: 18 },
});
