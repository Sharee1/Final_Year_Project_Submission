import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import api from "../connection/api";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text.toLowerCase());
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleUsernameChange = (text) => {
    setUsername(text.toLowerCase());
  };

  const handleSignUp = () => {
    if (!email || !password || !username) {
      setError("All fields are required");
      setTimeout(() => {
        setError("");
      }, 5000); // Clear error after 5 seconds
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format");
      setTimeout(() => {
        setError("");
      }, 5000); // Clear error after 5 seconds
      return;
    }

    api
      .post("myapp/api/auth/users/signup", { email, password, username })
      .then((response) => {
        setSuccess("User registered successfully!");
        // Optionally, you can clear the form fields here
        setEmail("");
        setPassword("");
        setUsername("");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const { message } = error.response.data;
          setError(message);
          setTimeout(() => {
            setError("");
          }, 5000); // Clear error after 5 seconds
        } else {
          setError("An error occurred. Please try again later.");
          setTimeout(() => {
            setError("");
          }, 5000); // Clear error after 5 seconds
        }
      });
  };

  const validateEmail = (email) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        secureTextEntry={true}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {success ? <Text style={styles.successText}>{success}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.signupText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate("login")}
      >
        <Text style={[styles.signupText, { color: "black" }]}>
          Already have an Account?
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexGrow: 1,
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 17,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
    marginLeft: 19,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
    color: "grey",
  },
  input: {
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    backgroundColor: "white",
    borderRadius: 5,
    fontSize: 16,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 20,
    marginVertical: 10,
  },
  signupText: {
    fontWeight: "bold",
    alignSelf: "center",
    color: "white",
  },
  button2: {
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    fontSize: 16,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  errorText: {
    color: "red",
    alignSelf: "center",
    marginTop: 10,
  },
  successText: {
    color: "green",
    alignSelf: "center",
    marginTop: 10,
  },
});
