import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import api from "../connection/api";
import { getData, saveData } from "../localStorage/localStorage";
import { useNavigation } from "@react-navigation/native";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (text) => {
    setUsername(text.toLowerCase());
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    api
      .post("myapp/api/auth/signin", { username, password })
      .then((response) => {
        const token = response.data.token;
        saveData("TOKEN", token);
        navigation.reset({
          index: 0,
          routes: [{ name: "default" }],
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome!</Text>
      <Text style={styles.subheading}>Sign into Continue</Text>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        onChangeText={(text) => handleUsernameChange(text)}
      ></TextInput>
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Password"
        onChangeText={(text) => handlePasswordChange(text)}
      ></TextInput>
      {/* <Text style={styles.Forgot}>Forgot Password ? </Text> */}
      {/* <View style={styles.buttonContainer}>
        <Button title="Login" color="#f5d90a" button onPress={handleLogin} />
      </View> */}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.txt}>Login</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate("signup")}
        style={styles.SignUp}
      >
        <Text>Sign up </Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate("signup")}
      >
        <Text style={[styles.txt, { color: "black" }]}>
          Register an Account?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
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
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
    color: "grey",
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
  txt: {
    fontWeight: "bold",
    alignSelf: "center",
    color: "white",
  },
  // Passwordhead: {
  //   color: "grey",
  //   fontSize: 20,
  //   paddingTop: 20,
  //   paddingLeft: 20,
  //   fontWeight: "bold",
  // },
  // inputpassword: {
  //   marginLeft: 20,
  //   paddingLeft: 10,
  //   borderWidth: 1.4,
  //   borderRadius: 4,
  //   height: 40,
  //   width: 350,
  //   marginTop: 5,
  // },
  // Forgot: {
  //   color: "black",
  //   fontWeight: "bold",
  //   marginLeft: 250,
  //   paddingTop: 10,
  // },
  // buttonback: {
  //   alignSelf: "center",
  //   backgroundColor: "yellow",
  //   height: 50,
  //   width: 150,
  //   borderRadius: 45,
  //   borderRadius: 10,
  //   marginTop: 90,
  // },

  // Login: {
  //   color: "black",
  //   marginTop: -45,
  //   marginLeft: "200",
  //   fontWeight: "bold",
  //   fontSize: 30,
  // },
  // buttonContainer: {
  //   width: 370,
  //   height: 50,
  //   alignSelf: "center",
  //   marginTop: 40,
  //   fontWeight: "bold",
  //   fontSize: 40,
  // },
  // SignUp: {
  //   color: "black",
  //   fontWeight: "bold",
  //   marginLeft: 310,
  //   paddingTop: -5,
  //   fontSize: 20,
  // },
  // Signtext: {
  //   color: "black",
  //   fontSize: 30,
  //   alignSelf: "flex-start",
  //   paddingLeft: 20,
  //   paddingTop: 0,
  //   fontWeight: "bold",
  // },
  // usernamehead: {
  //   color: "grey",
  //   fontSize: 20,
  //   paddingTop: 50,
  //   paddingLeft: 20,
  //   fontWeight: "bold",
  // },
  // inputuser: {
  //   marginLeft: 20,
  //   paddingLeft: 10,
  //   borderWidth: 1.4,
  //   borderRadius: 4,
  //   height: 40,
  //   width: 350,
  //   marginTop: 5,
  // },
};

export default Login;
