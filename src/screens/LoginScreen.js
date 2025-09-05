// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function LoginScreen({ navigation }) {
  const [institute, setInstitute] = useState("");
  const [option, setOption] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* Institute Dropdown */}
      <Text style={styles.label}>Select Institute</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={institute}
          onValueChange={(val) => setInstitute(val)}
        >
          <Picker.Item label="List of Institute" value="" />
          <Picker.Item label="College A" value="collegeA" />
          <Picker.Item label="College B" value="collegeB" />
        </Picker>
      </View>

      {/* Options Dropdown */}
      <Text style={styles.label}>Select Options</Text>
      <View style={styles.dropdown}>
        <Picker selectedValue={option} onValueChange={(val) => setOption(val)}>
          <Picker.Item label="Choose Option" value="" />
          <Picker.Item label="Teacher" value="teacher" />
          <Picker.Item label="Student" value="student" />
        </Picker>
      </View>

      {/* Login Form */}
      <Text style={styles.loginTitle}>Login Here</Text>

      <TextInput
        style={styles.input}
        placeholder="User name"
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

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.closeBtn]}
          onPress={() => navigation.replace("Splash")}
        >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.saveBtn]}
          onPress={() => navigation.replace("RfidSrartRegAtten")}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Register */}
      <TouchableOpacity onPress={() => alert("Register Screen Coming Soon!")}>
        <Text style={styles.registerText}>If college not register</Text>
        <Text style={styles.registerLink}>Register here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#eee" },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  dropdown: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  loginTitle: { fontSize: 18, fontWeight: "700", marginVertical: 15 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingVertical: 8,
    marginBottom: 20,
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 20 },
  button: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 6,
    alignItems: "center",
  },
  closeBtn: { backgroundColor: "#ffb3b3" },
  saveBtn: { backgroundColor: "#ff8080" },
  buttonText: { color: "#000", fontWeight: "600" },
  registerText: { textAlign: "center", marginTop: 10, fontSize: 14, color: "#333" },
  registerLink: {
    textAlign: "center",
    marginTop: 5,
    color: "red",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
