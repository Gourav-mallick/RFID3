import React from "react";
import { View, Text, Picker, StyleSheet } from "react-native";

export default function PickerField({ label, selectedValue, onValueChange, options }) {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        {options.map((opt) => (
          <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({ container: { marginBottom: 15 } });
