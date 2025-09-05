// src/components/CardScanner.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

export default function CardScanner({ navigation }) {
  const [step, setStep] = useState('ready'); // ready → class → staff → student → end
  const [students, setStudents] = useState([]); // list of scanned students

  const handleNext = () => {
    if (step === 'ready') {
      setStep('class');
      setStudents([]); // reset when new class starts
    } else if (step === 'class') {
      setStep('staff');
    } else if (step === 'staff') {
      setStep('student');
    }
  };

  // 🚀 End cycle → redirect to StartCycle
  useEffect(() => {
    if (step === 'end') {
      const timer = setTimeout(() => {
        navigation.replace('StartCycle');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, navigation]);

  // 📌 Add a new student (dummy data)
  const handleStudentScan = () => {
    const newStudent = `Student ${students.length + 1}`;
    setStudents(prev => [...prev, newStudent]);
  };

  return (
    <View style={styles.container}>
      {step === 'ready' && (
        <>
          <Text style={styles.status}>Ready to scan</Text>
          <Text style={styles.instruction}>⬇️ Tap button to simulate scan</Text>
        </>
      )}

      {step === 'class' && (
        <>
          <View style={styles.cardBox}>
            <Text style={styles.cardText}>
              <Text style={{ fontWeight: '700' }}>Class Card </Text> Class Room
            </Text>
          </View>
          <Text style={styles.instruction}>Next: Scan Staff Card</Text>
        </>
      )}

      {step === 'staff' && (
        <>
          <View style={styles.cardBox}>
            <Text style={styles.cardText}>
              <Text style={{ fontWeight: '700' }}>Class Card </Text> Class Room
            </Text>
          </View>
          <View style={styles.cardBox}>
            <Text style={styles.cardText}>
              <Text style={{ fontWeight: '700' }}>Staff Card </Text> Teacher
              Name
            </Text>
          </View>
          <Text style={styles.instruction}>Next: Scan Students One by One</Text>
        </>
      )}

      {step === 'student' && (
        <>
          {/* Present Students List */}
          <Text style={styles.counterText}>
            Present Students: {students.length}
          </Text>

          <FlatList
            data={students}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.studentItem}>{item} - Present</Text>
            )}
            style={{ marginBottom: 15, width: '100%' }}
          />

          {/* Action Buttons */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={[styles.scanBtn, { backgroundColor: '#4caf50' }]}
              onPress={handleStudentScan}
            >
              <Text style={styles.scanBtnText}>Scan Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.scanBtn, { backgroundColor: '#333' }]}
              onPress={() => setStep('end')}
            >
              <Text style={styles.scanBtnText}>End Class</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {step === 'end' && (
        <>
          <View style={styles.cardBox}>
            <Text style={styles.cardText}>✅ Attendance Cycle Completed</Text>
          </View>
          <Text style={styles.instruction}>
            Redirecting to Start Cycle screen...
          </Text>
        </>
      )}

      {/* Dummy Scan Button for first 3 steps */}
      {step !== 'student' && step !== 'end' && (
        <TouchableOpacity style={styles.scanBtn} onPress={handleNext}>
          <Text style={styles.scanBtnText}>Simulate Card Scan</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 16,
  },
  status: { fontSize: 18, fontWeight: '600', marginBottom: 20 },
  instruction: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardBox: {
    backgroundColor: '#d6cfcf',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardText: { fontSize: 16, color: '#000' },
  scanBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  scanBtnText: { color: '#fff', fontWeight: '600' },
  counterText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  studentItem: { fontSize: 15, paddingVertical: 4, color: '#222' },
  btnRow: { flexDirection: 'row', marginTop: 10 },
});
