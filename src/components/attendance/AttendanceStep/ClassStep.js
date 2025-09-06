import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DateTimeDisplay from "../../common/DateTimeDisplay/DateTimeDisplay";
import DumyCardButton from "../../common/Button/SecondaryButton";

export default function ClassStep({ classRoom, onPress }) {
  return (
    <View style={styles.container}>
      <DateTimeDisplay />
      <View style={styles.cardBox}>
        <Text style={styles.cardText}>
          <Text style={{ fontWeight: "700" }}>Class Card </Text> {classRoom}
        </Text>
      </View>
      <Text style={styles.instruction}>Next: Scan Staff Card</Text>
      <DumyCardButton title={"dummy staff card scan"} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 20 },
  cardBox: {
    backgroundColor: "#d6cfcf",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
  },
  cardText: { fontSize: 16 },
  instruction: { fontSize: 14, marginVertical: 15 },
});
