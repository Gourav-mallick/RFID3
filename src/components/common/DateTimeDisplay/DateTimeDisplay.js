import React from "react";
import { Text, StyleSheet } from "react-native";
import useDateTime from "../../../hooks/useDateTime";

export default function DateTimeDisplay() {
  const { date, time } = useDateTime();
  return <Text style={styles.text}>{`${date} ${time}`}</Text>;
}

const styles = StyleSheet.create({
  text: { 
    fontSize: 16, 
    fontWeight: "500", 
    color: "#333" 
    
  },
});
