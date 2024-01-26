import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "../connection/api";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text.toLowerCase());
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleUsernameChange = (text) => {
    setUsername(text.toLowerCase());
  };

  const handleSignUp = (text) => {
    api
      .post("myapp/api/auth/users/signup", { email, password, username })
      .then((response) => {})
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <View>
      <Text style={styles.heading}>Getting Started!</Text>

      <Text style={styles.subheading}>Create an account to Continue</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder=" Enter Your Email"
        style={styles.input}
        onChangeText={(text) => handleEmailChange(text)}
      />

      <Text style={styles.label}>Username</Text>
      <TextInput
        placeholder=" Enter Your Username"
        style={styles.input}
        onChangeText={(text) => handleUsernameChange(text)}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder=" Enter Your Password "
        style={styles.input}
        onChangeText={(text) => handlePasswordChange(text)}
      />

      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <Text style={styles.existingAccountText}>Already have an Account?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.signupText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 19,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -3,
    marginLeft: 19,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 20,
    color: "grey",
  },
  input: {
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 20,
    color: "grey",
    borderWidth: 1.4,
    borderRadius: 3,
    width: 350,
    height: 30,
  },
  existingAccountText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 160,
    color: "grey",
  },
  button: {
    borderWidth: 1.4,
    borderRadius: 3,
    width: 350,
    height: 30,
    alignSelf: "center",
    backgroundColor: "yellow",
    height: 50,
    width: 150,
    borderRadius: 45,
    borderRadius: 10,
    marginTop: 60,
  },
  signupText: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: -55,
    alignSelf: "center",
    color: "grey",
  },
});
