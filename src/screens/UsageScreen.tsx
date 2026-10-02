import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Menu,
  Sparkles,
  Bell,
  ChevronLeft,
  MessageSquare,
  GitBranch,
  FolderGit2,
  FileText,
  FileCheck2,
  Briefcase,
  HelpCircle,
} from "lucide-react-native";
import { DashboardSidebar } from "../components/DashboardSidebar";
import {
  UserData,
  getBillingUsageApi,
  BillingUsageData,
  UsageItemData,
} from "../services/authService";

interface UsageScreenProps {
  user: UserData | null;
  onLogout: () => void;
  onNavigateToSubscription?: () => void;
  onNavigateToDashboard?: () => void;
}

export const UsageScreen: React.FC<UsageScreenProps> = ({
  user,
  onLogout,
  onNavigateToSubscription,
  onNavigateToDashboard,
}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [usageData, setUsageData] = useState<BillingUsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsage = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        const res = await getBillingUsageApi(token);
        if (res.success && res.data) {
          setUsageData(res.data);
        }
      }
    } catch (error) {
      console.error("Lỗi lấy dữ liệu usage:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsage();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsage();
  };

  // Format ngày: Oct 2, 2026
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Ánh xạ thông tin giao diện theo featureCode
  const getFeatureMeta = (code: string) => {
    switch (code) {
      case "AI_CHAT":
        return {
          title: "AI Mentor chat",
          description: "Messages with your AI mentor",
          Icon: MessageSquare,
        };
      case "SKILL_TREE_GENERATION":
        return {
          title: "Skill tree generation",
          description: "New skill tree analyses",
          Icon: GitBranch,
        };
      case "GITHUB_SYNC":
        return {
          title: "GitHub sync",
          description: "Profile syncs from GitHub",
          Icon: FolderGit2,
        };
      case "PDF_REPORT":
        return {
          title: "PDF report",
          description: "Exported analysis reports",
          Icon: FileText,
        };
      case "RESUME_REVIEW":
        return {
          title: "Resume review",
          description: "AI resume reviews",
          Icon: FileCheck2,
        };
      case "JOB_MATCHING":
        return {
          title: "Job matching",
          description: "Personalized job matches",
          Icon: Briefcase,
        };
      default:
        return {
          title: code,
          description: "Feature limit and usage",
          Icon: HelpCircle,
        };
    }
  };

  // Tính tổng
  const items: UsageItemData[] = usageData?.usage || [];
  const totalQuota = items.reduce((acc, cur) => acc + cur.limit, 0);
  const totalUsed = items.reduce((acc, cur) => acc + cur.usage, 0);
  const totalRemaining = items.reduce((acc, cur) => acc + cur.remaining, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* SIDEBAR DRAWER */}
      <DashboardSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onLogout={onLogout}
        onNavigateToSubscription={onNavigateToSubscription}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToUsage={() => setSidebarVisible(false)}
      />

      {/* TOP HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setSidebarVisible(true)}
            activeOpacity={0.7}
          >
            <Menu size={22} color="#1E293B" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerLogo}
            onPress={onNavigateToDashboard}
            activeOpacity={0.8}
          >
            <Sparkles size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Bell size={22} color="#1E293B" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.avatarWrap} activeOpacity={0.8}>
            <Text style={styles.avatarLetter}>
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "N"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MAIN BODY */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#4F46E5"]}
            />
          }
        >
          {/* TOP BACK & PLAN BADGE */}
          <View style={styles.navSubRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={onNavigateToSubscription}
              activeOpacity={0.7}
            >
              <ChevronLeft size={18} color="#64748B" />
              <Text style={styles.backButtonText}>Subscription</Text>
            </TouchableOpacity>

            <View style={styles.planPill}>
              <Text style={styles.planPillText}>
                {usageData?.planCode || "PREMIUM"}
              </Text>
            </View>
          </View>

          {/* PAGE TITLE */}
          <Text style={styles.pageTitle}>Billing usage</Text>
          <Text style={styles.pageSubtitle}>
            Track how you use your{" "}
            <Text style={styles.boldText}>
              {usageData?.planCode === "PREMIUM"
                ? "Premium"
                : usageData?.planCode}
            </Text>{" "}
            plan allowances.
          </Text>

          {/* 3 SUMMARY METRIC CARDS */}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total quota</Text>
            <Text style={styles.metricValue}>{totalQuota}</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Used this cycle</Text>
            <Text style={styles.metricValue}>{totalUsed}</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Remaining</Text>
            <Text style={styles.metricValue}>{totalRemaining}</Text>
          </View>

          {/* DETAILED USAGE CARDS */}
          {items.map((item, index) => {
            const meta = getFeatureMeta(item.featureCode);
            const IconComp = meta.Icon;
            const progressPercent =
              item.limit > 0 ? (item.usage / item.limit) * 100 : 0;
            const badgeLabel =
              item.usageWindow === "DAILY" ? "Daily" : "Monthly";

            return (
              <View key={index} style={styles.itemCard}>
                <View style={styles.itemCardTop}>
                  <View style={styles.itemLeftWrap}>
                    <View style={styles.iconBox}>
                      <IconComp size={18} color="#64748B" />
                    </View>
                    <View>
                      <Text style={styles.itemTitle}>{meta.title}</Text>
                      <Text style={styles.itemSubtitle}>
                        {meta.description}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.frequencyBadge}>
                    <Text style={styles.frequencyBadgeText}>{badgeLabel}</Text>
                  </View>
                </View>

                <View style={styles.itemCountRow}>
                  <Text style={styles.usedCountText}>
                    {item.usage} of {item.limit} used
                  </Text>
                  <Text style={styles.remainingCountText}>
                    {item.remaining} remaining
                  </Text>
                </View>

                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${progressPercent}%` },
                    ]}
                  />
                </View>

                <Text style={styles.cycleText}>
                  Cycle started {formatDate(item.usageDate)}
                </Text>
              </View>
            );
          })}

          {/* NEED MORE USAGE BANNER */}
          <View style={styles.needMoreCard}>
            <Text style={styles.needMoreTitle}>Need more usage?</Text>
            <Text style={styles.needMoreDesc}>
              Upgrade your plan for higher limits on every feature.
            </Text>
            <TouchableOpacity
              style={styles.btnViewPlans}
              activeOpacity={0.85}
              onPress={onNavigateToSubscription}
            >
              <Text style={styles.btnViewPlansText}>View plans</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    backgroundColor: "#ffffff",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    padding: 6,
  },
  headerLogo: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0EA5E9",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
  },
  scroll: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  navSubRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  backButtonText: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
  planPill: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  planPillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4F46E5",
    letterSpacing: 0.5,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "700",
    color: "#0F172A",
  },
  metricCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
  },
  metricLabel: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
  },
  itemCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
  },
  itemCardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  itemLeftWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 12,
    color: "#64748B",
  },
  frequencyBadge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  frequencyBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  itemCountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  usedCountText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  remainingCountText: {
    fontSize: 13,
    color: "#64748B",
  },
  progressTrack: {
    height: 6,
    backgroundColor: "#F1F5F9",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4F46E5",
    borderRadius: 3,
  },
  cycleText: {
    fontSize: 12,
    color: "#94A3B8",
  },
  needMoreCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 22,
    marginTop: 6,
  },
  needMoreTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  needMoreDesc: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
    marginBottom: 16,
  },
  btnViewPlans: {
    backgroundColor: "#4F46E5",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
  btnViewPlansText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
});
