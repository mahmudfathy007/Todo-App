import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import axios from 'axios';

const baseUrl = "http://192.168.1.2:3000"; // Replace with your server's base URL

export default function Signup({ onSignup, toggleLogin }) {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    if (userName.trim() === "" || password.trim() === "") {
      setErrorMessage("Please enter a userName and password");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/v1/Authtodo/signUp`, {
        userName,
        password,
      });

      if (response.status === 200) {
        // Signup successful
        const message = response.data.message;
        // Perform any necessary actions on successful signup
      } else {
        // Signup failed
        const message = response.data.message;
        setErrorMessage(message);
      }
    } catch (error) {
      // Error occurred during signup
      console.error(error);
      setErrorMessage("Error signing up");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="userName"
          value={userName}
          onChangeText={(text) => setuserName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {errorMessage !== "" && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleLogin}>
          <Text style={styles.toggleButtonText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  toggleButtonText: {
    color: "#333",
    fontSize: 16,
  },
});
