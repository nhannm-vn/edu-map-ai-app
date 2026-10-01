import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Check } from "lucide-react-native";
import { PRICING_PLANS } from "../constants/homeData";

export const PricingSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.overline}>Pricing</Text>
      <Text style={styles.title}>Plans that grow with you.</Text>

      <View style={styles.plansWrapper}>
        {PRICING_PLANS.map((plan) => (
          <View key={plan.id} style={styles.card}>
            {plan.badge && (
              <View style={styles.badgeTopLeft}>
                <Text style={styles.badgeTopLeftText}>{plan.badge}</Text>
              </View>
            )}
            {plan.discountBadge && (
              <View style={styles.badgeTopRight}>
                <Text style={styles.badgeTopRightText}>
                  {plan.discountBadge}
                </Text>
              </View>
            )}

            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.planSubtitle}>{plan.subtitle}</Text>

            <View style={styles.priceRow}>
              <Text style={styles.priceAmount}>{plan.price}</Text>
              <Text style={styles.pricePeriod}> {plan.billingPeriod} </Text>
              {plan.originalPrice && (
                <Text style={styles.strikethrough}>{plan.originalPrice}</Text>
              )}
            </View>

            <TouchableOpacity
              style={
                plan.variant === "solid" ? styles.btnSolid : styles.btnOutline
              }
              activeOpacity={0.8}
            >
              <Text
                style={
                  plan.variant === "solid"
                    ? styles.btnSolidText
                    : styles.btnOutlineText
                }
              >
                {plan.buttonText}
              </Text>
            </TouchableOpacity>

            <View style={styles.featureList}>
              {plan.features.map((feat, i) => (
                <View key={i} style={styles.featureItem}>
                  <Check size={16} color="#0F172A" />
                  <Text style={styles.featureText}>{feat}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 30 },
  overline: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 20,
  },
  plansWrapper: { gap: 16 },
  card: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 20,
    padding: 24,
    position: "relative",
  },
  badgeTopLeft: {
    position: "absolute",
    top: -12,
    left: 20,
    backgroundColor: "#4F46E5",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeTopLeftText: { color: "#ffffff", fontSize: 11, fontWeight: "700" },
  badgeTopRight: {
    position: "absolute",
    top: -12,
    right: 20,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  badgeTopRightText: { color: "#334155", fontSize: 11, fontWeight: "700" },
  planName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  planSubtitle: { fontSize: 14, color: "#64748B", marginBottom: 16 },
  priceRow: { flexDirection: "row", alignItems: "baseline", marginBottom: 20 },
  priceAmount: { fontSize: 38, fontWeight: "800", color: "#0F172A" },
  pricePeriod: { fontSize: 15, color: "#64748B", fontWeight: "500" },
  strikethrough: {
    fontSize: 16,
    color: "#94A3B8",
    textDecorationLine: "line-through",
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 18,
  },
  btnOutlineText: { fontSize: 15, fontWeight: "600", color: "#0F172A" },
  btnSolid: {
    backgroundColor: "#4F46E5",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 18,
  },
  btnSolidText: { fontSize: 15, fontWeight: "600", color: "#ffffff" },
  featureList: { gap: 12 },
  featureItem: { flexDirection: "row", alignItems: "center", gap: 10 },
  featureText: { fontSize: 14, color: "#334155", flex: 1 },
});
