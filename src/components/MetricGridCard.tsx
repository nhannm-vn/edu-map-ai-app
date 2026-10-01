import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GRID_BARS } from "../constants/homeData";

export const MetricGridCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.metricItem}>
        <Text style={styles.metricValue}>47/120</Text>
        <Text style={styles.metricLabel}>Skill Map</Text>
      </View>
      <View style={styles.metricItem}>
        <Text style={styles.metricValue}>87</Text>
        <Text style={styles.metricLabel}>Career Score</Text>
      </View>
      <View style={styles.metricItem}>
        <Text style={styles.metricValue}>94%</Text>
        <Text style={styles.metricLabel}>Job Match</Text>
      </View>

      <View style={styles.gridContainer}>
        {GRID_BARS.map((col, colIdx) => (
          <View key={colIdx} style={styles.gridColumn}>
            {col.map((color, rowIdx) => (
              <View
                key={rowIdx}
                style={[styles.gridDot, { backgroundColor: color }]}
              />
            ))}
          </View>
        ))}
      </View>

      <View style={styles.statsGrid}>
        <View style={[styles.statBox, styles.borderR, styles.borderB]}>
          <Text style={styles.statNumber}>120K+</Text>
          <Text style={styles.statLabel}>Students mentored</Text>
        </View>
        <View style={[styles.statBox, styles.borderB]}>
          <Text style={styles.statNumber}>412</Text>
          <Text style={styles.statLabel}>Universities</Text>
        </View>
        <View style={[styles.statBox, styles.borderR]}>
          <Text style={styles.statNumber}>94%</Text>
          <Text style={styles.statLabel}>Internship rate</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>4.9★</Text>
          <Text style={styles.statLabel}>Avg rating</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 20,
    marginBottom: 36,
  },
  metricItem: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 12,
  },
  metricValue: { fontSize: 26, fontWeight: "800", color: "#0F172A" },
  metricLabel: { fontSize: 14, color: "#64748B", marginTop: 4 },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  gridColumn: { gap: 8 },
  gridDot: { width: 13, height: 28, borderRadius: 7 },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderTopWidth: 1,
    borderColor: "#E2E8F0",
    marginTop: 10,
  },
  statBox: { width: "50%", paddingVertical: 18, alignItems: "center" },
  borderR: { borderRightWidth: 1, borderColor: "#E2E8F0" },
  borderB: { borderBottomWidth: 1, borderColor: "#E2E8F0" },
  statNumber: { fontSize: 22, fontWeight: "800", color: "#0F172A" },
  statLabel: { fontSize: 13, color: "#64748B", marginTop: 4 },
});
