import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { MetricGridCard } from "../components/MetricGridCard";
import { PricingSection } from "../components/PricingSection";

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeroSection />
        <MetricGridCard />
        <PricingSection />
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#ffffff" },
  scroll: { flex: 1, backgroundColor: "#FAFAFA" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 32 },
});
