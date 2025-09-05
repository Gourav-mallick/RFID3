// src/screens/OverviewScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AttendanceSummaryModal from "../components/AttendanceSummaryModal";

export default function OverviewScreen({ navigation }) {
  const teacherName = "Teacher Name"; // later from API
  const dateTime = new Date().toLocaleString();

  const [period, setPeriod] = useState(null);
  const [subject, setSubject] = useState(null);
const [modalVisible, setModalVisible] = useState(false);


// Dummy counts for now
  const presentCount = 5;
  const unEnrolledCount = 0;
  const unScheduledCount = 0;


  const handleSubmit = () => {
    if (!period || !subject) {
      Alert.alert("Missing Info", "Please select both Period and Subject");
      return;
    }
    setModalVisible(true);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{dateTime}</Text>
      <Text style={styles.teacherText}>Teacher : {teacherName}</Text>

      {/* Submit Class Btn */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Click to submit Class</Text>
      </TouchableOpacity>

      {/* Select Period */}
      <Text style={styles.label}>Select Periods</Text>
      <RNPickerSelect
        onValueChange={(value) => setPeriod(value)}
        items={[
          { label: "Period 1", value: "Period 1" },
          { label: "Period 2", value: "Period 2" },
          { label: "Period 3", value: "Period 3" },
        ]}
        placeholder={{ label: "Choose Period", value: null }}
        style={pickerSelectStyles}
      />

      {/* Select Subject */}
      <Text style={styles.label}>Select Subjects</Text>
      <RNPickerSelect
        onValueChange={(value) => setSubject(value)}
        items={[
          { label: "Math", value: "Math" },
          { label: "Science", value: "Science" },
          { label: "History", value: "History" },
        ]}
        placeholder={{ label: "Choose Subject", value: null }}
        style={pickerSelectStyles}
      />


      {/* Modal */}
      <AttendanceSummaryModal
        visible={modalVisible}
        presentCount={presentCount}
        unEnrolledCount={unEnrolledCount}
        unScheduledCount={unScheduledCount}
        onClose={() => setModalVisible(false)} // Cancel → stay on overview
        onShowList={() => {
          setModalVisible(false);
          navigation.navigate("StudentList"); // screen that shows present students
        }}
        onSubmit={() => {
          setModalVisible(false);
          navigation.navigate("AttendanceCycle"); // back to start cycle screen
        }}
      />
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
  dateText: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  teacherText: { fontSize: 16, marginBottom: 20 },
  submitBtn: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    backgroundColor: "#b3a9a9",
    borderRadius: 8,
    marginBottom: 20,
  },
  submitText: { fontSize: 15, fontWeight: "600", color: "#000" },
  label: { alignSelf: "flex-start", fontWeight: "600", marginTop: 20 },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#fff",
    marginTop: 8,
    width: 250,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    backgroundColor: "#fff",
    marginTop: 8,
    width: 250,
  },
};
