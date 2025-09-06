import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimeDisplay from "../../common/DateTimeDisplay/DateTimeDisplay"
import DumyCardButton from "../../common/Button/SecondaryButton";

export default function ReadyStep({ onPress }) {
  return (
    <View style={styles.container}>
      <DateTimeDisplay />
      <Text style={styles.status}>Ready to scan</Text>

      <Text style={styles.instructionTitle}>Follow Instruction</Text>
      <Text style={styles.arrow}>⬇️</Text>
      <Text style={styles.instructionText}>
        1st tap class card {'\n'}
        2nd staff card {'\n'}3 student 1-1 {'\n'}
        and end by class card again
      </Text>
    <DumyCardButton title={ "dummy class card scan and start" } onPress={onPress}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: 20 },
  dateText: { fontSize: 14, marginBottom: 10 },
  status: { fontSize: 18, fontWeight: '700', marginBottom: 20 },
  instructionTitle: { fontSize: 16, fontWeight: '600' },
  arrow: { fontSize: 20, marginVertical: 5 },
  instructionText: { fontSize: 14, textAlign: 'center', marginBottom: 20 },
  scanBtn: {
    backgroundColor: '#ff8080',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  scanBtnText: { color: '#fff', fontWeight: '700' },
});
