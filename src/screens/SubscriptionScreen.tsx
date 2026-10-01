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
  Check,
  CreditCard,
  FileText,
} from "lucide-react-native";
import { DashboardSidebar } from "../components/DashboardSidebar";
import {
  UserData,
  getBillingPlansApi,
  getMySubscriptionApi,
  PlanItem,
  MySubscriptionData,
} from "../services/authService";

interface SubscriptionScreenProps {
  user: UserData | null;
  onLogout: () => void;
  onNavigateToDashboard?: () => void;
}

export const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({
  user,
  onLogout,
  onNavigateToDashboard,
}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [mySubscription, setMySubscription] =
    useState<MySubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSubscriptionData = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        const [plansRes, mySubRes] = await Promise.all([
          getBillingPlansApi(token),
          getMySubscriptionApi(token),
        ]);

        if (plansRes.success && plansRes.data) {
          setPlans(plansRes.data);
        }
        if (mySubRes.success && mySubRes.data) {
          setMySubscription(mySubRes.data);
        }
      }
    } catch (error) {
      console.error("Lỗi lấy dữ liệu gói đăng ký:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchSubscriptionData();
  };

  // Format ngày dạng: Oct 25, 2027
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const currentPlanCode = mySubscription?.planCode || "FREE";

  const renderPlanFeatureBullets = (plan: PlanItem) => {
    const list: string[] = [];
    list.push(
      plan.features.skillTree === "FULL"
        ? "Full skill tree"
        : "Basic skill tree",
    );
    list.push(
      plan.limits.aiChatPerDay >= 100
        ? "Unlimited AI mentor"
        : `${plan.limits.aiChatPerDay} AI chats/day`,
    );
    if (plan.features.publicCourses) list.push("Public courses");
    if (plan.features.jobMatching) list.push("Job matching");
    if (plan.features.resumeReview) list.push("Resume review");
    if (plan.features.priorityAiAnalysis) list.push("Priority AI Analysis");
    if (plan.features.prioritySupport) {
      list.push("Priority support");
    } else if (plan.features.communitySupport) {
      list.push("Community support");
    }
    return list;
  };

  const freePlan = plans.find((p) => p.code === "FREE");

  const comparisonRows = [
    {
      feature: "AI mentor chats",
      value: freePlan ? `${freePlan.limits.aiChatPerDay}/day` : "5/day",
    },
    {
      feature: "Skill tree",
      value: freePlan
        ? `Basic · up to ${freePlan.limits.skillTreeMaxNodes} nodes`
        : "Basic · up to 12 nodes",
    },
    {
      feature: "Skill tree generation",
      value: freePlan
        ? `${freePlan.limits.skillTreeGenerationsPerMonth}/month`
        : "1/month",
    },
    {
      feature: "Job matching",
      value: freePlan?.features.jobMatching ? "Yes" : "—",
    },
    {
      feature: "Resume review",
      value: freePlan?.features.resumeReview ? "Yes" : "—",
    },
    {
      feature: "PDF export",
      value: freePlan?.features.pdfReport ? "Yes" : "—",
    },
    {
      feature: "GitHub sync",
      value: freePlan
        ? `${freePlan.limits.githubSyncPerWeek}/week · up to ${freePlan.limits.githubMaxRepositoriesPerSync} repos`
        : "2/week · up to 5 repos",
    },
    {
      feature: "Priority AI Analysis",
      value: freePlan?.features.priorityAiAnalysis ? "Yes" : "—",
    },
    {
      feature: "Hide EduMap branding",
      value: freePlan?.features.hideEduMapBranding ? "Yes" : "—",
    },
    {
      feature: "Support",
      value: freePlan?.features.prioritySupport ? "Priority" : "Community",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <DashboardSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onLogout={onLogout}
        onNavigateToDashboard={onNavigateToDashboard}
      />

      {/* HEADER */}
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
          {/* TITLE SECTION TỰ ĐỘNG THEO DỮ LIỆU THẬT */}
          <Text style={styles.pageTitle}>Subscription</Text>
          <Text style={styles.pageSubtitle}>
            You're on{" "}
            <Text style={styles.boldText}>
              {mySubscription?.planName || "Free"}
            </Text>
            {mySubscription?.expiresAt
              ? `. Renews on ${formatDate(mySubscription.expiresAt)}.`
              : "."}
          </Text>

          {/* DANH SÁCH CÁC GÓI CƯỚC */}
          {plans.map((plan) => {
            const isCurrent = plan.code === currentPlanCode;
            const isPro = plan.code === "PRO_STUDENT";
            const bulletFeatures = renderPlanFeatureBullets(plan);
            const periodText = plan.durationDays === 365 ? "/year" : "/month";

            return (
              <View
                key={plan.id}
                style={[
                  styles.planCard,
                  isPro && styles.proCardBorder,
                  isCurrent && styles.premiumCardBorder,
                ]}
              >
                {isPro && !isCurrent && (
                  <View style={styles.badgePill}>
                    <Text style={styles.badgePillText}>Most popular</Text>
                  </View>
                )}

                {isCurrent && (
                  <View style={styles.badgeCurrentPill}>
                    <Text style={styles.badgeCurrentText}>Current plan</Text>
                  </View>
                )}

                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planDesc}>{plan.description}</Text>

                <View style={styles.priceRow}>
                  <Text style={styles.priceAmount}>
                    {plan.priceVnd.toLocaleString("vi-VN")}₫
                  </Text>
                  <Text style={styles.pricePeriod}>{periodText}</Text>
                </View>

                {isCurrent ? (
                  <View style={styles.btnDisabled}>
                    <Text style={styles.btnDisabledText}>Current plan</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.btnAction}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.btnActionText}>
                      {plan.priceVnd === 0 ? "Downgrade" : "Upgrade"}
                    </Text>
                  </TouchableOpacity>
                )}

                <View style={styles.featureList}>
                  {bulletFeatures.map((item, idx) => (
                    <View key={idx} style={styles.featureItem}>
                      <Check size={16} color="#6366F1" />
                      <Text style={styles.featureItemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}

          {/* FEATURE COMPARISON */}
          <View style={styles.tableCard}>
            <Text style={styles.tableTitle}>Feature comparison</Text>

            <View style={styles.tableHeaderRow}>
              <Text style={styles.colHeaderLabel}>Feature</Text>
              <View style={styles.colHeaderRight}>
                <Text style={styles.colHeaderPlan}>Free</Text>
                <Text style={styles.colHeaderSub}>0₫/month</Text>
              </View>
            </View>

            {comparisonRows.map((row, index) => (
              <View
                key={index}
                style={[
                  styles.tableRow,
                  index === comparisonRows.length - 1 && {
                    borderBottomWidth: 0,
                  },
                ]}
              >
                <Text style={styles.rowFeatureName}>{row.feature}</Text>
                <Text style={styles.rowFeatureValue}>{row.value}</Text>
              </View>
            ))}
          </View>

          {/* PAYMENT METHOD */}
          <View style={styles.infoCard}>
            <View style={styles.infoCardHeader}>
              <CreditCard size={18} color="#64748B" />
              <Text style={styles.infoCardTitle}>Payment method</Text>
            </View>
            <Text style={styles.infoCardContent}>
              Paid via SePay (bank transfer / QR).
            </Text>
          </View>

          {/* BILLING HISTORY HIỂN THỊ DỮ LIỆU TỪ LATESTPAYMENT */}
          <View style={styles.infoCard}>
            <View style={styles.infoCardHeader}>
              <FileText size={18} color="#64748B" />
              <Text style={styles.infoCardTitle}>Billing history</Text>
            </View>
            {mySubscription?.latestPayment ? (
              <>
                <Text style={styles.billingOrder}>
                  Order{" "}
                  <Text style={styles.boldText}>
                    {mySubscription.latestPayment.orderCode}
                  </Text>{" "}
                  ·{" "}
                  {mySubscription.latestPayment.amountVnd.toLocaleString(
                    "vi-VN",
                  )}
                  ₫
                </Text>
                <Text style={styles.billingDate}>
                  {mySubscription.latestPayment.status} ·{" "}
                  {formatDate(mySubscription.latestPayment.paidAt)}
                </Text>
              </>
            ) : (
              <Text style={styles.billingDate}>
                No billing history available.
              </Text>
            )}
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
    paddingTop: 24,
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
    marginBottom: 24,
  },
  boldText: {
    fontWeight: "700",
    color: "#0F172A",
  },
  planCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    position: "relative",
  },
  proCardBorder: {
    borderColor: "#C7D2FE",
  },
  premiumCardBorder: {
    borderColor: "#334155",
  },
  badgePill: {
    position: "absolute",
    top: -12,
    left: 24,
    backgroundColor: "#4F46E5",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgePillText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
  },
  badgeCurrentPill: {
    position: "absolute",
    top: -12,
    left: 24,
    backgroundColor: "#0F172A",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeCurrentText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
  },
  planName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  planDesc: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
    marginBottom: 18,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 18,
  },
  priceAmount: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
  },
  pricePeriod: {
    fontSize: 14,
    color: "#64748B",
    marginLeft: 4,
  },
  btnAction: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  btnActionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  btnDisabled: {
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  btnDisabledText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#94A3B8",
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureItemText: {
    fontSize: 14,
    color: "#475569",
  },
  tableCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 16,
  },
  tableHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  colHeaderLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#94A3B8",
  },
  colHeaderRight: {
    alignItems: "flex-end",
  },
  colHeaderPlan: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  colHeaderSub: {
    fontSize: 11,
    color: "#94A3B8",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
  },
  rowFeatureName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
    flex: 1,
  },
  rowFeatureValue: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "right",
  },
  infoCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  infoCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  infoCardContent: {
    fontSize: 13,
    color: "#64748B",
  },
  billingOrder: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 4,
  },
  billingDate: {
    fontSize: 12,
    color: "#94A3B8",
  },
});
