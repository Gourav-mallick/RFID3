// src/components/AttendanceSummaryModal.js
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PrimaryButton from "../common/Button/PrimaryButton";

export default function AttendanceSummaryModal({
  visible,
  onClose,
  onShowList,
  onSubmit,
  presentCount,
  unEnrolledCount,
  unScheduledCount,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Attendance Cycle Summary</Text>

          <Text>Present Students: {presentCount}</Text>
          <Text>Un-Enrolled Students: {unEnrolledCount}</Text>
          <Text>Un-Scheduled Students: {unScheduledCount}</Text>

          <View style={styles.btnRow}>
            <PrimaryButton title={"Cancel"} onPress={onClose}/>
            <PrimaryButton title={"Show List"} onPress={onShowList}/>

            <PrimaryButton title={"Submit"} onPress={onSubmit}/>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#ddd",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#b0a8a8",
    borderRadius: 6,
  },
});
