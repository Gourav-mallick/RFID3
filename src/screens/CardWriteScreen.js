import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function RegisterCardScreen() {
  const [writeOption, setWriteOption] = useState('new');
  const [userType, setUserType] = useState('staff');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  // Dummy data for staff, students, and classes
  const staffList = [
    { id: 'S101', name: 'John Doe' },
    { id: 'S102', name: 'Alice Smith' },
    { id: 'S103', name: 'Bob Johnson' },
  ];

  const studentList = [
    { id: 'ST201', name: 'Rohan Gupta' },
    { id: 'ST202', name: 'Sneha Sharma' },
    { id: 'ST203', name: 'Aarav Kumar' },
  ];

  const classList = [
    { id: 'C301', name: 'Class A' },
    { id: 'C302', name: 'Class B' },
    { id: 'C303', name: 'Class C' },
  ];

  // Select list based on userType
  let users = [];
  if (userType === 'staff') users = staffList;
  else if (userType === 'student') users = studentList;
  else if (userType === 'class') users = classList;

  // Filter users by search
  const filteredUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {/* Write Card Options */}
      <Text style={styles.subtitle}>Write Card</Text>
      <View style={styles.row}>
        {['new', 'rewrite', 'blank', 'add', 'del'].map(opt => (
          <TouchableOpacity
            key={opt}
            style={styles.radioContainer}
            onPress={() => setWriteOption(opt)}
          >
            <View
              style={[
                styles.radioCircle,
                writeOption === opt && styles.radioSelected,
              ]}
            />
            <Text style={styles.radioLabel}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* User Type */}
      <Text style={styles.subtitle}>User Type</Text>
      <View style={styles.row}>
        {['staff', 'student', 'class'].map(type => (
          <TouchableOpacity
            key={type}
            style={styles.radioContainer}
            onPress={() => {
              setUserType(type);
              setSelectedUser(''); // reset selected user when type changes
            }}
          >
            <View
              style={[
                styles.radioCircle,
                userType === type && styles.radioSelected,
              ]}
            />
            <Text style={styles.radioLabel}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search + Picker */}
      <Text style={styles.subtitle}>Select User Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by name or ID"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.dropdown}>
        <Picker
          selectedValue={selectedUser}
          onValueChange={val => setSelectedUser(val)}
        >
          <Picker.Item label="Select User" value="" />
          {filteredUsers.map(u => (
            <Picker.Item
              key={u.id}
              label={`${u.name} (${u.id})`}
              value={u.id}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#eee', 
    padding: 20 

  },
  subtitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginTop: 15, 
    marginBottom: 8 

  },
  row: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginBottom: 10 

  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 8,
  },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  radioSelected: { 
    backgroundColor: '#ff6666' 
  },
  radioLabel: { 
    fontSize: 14, 
    color: '#222'
   },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
});
