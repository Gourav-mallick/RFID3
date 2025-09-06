// src/screens/RfidAttendanceScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PrimaryButton from "../components/common/Button/PrimaryButton";
export default function RfidSrartRegAttenScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Rfid Attendance</Text>
      <Text style={styles.subtitle}>Welcome to Attendance</Text>
      <Text style={styles.helper}>scan to get Start</Text>

      {/* Buttons */}
      <View style={styles.buttonRow}>
          <PrimaryButton title={"Start Class"} onPress={() => navigation.navigate("AttendanceCycle")} />

         <PrimaryButton title={"Register new cards"} onPress={() => navigation.navigate("CardWrite")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#eee" 

  },
  title: { 
    fontSize: 20, 
    fontWeight: "700", 
    marginBottom: 10 

  },
  subtitle: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginBottom: 5 
  },
  helper: { 
    fontSize: 14, 
    color: "#555", 
    marginBottom: 30 

  },
  buttonRow: { 
    flexDirection: "row", 
    justifyContent: "space-between" 

  },
});
