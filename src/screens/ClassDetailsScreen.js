// src/screens/AttendanceDetails.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectClassModal from '../components/Modals/SelectClassModal'; 
import PrimaryButton from '../components/common/Button/PrimaryButton';
import DateTimeDisplay from '../components/common/DateTimeDisplay/DateTimeDisplay';

export default function AttendanceDetails({ navigation }) {
  const [submittedCycles, setSubmittedCycles] = useState(0);
  const [unsubmittedCycles, setUnsubmittedCycles] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const teacherName = 'Teacher Name';

  useEffect(() => {
    setSubmittedCycles(2);
    setUnsubmittedCycles(1);
  }, []);

  return (
    <View style={styles.container}>
      <DateTimeDisplay/>
      <Text style={styles.teacherText}>Teacher : {teacherName}</Text>

      <View style={styles.row}>
        <Text style={styles.infoText}>
          Unsubmit Cycle(s): {unsubmittedCycles}
        </Text>
        <Text style={styles.infoText}>Submit Cycle(s): {submittedCycles}</Text>
      </View>

      <PrimaryButton
        title={'Click to submit Class'}
        onPress={() => setModalVisible(true)}
      />

      {/* ✅ Use the separated modal */}
      <SelectClassModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onNext={() => {
          setModalVisible(false);
          navigation.navigate('Overview'); // 👈 go to Overview screen
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
  },
  dateText: { fontSize: 16, fontWeight: '600', marginBottom: 15 },
  teacherText: { fontSize: 16, marginBottom: 20 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  infoText: { fontSize: 15, fontWeight: '500' },
  submitBtn: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    backgroundColor: '#b3a9a9',
    borderRadius: 8,
  },
  submitText: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#000' 
    
  },
});
