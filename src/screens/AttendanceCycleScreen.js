// src/screens/AttendanceCycleScreen.js
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

export default function AttendanceCycleScreen({ navigation }) {
  const [step, setStep] = useState('ready'); // ready → class → staff → student
  const [classes, setClasses] = useState([]); // all open/ended class cycles
  const [currentClass, setCurrentClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Dummy teacher/class (replace with scanned values later)
  const teacher = 'Mr. John Doe';
  const classRoom = 'Class Room A';

  // Clear local storage
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("All local storage cleared!");
    } catch (e) {
      console.error("Error clearing storage:", e);
    }
  };

  // Handle step navigation
  const handleNext = () => {
    if (step === 'ready') {
      setStep('class');
      setStudents([]);
      setIndex(0);
    } else if (step === 'class') {
      setStep('staff');
    } else if (step === 'staff') {
      // Create new class cycle
      const newClass = {
        id: Date.now(),
        classRoom,
        teacher,
        students: [],
        active: true,
      };
      setClasses([...classes, newClass]);
      setCurrentClass(newClass);
      setStep('student');
    }
  };

  // Add student to current class
  const handleStudentScan = () => {
    if (index < Students.length && currentClass) {
      const newStudent = Students[index];
      const updated = classes.map(cls =>
        cls.id === currentClass.id
          ? { ...cls, students: [...cls.students, newStudent] }
          : cls
      );
      setClasses(updated);
      setStudents([...students, newStudent]);
      setIndex(index + 1);
    }
  };

  // Back to main register
  const handleBackToRegister = () => {
    navigation.navigate('RfidSrartRegAtten');
  };

  // End class → same navigation logic
  const handleEndClass = () => {
    setStep('end');
  };

  const onConfirmEnd = () => {
    setShowModal(false);

    // Mark class inactive
    setClasses(prev =>
      prev.map(cls =>
        cls.id === currentClass.id ? { ...cls, active: false } : cls
      )
    );

    navigation.navigate('ClassDetails');
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
      <PrimaryButton title={"Back to Register card"} onPress={handleBackToRegister} />
      <PrimaryButton title={"Clear local data"} onPress={clearStorage} />

      {/* READY */}
      {step === 'ready' && (
        <ReadyStep
          onPress={handleNext}
          openClasses={classes.filter(c => c.active)}
          onSelectClass={(cls) => {
            setCurrentClass(cls);
            setStudents(cls.students);
            setStep('student');
          }}
        />
      )}

      {/* CLASS */}
      {step === 'class' && (
        <ClassStep onPress={handleNext} classRoom={classRoom} />
      )}

      {/* STAFF */}
      {step === 'staff' && (
        <StaffStep onPress={handleNext} classRoom={classRoom} teacher={teacher} />
      )}

      {/* STUDENTS */}
      {step === 'student' && currentClass && (
        <StudentStep
          students={students}
          teacher={currentClass.teacher}
          classRoom={currentClass.classRoom}
          handleStudentScan={handleStudentScan}
          handleEndClass={handleEndClass}
          showModal={showModal}
          setShowModal={setShowModal}
          onConfirmEnd={onConfirmEnd}
          onStartNewClass={() => setStep('ready')}
        />
      )}

      {/* END */}
      {step === 'end' && (
        <Text style={styles.completed}>✅ Attendance Cycle Completed</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  completed: { fontSize: 18, fontWeight: '700', color: 'green', marginTop: 20 },
});
