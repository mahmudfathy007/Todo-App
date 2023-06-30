import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const baseUrl = "http://192.168.1.2:3000"; 

// ... imports

export default function Login({ onLogin, toggleLogin }) {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/Authtodo/signIn`, {
        userName,
        password,
      });

      if (response.status === 200 && response.data.token) {
        const message = response.data.message;
        console.log(`Hello Mr ${userName}`);
        onLogin(userName);
      } else if (response.data.message === "userName is not registered") {
        setErrorMessage("User does not exist");
      } else if (response.data.message === "Incorrect password") {
        setErrorMessage("Incorrect password");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error logging in");
    }
  };

  const toggleSignUp = () => {
    toggleLogin();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={userName}
          onChangeText={text => setUserName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      {errorMessage !== "" && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleSignUp}>
          <Text style={styles.toggleButtonText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ... styles


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
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
    fontSize: 14,
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});
