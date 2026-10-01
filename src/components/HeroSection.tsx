import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Sparkles, ArrowRight, Play } from "lucide-react-native";

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <View style={styles.container}>
      <View style={styles.badgePill}>
        <Sparkles size={14} color="#4F46E5" />
        <Text style={styles.badgeText}>New · GPT-5 powered roadmaps</Text>
      </View>
      <Text style={styles.headline}>
        Your AI career{"\n"}mentor,{"\n"}for every CS{"\n"}student.
      </Text>
      <Text style={styles.subText}>
        Upload your transcript, GitHub and CV. EduMap AI maps your skills, spots
        the gaps, and builds the roadmap to your dream role.
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.btnPrimary}
          activeOpacity={0.85}
          onPress={onGetStarted}
        >
          <Text style={styles.btnPrimaryText}>Get started</Text>
          <ArrowRight size={18} color="#ffffff" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSecondary} activeOpacity={0.7}>
          <Play size={16} color="#0F172A" />
          <Text style={styles.btnSecondaryText}>Watch demo</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.hintText}>
        Free for students · No credit card required
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 36 },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 24,
  },
  badgeText: { fontSize: 13, color: "#4F46E5", fontWeight: "500" },
  headline: {
    fontSize: 42,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    lineHeight: 48,
    marginBottom: 16,
  },
  subText: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
    marginBottom: 28,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4F46E5",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  btnPrimaryText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
  btnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 8,
  },
  btnSecondaryText: { color: "#0F172A", fontSize: 15, fontWeight: "600" },
  hintText: { fontSize: 13, color: "#94A3B8" },
});
