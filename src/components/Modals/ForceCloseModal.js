// src/components/ForceCloseModal.js
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PrimaryButton from "../common/Button/PrimaryButton";
export default function ForceCloseModal({ visible, onClose, onConfirm }) {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>ForceFully Close Attendance</Text>
          <Text style={styles.modalText}>Ensure Text</Text>

          <View style={styles.modalBtnRow}>
            <PrimaryButton title={"No"} onPress={onClose}/>
           <PrimaryButton title={"Yes"} onPress={onConfirm}/>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 280,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: { fontWeight: "700", fontSize: 16, marginBottom: 10 },
  modalText: { fontSize: 14, marginBottom: 20 },
  modalBtnRow: { flexDirection: "row", justifyContent: "space-between" },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  modalBtnText: { color: "#fff", fontWeight: "600" },
});
