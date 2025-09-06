// src/components/BackButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function BackButton({ title = "Back" }) {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack('RfidSrartRegAtten');
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleBack}>
      <Text style={styles.text}>← {title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#ff8080",
    borderRadius: 6,
    alignSelf: "flex-start",
    margin: 10,
  },
  text: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
