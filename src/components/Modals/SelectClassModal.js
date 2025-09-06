// src/components/SelectClassModal.js
import React, { useState } from "react";
import { Modal, View, Text, Alert, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import PrimaryButton from "../common/Button/PrimaryButton";

export default function SelectClassModal({ visible, onClose, onNext }) {
  const classes = ["Class 1", "Class 2", "Class 3", "Class 4"];
  const [selectedClass, setSelectedClass] = useState(""); // 👈 default empty

  const handleNext = () => {
    if (!selectedClass) {
      Alert.alert("Please select a class before continuing.");
      return;
    }
    onNext(selectedClass); // only goes if class selected
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Select Class</Text>
          <Text style={styles.subtitle}>Choose a class from the list</Text>

          {/* Dropdown */}
          <View style={styles.dropdownWrapper}>
            <Picker
              selectedValue={selectedClass}
              onValueChange={(itemValue) => setSelectedClass(itemValue)}
            >
              {/* 👇 default option */}
              <Picker.Item label="-- Select Class --" value="" />
              {classes.map((className) => (
                <Picker.Item key={className} label={className} value={className} />
              ))}
            </Picker>
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <PrimaryButton title={"Cancel"} onPress={onClose} />
            <PrimaryButton title={"Next"} onPress={handleNext} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitle: {
    marginBottom: 15,
  },
  dropdownWrapper: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
