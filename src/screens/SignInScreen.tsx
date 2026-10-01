import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Mail, Lock, ArrowRight, Check } from "lucide-react-native";

interface SignInScreenProps {
  onNavigateToSignUp: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onNavigateToSignUp,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.screen}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>Welcome back to your AI mentor</Text>

        <View style={styles.form}>
          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <Mail size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="alex@university.edu"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="enter your password"
                placeholderTextColor="#94A3B8"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          {/* Remember me & Forgot Password */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.8}
            >
              <View
                style={[styles.checkbox, rememberMe && styles.checkboxActive]}
              >
                {rememberMe && (
                  <Check size={14} color="#ffffff" strokeWidth={3} />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In CTA */}
          <TouchableOpacity style={styles.btnSubmit} activeOpacity={0.85}>
            <Text style={styles.btnSubmitText}>Sign in</Text>
            <ArrowRight size={18} color="#ffffff" style={{ marginLeft: 6 }} />
          </TouchableOpacity>

          <Text style={styles.demoModeHint}>
            Demo mode · use any email + password
          </Text>

          {/* Divider */}
          <View style={styles.orDividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.orText}>OR CONTINUE WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Auth Button */}
          <TouchableOpacity style={styles.btnGoogle} activeOpacity={0.8}>
            <View style={styles.googleIconCircle}>
              <Text style={styles.googleG}>G</Text>
            </View>
            <Text style={styles.btnGoogleText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Switch to Sign Up */}
          <View style={styles.switchAuthRow}>
            <Text style={styles.switchAuthText}>No account? </Text>
            <TouchableOpacity onPress={onNavigateToSignUp}>
              <Text style={styles.switchAuthLink}>Create one</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#ffffff" },
  container: { paddingHorizontal: 24, paddingTop: 50, paddingBottom: 40 },
  title: { fontSize: 34, fontWeight: "800", color: "#0F172A", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#64748B", marginBottom: 28 },
  form: { gap: 16 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: "600", color: "#1E293B" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    height: 50,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: "#0F172A" },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  checkboxContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: { backgroundColor: "#4F46E5", borderColor: "#4F46E5" },
  checkboxLabel: { fontSize: 14, color: "#334155", fontWeight: "500" },
  forgotText: { fontSize: 14, color: "#64748B" },
  btnSubmit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4F46E5",
    height: 52,
    borderRadius: 12,
    marginTop: 10,
  },
  btnSubmitText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
  demoModeHint: {
    fontSize: 13,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 6,
  },
  orDividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
    gap: 12,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#F1F5F9" },
  orText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 0.5,
  },
  btnGoogle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    height: 50,
    borderRadius: 12,
    gap: 10,
  },
  googleIconCircle: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  googleG: { fontSize: 16, fontWeight: "700", color: "#EA4335" },
  btnGoogleText: { fontSize: 15, fontWeight: "600", color: "#334155" },
  switchAuthRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  switchAuthText: { fontSize: 14, color: "#64748B" },
  switchAuthLink: { fontSize: 14, fontWeight: "700", color: "#0F172A" },
});
