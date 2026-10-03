import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Menu,
  Sparkles,
  Bell,
  BookOpen,
  Layers,
  ChevronDown,
  FileText,
  Plus,
  Trash2,
} from "lucide-react-native";
// Sử dụng icon GitHub SVG hoặc icon sẵn có
import { DashboardSidebar } from "../components/DashboardSidebar";
import { UserData } from "../services/authService";

type AnalysisMode = "ACADEMIC" | "GITHUB" | "HYBRID";

interface CourseItem {
  id: string;
  name: string;
  grade: string;
}

interface UploadAnalyzeScreenProps {
  user: UserData | null;
  onLogout: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToSubscription?: () => void;
  onNavigateToUsage?: () => void;
  onNavigateToChat?: () => void;
}

export const UploadAnalyzeScreen: React.FC<UploadAnalyzeScreenProps> = ({
  user,
  onLogout,
  onNavigateToDashboard,
  onNavigateToSubscription,
  onNavigateToUsage,
  onNavigateToChat,
}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedMode, setSelectedMode] = useState<AnalysisMode>("HYBRID");

  // Form states
  const [targetRole, setTargetRole] = useState("Backend Developer");
  const [universityName, setUniversityName] = useState("Đại học Bách Khoa");
  const [currentYear, setCurrentYear] = useState("3");
  const [githubUsername, setGithubUsername] = useState("github.com/octocat");

  const [courses, setCourses] = useState<CourseItem[]>([
    { id: "1", name: "Cơ sở dữ liệu", grade: "A" },
  ]);

  const handleAddCourse = () => {
    const newCourse: CourseItem = {
      id: Date.now().toString(),
      name: "",
      grade: "A",
    };
    setCourses([...courses, newCourse]);
  };

  const handleRemoveCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const handleCourseNameChange = (id: string, text: string) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, name: text } : c)));
  };

  // Xác định text tóm tắt ở thanh Bottom Bar
  const getBottomSummaryText = () => {
    if (selectedMode === "ACADEMIC") {
      return `Academic Only · ${courses.length} course${courses.length > 1 ? "s" : ""}`;
    }
    if (selectedMode === "GITHUB") {
      return "GitHub Only";
    }
    return `Hybrid · ${courses.length} course${courses.length > 1 ? "s" : ""}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* SIDEBAR DRAWER */}
      <DashboardSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onLogout={onLogout}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToSubscription={onNavigateToSubscription}
        onNavigateToUsage={onNavigateToUsage}
        onNavigateToChat={onNavigateToChat}
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
          <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
            <Bell size={22} color="#1E293B" />
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeText}>1</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.avatarWrap} activeOpacity={0.8}>
            <Text style={styles.avatarLetter}>
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "N"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MAIN SCROLL CONTENT */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* TITLE & DESCRIPTION */}
          <Text style={styles.pageTitle}>Upload & Analyze</Text>
          <Text style={styles.pageSubtitle}>
            Choose an analysis mode and give the AI everything it needs to build
            your career map.
          </Text>

          {/* MODE SELECTION CARDS */}
          {/* 1. Academic Only */}
          <TouchableOpacity
            style={[
              styles.modeCard,
              selectedMode === "ACADEMIC" && styles.modeCardSelected,
            ]}
            onPress={() => setSelectedMode("ACADEMIC")}
            activeOpacity={0.85}
          >
            <View style={[styles.modeIconBox, { backgroundColor: "#4F46E5" }]}>
              <BookOpen size={20} color="#ffffff" />
            </View>
            <Text style={styles.modeCardTitle}>Academic Only</Text>
            <Text style={styles.modeCardSub}>Transcript & grades</Text>
          </TouchableOpacity>

          {/* 2. GitHub Only */}
          <TouchableOpacity
            style={[
              styles.modeCard,
              selectedMode === "GITHUB" && styles.modeCardSelected,
            ]}
            onPress={() => setSelectedMode("GITHUB")}
            activeOpacity={0.85}
          >
            <View
              style={[
                styles.modeIconBox,
                selectedMode === "GITHUB"
                  ? { backgroundColor: "#4F46E5" }
                  : { backgroundColor: "#F1F5F9" },
              ]}
            >
              <Text
                style={[
                  styles.githubIconText,
                  selectedMode === "GITHUB"
                    ? { color: "#ffffff" }
                    : { color: "#334155" },
                ]}
              >
                ⌥
              </Text>
            </View>
            <Text style={styles.modeCardTitle}>GitHub Only</Text>
            <Text style={styles.modeCardSub}>Repos & activity</Text>
          </TouchableOpacity>

          {/* 3. Hybrid */}
          <TouchableOpacity
            style={[
              styles.modeCard,
              selectedMode === "HYBRID" && styles.modeCardSelected,
            ]}
            onPress={() => setSelectedMode("HYBRID")}
            activeOpacity={0.85}
          >
            <View style={styles.hybridHeaderRow}>
              <View
                style={[
                  styles.modeIconBox,
                  selectedMode === "HYBRID"
                    ? { backgroundColor: "#4F46E5" }
                    : { backgroundColor: "#F1F5F9" },
                ]}
              >
                <Layers
                  size={20}
                  color={selectedMode === "HYBRID" ? "#ffffff" : "#64748B"}
                />
              </View>
              <View style={styles.recommendedPill}>
                <Text style={styles.recommendedText}>Recommended</Text>
              </View>
            </View>
            <Text style={styles.modeCardTitle}>Hybrid</Text>
            <Text style={styles.modeCardSub}>Transcript + repos</Text>
          </TouchableOpacity>

          {/* INPUT FORMS CONTAINER */}
          <View style={styles.formContainer}>
            {/* Target Role Dropdown Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Target role</Text>
              <TouchableOpacity style={styles.selectBox} activeOpacity={0.8}>
                <Text style={styles.selectBoxValue}>{targetRole}</Text>
                <ChevronDown size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* SECTION 1: ACADEMIC TRANSCRIPT (HIỂN THỊ KHI CHỌN ACADEMIC HOẶC HYBRID) */}
            {(selectedMode === "ACADEMIC" || selectedMode === "HYBRID") && (
              <View style={styles.subSection}>
                <View style={styles.subSectionHeader}>
                  <View style={styles.subSectionTitleWrap}>
                    <FileText size={18} color="#475569" />
                    <Text style={styles.subSectionTitle}>
                      Academic transcript
                    </Text>
                  </View>
                  <View style={styles.codeTag}>
                    <Text style={styles.codeTagText}>academicForm</Text>
                  </View>
                </View>

                {/* University Name */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>University name</Text>
                  <TextInput
                    style={styles.inputBox}
                    value={universityName}
                    onChangeText={setUniversityName}
                    placeholder="Nhập tên trường..."
                    placeholderTextColor="#94A3B8"
                  />
                </View>

                {/* Current Year */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Current year</Text>
                  <TouchableOpacity
                    style={styles.selectBox}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.selectBoxValue}>{currentYear}</Text>
                    <ChevronDown size={18} color="#64748B" />
                  </TouchableOpacity>
                </View>

                {/* Core courses & grades */}
                <View style={styles.fieldGroup}>
                  <View style={styles.coursesHeaderRow}>
                    <Text style={styles.fieldLabel}>Core courses & grades</Text>
                    <TouchableOpacity
                      style={styles.btnAddCourse}
                      onPress={handleAddCourse}
                      activeOpacity={0.8}
                    >
                      <Plus size={16} color="#0F172A" />
                      <Text style={styles.btnAddCourseText}>Add course</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Course Items List */}
                  {courses.map((course) => (
                    <View key={course.id} style={styles.courseRow}>
                      <TextInput
                        style={[styles.inputBox, { flex: 1 }]}
                        value={course.name}
                        onChangeText={(txt) =>
                          handleCourseNameChange(course.id, txt)
                        }
                        placeholder="Tên môn học"
                        placeholderTextColor="#94A3B8"
                      />
                      <TouchableOpacity
                        style={styles.gradeSelectBox}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.gradeValue}>{course.grade}</Text>
                        <ChevronDown size={16} color="#64748B" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btnDeleteCourse}
                        onPress={() => handleRemoveCourse(course.id)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <Trash2 size={18} color="#CBD5E1" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* SECTION 2: GITHUB PROFILE (HIỂN THỊ KHI CHỌN GITHUB HOẶC HYBRID) */}
            {(selectedMode === "GITHUB" || selectedMode === "HYBRID") && (
              <View style={styles.subSection}>
                <View style={styles.subSectionHeader}>
                  <View style={styles.subSectionTitleWrap}>
                    <Text style={{ fontSize: 18, color: "#334155" }}>⌥</Text>
                    <Text style={styles.subSectionTitle}>GitHub profile</Text>
                  </View>
                  <View style={styles.codeTag}>
                    <Text style={styles.codeTagText}>githubUsername</Text>
                  </View>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>GitHub username</Text>
                  <TextInput
                    style={styles.inputBox}
                    value={githubUsername}
                    onChangeText={setGithubUsername}
                    placeholder="github.com/username"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="none"
                  />
                  <Text style={styles.fieldHelper}>
                    We scan your top repos, languages and contribution activity.
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* STICKY BOTTOM ACTION BAR */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomSummaryText}>{getBottomSummaryText()}</Text>
        <TouchableOpacity style={styles.btnStartAnalysis} activeOpacity={0.85}>
          <Sparkles size={16} color="#ffffff" />
          <Text style={styles.btnStartAnalysisText}>Start AI analysis</Text>
        </TouchableOpacity>
      </View>
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
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  iconButton: { padding: 6 },
  headerLogo: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  bellButton: { position: "relative", padding: 6 },
  bellBadge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "#4F46E5",
    borderRadius: 9,
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  bellBadgeText: { color: "#ffffff", fontSize: 10, fontWeight: "700" },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0EA5E9",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: { color: "#ffffff", fontSize: 16, fontWeight: "700" },

  scroll: { flex: 1, backgroundColor: "#FAFAFA" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 24 },
  pageTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
    marginBottom: 24,
  },

  /* MODE CARDS */
  modeCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  modeCardSelected: {
    borderWidth: 2,
    borderColor: "#0F172A",
    backgroundColor: "#F8FAFC",
  },
  modeIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  githubIconText: { fontSize: 24, fontWeight: "700" },
  hybridHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  recommendedPill: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  recommendedText: { fontSize: 12, color: "#64748B", fontWeight: "500" },
  modeCardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  modeCardSub: { fontSize: 13, color: "#64748B" },

  /* FORM CONTAINER */
  formContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 20,
    padding: 20,
    marginTop: 8,
  },
  fieldGroup: { marginBottom: 20 },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  selectBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: "#ffffff",
  },
  selectBoxValue: { fontSize: 15, color: "#0F172A" },
  inputBox: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 15,
    color: "#0F172A",
    backgroundColor: "#ffffff",
  },
  fieldHelper: { fontSize: 12, color: "#64748B", marginTop: 8, lineHeight: 16 },

  /* SUB-SECTIONS */
  subSection: {
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 20,
    marginTop: 6,
  },
  subSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  subSectionTitleWrap: { flexDirection: "row", alignItems: "center", gap: 8 },
  subSectionTitle: { fontSize: 15, fontWeight: "700", color: "#0F172A" },
  codeTag: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  codeTagText: {
    fontSize: 11,
    color: "#64748B",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },

  /* COURSES LIST */
  coursesHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  btnAddCourse: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  btnAddCourseText: { fontSize: 13, fontWeight: "600", color: "#0F172A" },
  courseRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  gradeSelectBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    width: 76,
    backgroundColor: "#ffffff",
  },
  gradeValue: { fontSize: 15, fontWeight: "600", color: "#0F172A" },
  btnDeleteCourse: { padding: 6 },

  /* BOTTOM STICKY BAR */
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  bottomSummaryText: { fontSize: 14, color: "#64748B", fontWeight: "500" },
  btnStartAnalysis: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    gap: 8,
  },
  btnStartAnalysisText: { color: "#ffffff", fontSize: 14, fontWeight: "600" },
});
