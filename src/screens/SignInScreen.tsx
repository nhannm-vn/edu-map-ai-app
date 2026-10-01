import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginPayload } from "../schemas/auth.schema";
import { useLoginMutation } from "../hooks/useAuthQuery";

interface SignInScreenProps {
  onNavigateToSignUp: () => void;
  onBackToHome?: () => void;
  onLoginSuccess?: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onNavigateToSignUp,
  onBackToHome,
  onLoginSuccess,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginUser, isPending } = useLoginMutation();

  const onSubmit = (data: LoginPayload) => {
    loginUser(data, {
      onSuccess: () => {
        Alert.alert("Thành công", "Đăng nhập thành công!");
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          "Email hoặc mật khẩu không chính xác.";
        Alert.alert("Đăng nhập thất bại", message);
      },
    });
  };

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
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Enter your credentials to access your career roadmap.
        </Text>

        {/* Form Inputs */}
        <View style={styles.form}>
          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.inputWrapper,
                    errors.email && styles.inputError,
                  ]}
                >
                  <Mail size={18} color="#94A3B8" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="you@university.edu"
                    placeholderTextColor="#94A3B8"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.inputWrapper,
                    errors.password && styles.inputError,
                  ]}
                >
                  <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>

          {/* Submit CTA */}
          <TouchableOpacity
            style={[styles.btnSubmit, isPending && styles.btnDisabled]}
            activeOpacity={0.85}
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            <Text style={styles.btnSubmitText}>
              {isPending ? "Signing in..." : "Sign in"}
            </Text>
            {!isPending && (
              <ArrowRight size={18} color="#ffffff" style={{ marginLeft: 6 }} />
            )}
          </TouchableOpacity>

          {/* Switch to Sign Up */}
          <View style={styles.switchAuthRow}>
            <Text style={styles.switchAuthText}>Don't have an account? </Text>
            <TouchableOpacity onPress={onNavigateToSignUp}>
              <Text style={styles.switchAuthLink}>Sign up</Text>
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
  inputGroup: { gap: 6 },
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
  inputError: { borderColor: "#EF4444" },
  errorText: { fontSize: 12, color: "#EF4444", marginTop: 2, marginLeft: 4 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: "#0F172A" },
  btnSubmit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4F46E5",
    height: 52,
    borderRadius: 12,
    marginTop: 8,
  },
  btnDisabled: { opacity: 0.7 },
  btnSubmitText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
  switchAuthRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  switchAuthText: { fontSize: 14, color: "#64748B" },
  switchAuthLink: { fontSize: 14, fontWeight: "700", color: "#0F172A" },
});
