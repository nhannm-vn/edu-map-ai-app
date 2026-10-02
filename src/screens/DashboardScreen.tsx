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
  Tag,
  Clock,
  BookOpen,
  ArrowRight,
  Award,
} from "lucide-react-native";
import {
  UserData,
  getSkillSummaryApi,
  SkillSummaryData,
} from "../services/authService";
import { DashboardSidebar } from "../components/DashboardSidebar";

interface DashboardScreenProps {
  user: UserData | null;
  onLogout: () => void;
  onNavigateToSubscription?: () => void;
  onNavigateToUsage?: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  onLogout,
  onNavigateToSubscription,
  onNavigateToUsage,
}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [summaryData, setSummaryData] = useState<SkillSummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        const res = await getSkillSummaryApi(token);
        if (res.success && res.data) {
          setSummaryData(res.data);
        }
      }
    } catch (error) {
      console.error("Lỗi tải dữ liệu dashboard:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const categories = summaryData?.categoryStats
    ? Object.entries(summaryData.categoryStats)
    : [];
  const maxSkillInCategory = Math.max(
    ...categories.map(([_, count]) => count),
    1,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* SIDEBAR DRAWER */}
      <DashboardSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onLogout={onLogout}
        onNavigateToSubscription={onNavigateToSubscription}
        onNavigateToUsage={onNavigateToUsage}
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

          <View style={styles.headerLogo}>
            <Sparkles size={20} color="#ffffff" />
          </View>
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

      {/* MAIN BODY CONTENT */}
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
          {/* GREETING SECTION */}
          <Text style={styles.welcomeText}>
            Welcome back, {user?.fullName || "Nguyễn Minh Nhân Nè"}
          </Text>
          <Text style={styles.headingTitle}>Your learning overview</Text>
          <Text style={styles.subTitle}>
            A clear summary of the skills and learning time found in your latest
            analysis.
          </Text>

          {/* CTA: RUN NEW ANALYSIS */}
          <TouchableOpacity style={styles.btnAnalysis} activeOpacity={0.85}>
            <Sparkles size={16} color="#ffffff" />
            <Text style={styles.btnAnalysisText}>Run new analysis</Text>
          </TouchableOpacity>

          {/* STAT CARD 1: TOTAL SKILLS */}
          <View style={styles.statCard}>
            <View style={styles.statCardHeader}>
              <Text style={styles.statCardLabel}>Total skills</Text>
              <View
                style={[styles.statIconWrap, { backgroundColor: "#EEF2FF" }]}
              >
                <Tag size={16} color="#4F46E5" />
              </View>
            </View>
            <Text style={styles.statCardValue}>
              {summaryData?.totalSkills ?? 0}
            </Text>
            <Text style={styles.statCardDesc}>
              Skills identified across your profile
            </Text>
          </View>

          {/* STAT CARD 2: TOTAL LEARNING HOURS */}
          <View style={styles.statCard}>
            <View style={styles.statCardHeader}>
              <Text style={styles.statCardLabel}>Total learning hours</Text>
              <View
                style={[styles.statIconWrap, { backgroundColor: "#F1F5F9" }]}
              >
                <Clock size={16} color="#64748B" />
              </View>
            </View>
            <Text style={styles.statCardValue}>
              {summaryData?.totalHours ?? 0}
            </Text>
            <Text style={styles.statCardDesc}>
              Estimated hours from completed learning
            </Text>
          </View>

          {/* TOP SKILLS SECTION */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionCardHeader}>
              <View>
                <Text style={styles.sectionCardTitle}>Top skills</Text>
                <Text style={styles.sectionCardSub}>
                  Your strongest detected capabilities
                </Text>
              </View>
              <BookOpen size={18} color="#64748B" />
            </View>

            {summaryData?.topSkills && summaryData.topSkills.length > 0 ? (
              <View style={styles.skillList}>
                {summaryData.topSkills.map((item) => (
                  <View key={item.id} style={styles.skillItemRow}>
                    <View style={styles.skillInfo}>
                      <Text style={styles.skillItemName}>
                        {item.skill.name}
                      </Text>
                      <Text style={styles.skillItemSub}>
                        {item.skill.category} · {item.hoursSpent} hrs
                      </Text>
                    </View>
                    <View style={styles.badgeLevel}>
                      <Award size={12} color="#4F46E5" />
                      <Text style={styles.badgeLevelText}>
                        Lv.{item.proficiencyLevel}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.dottedEmptyBox}>
                <Text style={styles.emptyTitle}>No skills detected yet.</Text>
                <Text style={styles.emptySub}>
                  Run your first analysis to see them here.
                </Text>
              </View>
            )}

            <TouchableOpacity style={styles.btnSkillTree} activeOpacity={0.8}>
              <Text style={styles.btnSkillTreeText}>View skill tree</Text>
              <ArrowRight size={16} color="#0F172A" />
            </TouchableOpacity>
          </View>

          {/* CATEGORY STATISTICS SECTION */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionCardHeader}>
              <View>
                <Text style={styles.sectionCardTitle}>Category statistics</Text>
                <Text style={styles.sectionCardSub}>
                  Skill distribution by category
                </Text>
              </View>
              <View style={styles.categoryPill}>
                <Text style={styles.categoryPillText}>
                  {categories.length} categories
                </Text>
              </View>
            </View>

            {categories.map(([categoryName, count]) => {
              const percentage = Math.round((count / maxSkillInCategory) * 100);
              return (
                <View key={categoryName} style={styles.progressRow}>
                  <View style={styles.progressLabelWrap}>
                    <Text style={styles.progressTitle}>{categoryName}</Text>
                    <Text style={styles.progressValueText}>
                      {count} {count > 1 ? "skills" : "skill"}
                    </Text>
                  </View>
                  <View style={styles.progressBarTrack}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${percentage}%` },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
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
  welcomeText: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 6,
  },
  headingTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
    marginBottom: 20,
  },
  btnAnalysis: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#4F46E5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 8,
    marginBottom: 24,
  },
  btnAnalysisText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  statCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statCardLabel: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  statIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  statCardValue: {
    fontSize: 36,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },
  statCardDesc: {
    fontSize: 12,
    color: "#64748B",
  },
  sectionCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  sectionCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 2,
  },
  sectionCardSub: {
    fontSize: 12,
    color: "#64748B",
  },
  skillList: {
    gap: 10,
    marginBottom: 16,
  },
  skillItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 10,
  },
  skillInfo: {
    flex: 1,
  },
  skillItemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  skillItemSub: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  badgeLevel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeLevelText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4F46E5",
  },
  dottedEmptyBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
  },
  btnSkillTree: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
  },
  btnSkillTreeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  categoryPill: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  categoryPillText: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "500",
  },
  progressRow: {
    marginTop: 14,
  },
  progressLabelWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
  },
  progressValueText: {
    fontSize: 12,
    color: "#64748B",
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: "#EEF2FF",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4F46E5",
    borderRadius: 3,
  },
});
