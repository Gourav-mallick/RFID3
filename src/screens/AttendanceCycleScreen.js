// src/components/CardScanner.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import ForceCloseModal from '../components/ForceCloseModal';
// Dummy Student Data
const dummyStudents = [
  { id: 1, name: 'Aarav Kumar' },
  { id: 2, name: 'Sneha Sharma' },
  { id: 3, name: 'Rohan Gupta' },
  { id: 4, name: 'Priya Verma' },
  { id: 5, name: 'Arjun Mehta' },
];

export default function CardScanner({ navigation }) {
  const [step, setStep] = useState('ready'); // ready → class → staff → student → end
  const [dateTime, setDateTime] = useState(new Date());
  const [students, setStudents] = useState([]); // scanned students
  const [index, setIndex] = useState(0); // next student index
  const [showModal, setShowModal] = useState(false);
  const teacher = 'Mr. John Doe'; // dummy
  const classRoom = 'Class Room A'; // dummy

  // Go to next step in flow
  const handleNext = () => {
    if (step === 'ready') {
      setStep('class');
      setStudents([]);
      setIndex(0);
    } else if (step === 'class') {
      setStep('staff');
    } else if (step === 'staff') {
      setStep('student');
    }
  };

  // Simulate scanning a student card
  const handleStudentScan = () => {
    if (index < dummyStudents.length) {
      const newStudent = dummyStudents[index];
      setStudents([...students, newStudent]);
      setIndex(index + 1);
    }
  };

  // End cycle and go back to StartCycle
  const handleEndClass = () => {
    setStep('end');
  };

  useEffect(() => {
    if (step === 'end') {
      const timer = setTimeout(() => {
        navigation.replace('AttendanceCycle');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, navigation]);

  return (
    <View style={styles.container}>
      {/* READY */}
      {step === 'ready' && (
        <>
          {/* Current Date Time */}
          <Text style={styles.dateText}>{dateTime.toLocaleString()}</Text>

          {/* Status */}
          <Text style={styles.status}>Ready to scan</Text>

          {/* Instruction */}
          <Text style={styles.instructionTitle}>Follow Instruction</Text>
          <Text style={styles.arrow}>⬇️</Text>
          <Text style={styles.instructionText}>
            1st tap class card {'\n'}
            2nd staff card {'\n'}3 student 1-1 {'\n'}
            and end by class card again
          </Text>

          <TouchableOpacity style={styles.scanBtn} onPress={handleNext}>
            <Text style={styles.scanBtnText}>Start Cycle</Text>
          </TouchableOpacity>
        </>
      )}

      {/* CLASS CARD */}
      {step === 'class' && (
        <>
          <Text style={styles.title}>Current Date Time</Text>
          <View style={styles.cardBox}>
            <Text style={styles.cardText}>
              <Text style={{ fontWeight: '700' }}>Class Card </Text> {classRoom}
            </Text>
          </View>
          <Text style={styles.instruction}>Next: Scan Staff Card</Text>
          <TouchableOpacity style={styles.scanBtn} onPress={handleNext}>
            <Text style={styles.scanBtnText}>Scan Staff</Text>
          </TouchableOpacity>
        </>
      )}

      {/* STAFF CARD */}
      {step === 'staff' && (
        <>
          <Text style={styles.title}>Current Date Time</Text>
          <View style={styles.cardBox}>
            <Text style={styles.cardText}>
              <Text style={{ fontWeight: '700' }}>Staff Card </Text> {teacher}
            </Text>
          </View>
          <Text style={styles.instruction}>Next: Scan Students One by One</Text>
          <TouchableOpacity style={styles.scanBtn} onPress={handleNext}>
            <Text style={styles.scanBtnText}>Start Students</Text>
          </TouchableOpacity>
        </>
      )}

      {/* STUDENTS */}
      {step === 'student' && (
        <>
          <Text style={styles.title}>Current Date Time</Text>
          <Text style={styles.counter}>
            Present Students: {students.length}
          </Text>

          {/* Student List */}
          <FlatList
            data={students}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cardBox}>
                <Text style={styles.cardText}>
                  <Text style={{ fontWeight: '700' }}>{item.name}</Text> -
                  Present
                </Text>
              </View>
            )}
          />

          {/* Teacher + Class Info */}
          <View style={styles.cardBox}>
            <Text style={styles.cardText}>
              <Text style={{ fontWeight: '700' }}>Teacher: </Text> {teacher}
            </Text>
          </View>
          <View style={styles.cardBox}>
            <Text style={styles.cardText}>
              <Text style={{ fontWeight: '700' }}>Class: </Text> {classRoom}
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={[styles.scanBtn, { backgroundColor: '#4caf50' }]}
              onPress={handleStudentScan}
            >
              <Text style={styles.scanBtnText}>Scan Student</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.scanBtn, { backgroundColor: '#e53935' }]}
              onPress={() => setShowModal(true)} // open popup
            >
              <Text style={styles.scanBtnText}>End Class</Text>
            </TouchableOpacity>
          </View>

          {/* Modal Component */}
          <ForceCloseModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={() => {
              setShowModal(false);
              navigation.navigate('ClassDetails');
            }}
          />
        </>
      )}

      {/* END */}
      {step === 'end' && (
        <Text style={styles.completed}>✅ Attendance Cycle Completed</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 10 
  },
  status: { 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 20 

  },
  instruction: { 
    fontSize: 14, 
    color: '#444', 
    marginVertical: 15 

  },
  cardBox: {
    backgroundColor: '#d6cfcf',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  cardText: { 
    fontSize: 16, 
    color: '#000' 

  },
  scanBtn: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff8080',
    borderRadius: 8,
  },
  scanBtnText: { 
    color: '#fff', 
    fontWeight: '700' },
  completed: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: 'green', 
    marginTop: 20 

  },
  counter: { 
    fontSize: 16, 
    fontWeight: '700', 
    marginBottom: 10 },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  scanBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  scanBtnText: { 
    color: '#fff', 
    fontWeight: '600' },
});
