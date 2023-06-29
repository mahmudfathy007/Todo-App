import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Login from "./login.js";
import Signup from "./signUp.js";

export default function Auth({ onLogin, onSignup }) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcom To Fakrni</Text>
      {isLogin ? (
        <Login onLogin={onLogin} toggleLogin={toggleLogin} />
      ) : (
        <Signup onSignup={onSignup} toggleLogin={toggleLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});