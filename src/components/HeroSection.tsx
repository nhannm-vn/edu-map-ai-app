import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Sparkles, ArrowRight, Play } from "lucide-react-native";

interface HeroSectionProps {
  onNavigateToSignIn: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToSignIn,
}) => {
  return (
    <View style={styles.heroSection}>
      <View style={styles.badgePill}>
        <Sparkles size={14} color="#4F46E5" />
        <Text style={styles.badgePillText}>New · GPT-5 powered roadmaps</Text>
      </View>

      <Text style={styles.heroHeadline}>
        Your AI career{"\n"}mentor,{"\n"}for every CS{"\n"}student.
      </Text>

      <Text style={styles.heroSubText}>
        Upload your transcript, GitHub and CV. EduMap AI maps your skills, spots
        the gaps, and builds the roadmap to your dream role.
      </Text>

      <View style={styles.heroActions}>
        <TouchableOpacity
          style={styles.btnPrimary}
          activeOpacity={0.85}
          onPress={onNavigateToSignIn}
        >
          <Text style={styles.btnPrimaryText}>Get started</Text>
          <ArrowRight size={18} color="#ffffff" style={{ marginLeft: 6 }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} activeOpacity={0.7}>
          <Play size={16} color="#0F172A" />
          <Text style={styles.btnSecondaryText}>Watch demo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heroFooterHint}>
        Free for students · No credit card required
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    alignItems: "center",
    marginBottom: 36,
  },
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
  badgePillText: {
    fontSize: 13,
    color: "#4F46E5",
    fontWeight: "500",
  },
  heroHeadline: {
    fontSize: 42,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    lineHeight: 48,
    marginBottom: 16,
  },
  heroSubText: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
    marginBottom: 28,
  },
  heroActions: {
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
  btnPrimaryText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  btnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 8,
  },
  btnSecondaryText: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "600",
  },
  heroFooterHint: {
    fontSize: 13,
    color: "#94A3B8",
  },
});
