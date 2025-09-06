// src/screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [institute, setInstitute] = useState('');
  const [option, setOption] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Check if already logged in
  useEffect(() => {
    const checkSavedInstitute = async () => {
      const savedInstitute = await AsyncStorage.getItem('institute');
      if (savedInstitute) {
        navigation.replace('AttendanceCycle');
      }
    };
    checkSavedInstitute();
  }, []);

  const handleLogin = async () => {
    // Validate fields
    if (!institute || !option || !username || !password) {
      Alert.alert('Missing Info', 'Please fill all fields');
      return;
    }

    // Check credentials
    if (username === 'admin' && password === '123456') {
      // Save institute for future auto-login
      await AsyncStorage.setItem('institute', institute);
      navigation.replace('RfidSrartRegAtten');
    } else {
      Alert.alert('Invalid Credentials', 'Username or password is incorrect');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Institute</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={institute}
          onValueChange={val => setInstitute(val)}
        >
          <Picker.Item label="Select Institute" value="" />
          <Picker.Item label="College A" value="collegeA" />
          <Picker.Item label="College B" value="collegeB" />
        </Picker>
      </View>
{/*
      <Text style={styles.label}>Select Option</Text>
      <View style={styles.dropdown}>
        <Picker selectedValue={option} onValueChange={val => setOption(val)}>
          <Picker.Item label="Choose Option" value="" />
          <Picker.Item label="Teacher" value="teacher" />
          <Picker.Item label="Student" value="student" />
        </Picker>
      </View>
*/ }

      <Text style={styles.loginTitle}>Login Here</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, styles.saveBtn]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('Register Screen Coming Soon!')}>
        <Text style={styles.registerText}>If institute not Create LoginId and Password</Text>
        <Text style={styles.registerLink}>Create Username & Password here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#eee',
  },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  dropdown: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  loginTitle: { fontSize: 18, fontWeight: '700', marginVertical: 15 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 8,
    marginBottom: 20,
  },
  button: {
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveBtn: { backgroundColor: '#ff8080' },
  buttonText: { color: '#000', fontWeight: '600' },
  registerText: { textAlign: 'center', fontSize: 14, color: '#333' },
  registerLink: {
    textAlign: 'center',
    color: 'red',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
