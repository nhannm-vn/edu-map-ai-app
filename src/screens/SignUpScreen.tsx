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
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Sparkles, User, Mail, Lock, ArrowRight } from "lucide-react-native";
import { registerApi } from "../services/authService";

interface SignUpScreenProps {
  onNavigateToSignIn: () => void;
  onBackToHome?: () => void;
  onRegisterSuccess?: (user: any, token: string) => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onNavigateToSignIn,
  onBackToHome,
  onRegisterSuccess,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ các trường thông tin.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Lỗi xác nhận", "Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      setLoading(true);

      const res = await registerApi({
        fullName: fullName.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      console.log("Register API Response:", res);

      if (
        (res.success || res.statusCode === 201 || res.statusCode === 200) &&
        res.data
      ) {
        try {
          await AsyncStorage.setItem("accessToken", res.data.accessToken);
          await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
        } catch (storageErr) {
          console.warn("Lỗi lưu AsyncStorage:", storageErr);
        }

        if (onRegisterSuccess) {
          onRegisterSuccess(res.data.user, res.data.accessToken);
        }
      } else {
        Alert.alert(
          "Đăng ký thất bại",
          res.message ||
            "Không thể tạo tài khoản, vui lòng kiểm tra lại thông tin.",
        );
      }
    } catch (err: any) {
      console.error("Register Error:", err);
      Alert.alert(
        "Lỗi kết nối",
        err.message || "Đã có lỗi xảy ra khi tạo tài khoản.",
      );
    } finally {
      setLoading(false);
    }
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
        {/* Brand Header */}
        <TouchableOpacity
          style={styles.brand}
          onPress={onBackToHome}
          activeOpacity={0.7}
        >
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
          {/* 1. Full Name */}
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
                editable={!loading}
              />
            </View>
          </View>

          {/* 2. Email */}
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
                editable={!loading}
              />
            </View>
          </View>

          {/* 3. Password & Confirm Split Row */}
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
                  editable={!loading}
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
                  editable={!loading}
                />
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.btnSubmit, loading && { opacity: 0.7 }]}
            activeOpacity={0.85}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <Text style={styles.btnSubmitText}>Create account</Text>
                <ArrowRight
                  size={18}
                  color="#ffffff"
                  style={{ marginLeft: 6 }}
                />
              </>
            )}
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
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  logoSquare: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 28,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
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
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#0F172A",
    paddingVertical: 0,
    borderWidth: 0,
    // @ts-ignore: khử viền outline trên nền web nếu có chạy web
    outlineWidth: 0,
  },
  rowInputs: {
    flexDirection: "row",
    gap: 12,
  },
  btnSubmit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4F46E5",
    height: 52,
    borderRadius: 12,
    marginTop: 8,
  },
  btnSubmitText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  termsText: {
    fontSize: 13,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 12,
  },
  linkText: {
    textDecorationLine: "underline",
    color: "#64748B",
  },
  switchAuthRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  switchAuthText: {
    fontSize: 14,
    color: "#64748B",
  },
  switchAuthLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
});
