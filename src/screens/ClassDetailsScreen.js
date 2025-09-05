// src/screens/AttendanceDetails.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet,Modal ,Button} from "react-native";

export default function AttendanceDetails({ route ,navigation}) {
  const [dateTime, setDateTime] = useState("");
  const [submittedCycles, setSubmittedCycles] = useState(0);
  const [unsubmittedCycles, setUnsubmittedCycles] = useState(0);
const [modalVisible, setModalVisible] = useState(false);
  // Dummy Teacher (later from route.params or API)
  const teacherName = "Teacher Name";

  // Simulate cycle data
  useEffect(() => {
    const now = new Date();
    setDateTime(now.toLocaleString());

    // Dummy values — later replace with API
    setSubmittedCycles(2);
    setUnsubmittedCycles(1);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{dateTime}</Text>

      <Text style={styles.teacherText}>Teacher : {teacherName}</Text>

      <View style={styles.row}>
        <Text style={styles.infoText}>
          Unsubmit Cycle(s): {unsubmittedCycles}
        </Text>
        <Text style={styles.infoText}>
          Submit Cycle(s): {submittedCycles}
        </Text>
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.submitText}>Click to submit Class</Text>
      </TouchableOpacity>

      {/* Popup */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Select Class</Text>
            <Text style={styles.subtitle}>Check Box of Classes</Text>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModalVisible(false);
                   navigation.navigate("Overview"); // 👈 Navigate to Overview screen
                }}
              >
                <Text>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#e5e5e5",
  },
  dateText: { fontSize: 16, fontWeight: "600", marginBottom: 15 },
  teacherText: { fontSize: 16, marginBottom: 20 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  infoText: { fontSize: 15, fontWeight: "500" },
  submitBtn: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    backgroundColor: "#b3a9a9",
    borderRadius: 8,
  },
  submitText: { fontSize: 15, fontWeight: "600", color: "#000" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitle: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#b5aaaa",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
});
