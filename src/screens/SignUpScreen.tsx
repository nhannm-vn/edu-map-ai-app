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
import { Sparkles, User, Mail, Lock, ArrowRight } from "lucide-react-native";

interface SignUpScreenProps {
  onNavigateToSignIn: () => void;
  onBackToHome?: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onNavigateToSignIn,
  onBackToHome,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.screen}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand header */}
        <TouchableOpacity style={styles.brand} onPress={onBackToHome}>
          <View style={styles.logoSquare}>
            <Sparkles size={20} color="#ffffff" />
          </View>
          <Text style={styles.brandTitle}>EduMap AI</Text>
        </TouchableOpacity>

        {/* Heading */}
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>
          90-second setup. Free forever for students.
        </Text>

        {/* Form Inputs */}
        <View style={styles.form}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full name</Text>
            <View style={styles.inputWrapper}>
              <User size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Alex Johnson"
                placeholderTextColor="#94A3B8"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <Mail size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="you@university.edu"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Password & Confirm Split */}
          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Confirm</Text>
              <View style={styles.inputWrapper}>
                <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
            </View>
          </View>

          {/* Submit CTA */}
          <TouchableOpacity style={styles.btnSubmit} activeOpacity={0.85}>
            <Text style={styles.btnSubmitText}>Create account</Text>
            <ArrowRight size={18} color="#ffffff" style={{ marginLeft: 6 }} />
          </TouchableOpacity>

          {/* Terms Footer */}
          <Text style={styles.termsText}>
            By signing up you agree to our{" "}
            <Text style={styles.linkText}>Terms</Text> &{" "}
            <Text style={styles.linkText}>Privacy</Text>.
          </Text>

          {/* Switch to Sign In */}
          <View style={styles.switchAuthRow}>
            <Text style={styles.switchAuthText}>Already have an account? </Text>
            <TouchableOpacity onPress={onNavigateToSignIn}>
              <Text style={styles.switchAuthLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#ffffff" },
  container: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 40 },
  brand: { flexDirection: "row", alignItems: "center", marginBottom: 40 },
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
  title: { fontSize: 32, fontWeight: "800", color: "#0F172A", marginBottom: 8 },
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
  rowInputs: { flexDirection: "row", gap: 12 },
  btnSubmit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4F46E5",
    height: 52,
    borderRadius: 12,
    marginTop: 8,
  },
  btnSubmitText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
  termsText: {
    fontSize: 13,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 12,
  },
  linkText: { textDecorationLine: "underline", color: "#64748B" },
  switchAuthRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  switchAuthText: { fontSize: 14, color: "#64748B" },
  switchAuthLink: { fontSize: 14, fontWeight: "700", color: "#0F172A" },
});
