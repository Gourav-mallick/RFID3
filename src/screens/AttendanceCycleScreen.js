// src/components/CardScanner.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReadyStep from '../components/attendance/AttendanceStep/ReadyStep';
import ClassStep from '../components/attendance/AttendanceStep/ClassStep';
import StaffStep from '../components/attendance/AttendanceStep/StaffStep';
import StudentStep from '../components/attendance/AttendanceStep/StudentStep';
import PrimaryButton from "../components/common/Button/PrimaryButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
// Dummy Student Data
const Students = [
  { id: 1, name: 'Aarav Kumar' },
  { id: 2, name: 'Sneha Sharma' },
  { id: 3, name: 'Rohan Gupta' },
  { id: 4, name: 'Priya Verma' },
  { id: 5, name: 'Arjun Mehta' },
];

export default function CardScanner({ navigation }) {
  const [step, setStep] = useState('ready'); // ready → class → staff → student → end

  const [students, setStudents] = useState([]); // scanned students
  const [index, setIndex] = useState(0); // next student index
  const [showModal, setShowModal] = useState(false);

  const teacher = 'Mr. John Doe'; // dummy
  const classRoom = 'Class Room A'; // dummy


  // for practicas and delete data locly
  const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("All local storage cleared!");
  } catch (e) {
    console.error("Error clearing storage:", e);
  }
};

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
    if (index < Students.length) {
      const newStudent = Students[index];
      setStudents([...students, newStudent]);
      setIndex(index + 1);
    }
  };
//handle Back To Register card screen
const handleBackToRegister =()=>{
           navigation.navigate('RfidSrartRegAtten');
}
  // End cycle and go back to StartCycle
  const handleEndClass = () => {
    setStep('end');
  };

  const onConfirmEnd =()=>{
              setShowModal(false);
              navigation.navigate('ClassDetails');
  }

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
      <PrimaryButton title={"Back to Register card"} onPress={handleBackToRegister} />
      <PrimaryButton title={"clear localy data"} onPress={clearStorage} />
      {/* READY */}
      {step === 'ready' && (
        <>
          <ReadyStep onPress={handleNext}/>
        </>
       
      )}

      {/* CLASS CARD */}
      {step === 'class' && (
       <ClassStep onPress={handleNext} classRoom={classRoom}/>
      )}

      {/* STAFF CARD */}
      {step === 'staff' && (
        <>
         <StaffStep onPress={handleNext} classRoom={classRoom} teacher={teacher}/>
        </>
      )}

      {/* STUDENTS */}
      {step === 'student' && (

        <>
        <StudentStep students={students} teacher={teacher} classRoom={classRoom} handleStudentScan={handleStudentScan} handleEndClass={handleEndClass} showModal={showModal} setShowModal={setShowModal} onConfirmEnd={onConfirmEnd}/>

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
