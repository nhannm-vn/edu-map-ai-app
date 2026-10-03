import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Menu,
  Sparkles,
  Bell,
  MessageSquare,
  Plus,
  ArrowLeft,
  Trash2,
  Send,
  X,
} from "lucide-react-native";
import { DashboardSidebar } from "../components/DashboardSidebar";
import {
  UserData,
  ChatSessionDto,
  getChatSessionsApi,
  getChatSessionDetailApi,
  createChatSessionApi,
  sendChatMessageApi,
  deleteChatSessionApi,
} from "../services/apiService";
import { SafeAreaView } from "react-native-safe-area-context";

interface ChatAiScreenProps {
  user: UserData | null;
  onLogout: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToSubscription?: () => void;
  onNavigateToUsage?: () => void;
}

export const ChatAiScreen: React.FC<ChatAiScreenProps> = ({
  user,
  onLogout,
  onNavigateToDashboard,
  onNavigateToSubscription,
  onNavigateToUsage,
}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [modalNewChatVisible, setModalNewChatVisible] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("Tư vấn lộ trình của bạn");

  // API States
  const [sessions, setSessions] = useState<ChatSessionDto[]>([]);
  const [activeSession, setActiveSession] = useState<ChatSessionDto | null>(
    null,
  );
  const [inputMessage, setInputMessage] = useState("");

  // Loading States
  const [loadingList, setLoadingList] = useState(false);
  const [loadingSession, setLoadingSession] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const quickPrompts = [
    "Analyze my GitHub and suggest projects",
    "Build me a 12-week ML roadmap",
    "Review my CV for FAANG roles",
    "What skill should I learn next?",
  ];

  // 1. Lấy danh sách phiên chat
  const fetchSessionsList = async () => {
    setLoadingList(true);
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        const res = await getChatSessionsApi(token);
        if (res.success && res.data) {
          setSessions(res.data);
        }
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách chat:", error);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchSessionsList();
  }, []);

  // 2. Mở một phiên chat (Lấy chi tiết)
  const handleSelectSession = async (sessionId: string) => {
    setActiveSession({ id: sessionId, title: "Đang tải..." }); // Tạm hiển thị
    setLoadingSession(true);
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        const res = await getChatSessionDetailApi(token, sessionId);
        if (res.success && res.data) {
          setActiveSession(res.data);
        }
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể mở phiên trò chuyện.");
      setActiveSession(null);
    } finally {
      setLoadingSession(false);
    }
  };

  // 3. Tạo phiên mới
  const handleCreateSession = async () => {
    if (!newChatTitle.trim()) return;
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        const res = await createChatSessionApi(token, newChatTitle.trim());
        if (res.success && res.data) {
          setSessions([res.data, ...sessions]); // Thêm vào danh sách
          setActiveSession(res.data); // Mở luôn phiên vừa tạo
          setModalNewChatVisible(false);
        }
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tạo phiên trò chuyện.");
    }
  };

  // 4. Gửi tin nhắn
  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || !activeSession || isSending) return;

    // Lạc quan (Optimistic UI): Thêm ngay tin nhắn người dùng vào UI
    const tempUserMsg = {
      id: Date.now().toString(),
      role: "USER" as const,
      content: text.trim(),
    };
    setActiveSession((prev) =>
      prev
        ? { ...prev, messages: [...(prev.messages || []), tempUserMsg] }
        : prev,
    );
    setInputMessage("");
    setIsSending(true);

    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        const res = await sendChatMessageApi(
          token,
          activeSession.id,
          text.trim(),
        );
        if (res.success && res.data) {
          // Thêm phản hồi của AI vào UI
          setActiveSession((prev) =>
            prev
              ? { ...prev, messages: [...(prev.messages || []), res.data] }
              : prev,
          );
        }
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể gửi tin nhắn.");
    } finally {
      setIsSending(false);
      // Refresh lại danh sách để cập nhật lastMessageAt
      fetchSessionsList();
    }
  };

  // 5. Xoá phiên
  const handleDeleteSession = async () => {
    if (!activeSession) return;
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        const res = await deleteChatSessionApi(token, activeSession.id);
        if (res.success || res.statusCode === 200) {
          setSessions((prev) => prev.filter((s) => s.id !== activeSession.id));
          setActiveSession(null);
        }
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể xóa phiên trò chuyện.");
    }
  };

  // Format thời gian ngắn
  const formatTime = (isoString?: string) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")} ${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* SIDEBAR */}
      <DashboardSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onLogout={onLogout}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToSubscription={onNavigateToSubscription}
        onNavigateToUsage={onNavigateToUsage}
        onNavigateToChat={() => setSidebarVisible(false)}
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

      {/* BODY */}
      {!activeSession ? (
        /* TRẠNG THÁI 1: DANH SÁCH CHAT SESSIONS */
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollPadding}
        >
          <View style={styles.sessionHeaderRow}>
            <MessageSquare size={18} color="#4F46E5" />
            <Text style={styles.sessionHeaderTitle}>
              Chat Sessions ({sessions.length})
            </Text>
          </View>

          <View style={styles.sessionCardBox}>
            <TouchableOpacity
              style={styles.btnNewChat}
              activeOpacity={0.85}
              onPress={() => {
                setNewChatTitle("");
                setModalNewChatVisible(true);
              }}
            >
              <Plus size={18} color="#ffffff" />
              <Text style={styles.btnNewChatText}>New chat</Text>
            </TouchableOpacity>

            <Text style={styles.historyLabel}>HISTORY</Text>

            {loadingList ? (
              <ActivityIndicator color="#4F46E5" style={{ marginTop: 20 }} />
            ) : (
              sessions.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.historyItem}
                  onPress={() => handleSelectSession(item.id)}
                  activeOpacity={0.7}
                >
                  <MessageSquare
                    size={18}
                    color="#94A3B8"
                    style={{ marginTop: 2 }}
                  />
                  <View style={styles.historyItemContent}>
                    <Text style={styles.historyItemTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.historyItemTime}>
                      {formatTime(item.lastMessageAt || item.createdAt)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      ) : (
        /* TRẠNG THÁI 2: CHI TIẾT ĐOẠN CHAT */
        <KeyboardAvoidingView
          style={styles.chatRoomContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.subTopNav}>
            <TouchableOpacity
              style={styles.btnAllSessions}
              onPress={() => setActiveSession(null)}
              activeOpacity={0.7}
            >
              <ArrowLeft size={16} color="#4F46E5" />
              <Text style={styles.btnAllSessionsText}>All Sessions</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.chatCardWrapper}>
            {/* Header phòng chat */}
            <View style={styles.chatRoomHeader}>
              <View style={styles.chatRoomInfoLeft}>
                <View style={styles.avatarAiSquare}>
                  <Sparkles size={18} color="#ffffff" />
                </View>
                <View>
                  <Text style={styles.chatRoomTitle} numberOfLines={1}>
                    {activeSession.title}
                  </Text>
                  <View style={styles.onlineBadgeRow}>
                    <View style={styles.onlineDot} />
                    <Text style={styles.onlineText}>Online</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleDeleteSession}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Trash2 size={18} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {/* Danh sách tin nhắn */}
            <ScrollView
              style={styles.messagesScroll}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
            >
              {loadingSession ? (
                <ActivityIndicator color="#4F46E5" style={{ marginTop: 20 }} />
              ) : (
                <>
                  {activeSession.messages?.map((msg, index) => (
                    <View
                      key={msg.id || index}
                      style={[
                        styles.messageRow,
                        msg.role === "USER"
                          ? styles.messageRowUser
                          : styles.messageRowAi,
                      ]}
                    >
                      {msg.role === "ASSISTANT" && (
                        <View style={styles.avatarAiMini}>
                          <Sparkles size={14} color="#ffffff" />
                        </View>
                      )}

                      <View
                        style={[
                          styles.bubble,
                          msg.role === "USER"
                            ? styles.bubbleUser
                            : styles.bubbleAi,
                        ]}
                      >
                        <Text
                          style={[
                            styles.bubbleText,
                            msg.role === "USER"
                              ? styles.bubbleTextUser
                              : styles.bubbleTextAi,
                          ]}
                        >
                          {msg.content}
                        </Text>
                      </View>

                      {msg.role === "USER" && (
                        <View style={styles.avatarUserMini}>
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: 12,
                              fontWeight: "700",
                            }}
                          >
                            {user?.fullName
                              ? user.fullName.charAt(0).toUpperCase()
                              : "U"}
                          </Text>
                        </View>
                      )}
                    </View>
                  ))}

                  {isSending && (
                    <View style={[styles.messageRow, styles.messageRowAi]}>
                      <View style={styles.avatarAiMini}>
                        <Sparkles size={14} color="#ffffff" />
                      </View>
                      <View
                        style={[
                          styles.bubble,
                          styles.bubbleAi,
                          { paddingVertical: 14 },
                        ]}
                      >
                        <ActivityIndicator size="small" color="#64748B" />
                      </View>
                    </View>
                  )}

                  {/* Gợi ý nếu chat còn trống */}
                  {(!activeSession.messages ||
                    activeSession.messages.length === 0) &&
                    !isSending && (
                      <View style={styles.pillsContainer}>
                        {quickPrompts.map((p, i) => (
                          <TouchableOpacity
                            key={i}
                            style={styles.pillItem}
                            activeOpacity={0.7}
                            onPress={() => handleSendMessage(p)}
                          >
                            <Text style={styles.pillText}>{p}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                </>
              )}
            </ScrollView>

            {/* Khung nhập tin nhắn */}
            <View style={styles.inputBarWrapper}>
              <TextInput
                style={styles.textInputBar}
                placeholder="Ask anything about your career..."
                placeholderTextColor="#94A3B8"
                value={inputMessage}
                onChangeText={setInputMessage}
                editable={!isSending && !loadingSession}
              />
              <TouchableOpacity
                style={[
                  styles.btnSend,
                  (isSending || loadingSession) && { opacity: 0.5 },
                ]}
                onPress={() => handleSendMessage()}
                activeOpacity={0.8}
                disabled={isSending || loadingSession}
              >
                <Send size={16} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}

      {/* MODAL TẠO PHIÊN CHAT MỚI */}
      <Modal visible={modalNewChatVisible} transparent animationType="fade">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContentBox}>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalNewChatVisible(false)}
            >
              <X size={18} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.modalIconWrap}>
              <MessageSquare size={22} color="#64748B" />
            </View>

            <Text style={styles.modalTitle}>Bắt đầu cuộc trò chuyện mới</Text>
            <Text style={styles.modalSubtitle}>
              Đặt tiêu đề cho phiên chat với AI Mentor dựa trên lộ trình của
              bạn.
            </Text>

            <TextInput
              style={styles.modalInput}
              value={newChatTitle}
              onChangeText={setNewChatTitle}
              placeholder="Nhập tiêu đề phiên chat..."
              placeholderTextColor="#94A3B8"
              autoFocus
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.btnModalCancel}
                onPress={() => setModalNewChatVisible(false)}
              >
                <Text style={styles.btnModalCancelText}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnModalStart}
                onPress={handleCreateSession}
              >
                <Sparkles size={16} color="#ffffff" />
                <Text style={styles.btnModalStartText}>Bắt đầu trò chuyện</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0EA5E9",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  scrollPadding: { padding: 20 },

  /* SESSIONS LIST */
  sessionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  sessionHeaderTitle: { fontSize: 15, fontWeight: "600", color: "#334155" },
  sessionCardBox: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 20,
    padding: 20,
    minHeight: 500,
  },
  btnNewChat: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4F46E5",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    marginBottom: 24,
  },
  btnNewChatText: { color: "#ffffff", fontSize: 15, fontWeight: "600" },
  historyLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 14,
  },
  historyItemContent: { flex: 1 },
  historyItemTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 4,
  },
  historyItemTime: { fontSize: 12, color: "#94A3B8" },

  /* CHAT ROOM */
  chatRoomContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  subTopNav: { flexDirection: "row", marginBottom: 12 },
  btnAllSessions: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 6,
  },
  btnAllSessionsText: { color: "#4F46E5", fontSize: 13, fontWeight: "600" },
  chatCardWrapper: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 20,
    overflow: "hidden",
  },
  chatRoomHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  chatRoomInfoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  avatarAiSquare: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  chatRoomTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 2,
    paddingRight: 10,
  },
  onlineBadgeRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#22C55E",
  },
  onlineText: { fontSize: 12, color: "#64748B" },
  messagesScroll: { flex: 1 },
  messagesContent: { padding: 16, gap: 14 },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 4,
  },
  messageRowAi: { justifyContent: "flex-start" },
  messageRowUser: { justifyContent: "flex-end" },
  avatarAiMini: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarUserMini: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    maxWidth: "78%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  bubbleAi: { backgroundColor: "#F8FAFC", borderTopLeftRadius: 4 },
  bubbleUser: { backgroundColor: "#4F46E5", borderTopRightRadius: 4 },
  bubbleText: { fontSize: 14, lineHeight: 21 },
  bubbleTextAi: { color: "#1E293B" },
  bubbleTextUser: { color: "#ffffff" },

  /* PILLS */
  pillsContainer: { marginTop: 10, gap: 8 },
  pillItem: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    alignSelf: "flex-start",
  },
  pillText: { fontSize: 13, color: "#475569" },

  /* INPUT BAR */
  inputBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    gap: 10,
  },
  textInputBar: { flex: 1, fontSize: 14, color: "#0F172A", paddingVertical: 8 },
  btnSend: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#818CF8",
    alignItems: "center",
    justifyContent: "center",
  },

  /* POPUP MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContentBox: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    position: "relative",
  },
  modalCloseBtn: { position: "absolute", top: 18, right: 18, padding: 4 },
  modalIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1.5,
    borderColor: "#818CF8",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#0F172A",
    marginBottom: 20,
  },
  modalActions: { flexDirection: "row", gap: 10 },
  btnModalCancel: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  btnModalCancelText: { fontSize: 14, fontWeight: "600", color: "#0F172A" },
  btnModalStart: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  btnModalStartText: { fontSize: 14, fontWeight: "600", color: "#ffffff" },
});
