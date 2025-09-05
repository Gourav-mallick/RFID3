// src/screens/RfidAttendanceScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RfidSrartRegAttenScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Rfid Attendance</Text>
      <Text style={styles.subtitle}>Welcome to Attendance</Text>
      <Text style={styles.helper}>scan to get Start</Text>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.startBtn]}
          onPress={() => navigation.navigate("AttendanceCycle")}
        >
          <Text style={styles.buttonText}>Start Class</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.registerBtn]}
          onPress={() => navigation.navigate("CardWrite")}
        >
          <Text style={styles.buttonText}>Register new cards</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#eee" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  subtitle: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  helper: { fontSize: 14, color: "#555", marginBottom: 30 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    borderRadius: 6,
    alignItems: "center",
    minWidth: 120,
  },
  startBtn: { backgroundColor: "#ffb3b3" },
  registerBtn: { backgroundColor: "#ff9999" },
  buttonText: { color: "#000", fontWeight: "600" },
});
