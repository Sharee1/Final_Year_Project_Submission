
// import React, { useState } from "react";
// import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, Image } from "react-native"; // Import Image component
// import api from "../connection/api";
// import { getData, saveData } from "../localStorage/localStorage";
// import { useNavigation } from "@react-navigation/native";

// const Login = ({ navigation }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleUsernameChange = (text) => {
//     setUsername(text.toLowerCase());
//   };

//   const handlePasswordChange = (text) => {
//     setPassword(text);
//   };

//   const togglePasswordVisibility = () => {
//     setHidePassword(!hidePassword);
//   };

//   const handleLogin = () => {
//     api
//       .post("myapp/api/auth/signin", { username, password })
//       .then((response) => {
//         const token = response.data.token;
//         saveData("TOKEN", token);
//         navigation.reset({
//           index: 0,
//           routes: [{ name: "default" }],
//         });
//       })
//       .catch((error) => {
//         if (error.response && error.response.status === 401) {
//           setError("Username or password is incorrect.");
//         } else {
//           setError("An error occurred. Please try again later.");
//         }
//       });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Logo Image */}
//       <Image
//         source={require("../assets/logo.jpg")} // Specify the path to your logo image
//         style={styles.logo}
//       />

//       <Text style={styles.heading}>Welcome!</Text>
//       <Text style={styles.subheading}>Sign into Continue</Text>
//       <Text style={styles.label}>Username</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Your Name"
//         onChangeText={(text) => handleUsernameChange(text)}
//       />
//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Your Password"
//         onChangeText={(text) => handlePasswordChange(text)}
//         secureTextEntry={true}
//       />
//       {error ? <Text style={styles.errorText}>{error}</Text> : null}

//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.txt}>Login</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.button2}
//         onPress={() => navigation.navigate("signup")}
//       >
//         <Text style={[styles.txt, { color: "black" }]}>
//           Register an Account?
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = {
//   container: {
//     flexGrow: 1,
//     backgroundColor: "white",
//     justifyContent: "center",
//   },
//   heading: {
//     fontSize: 40,
//     fontWeight: "bold",
//     marginTop: 40,
//     marginLeft: 17,
//   },
//   subheading: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "grey",
//     marginLeft: 19,
//   },
//   logo: {
//     width: 100, // Adjust width as needed
//     height: 100, // Adjust height as needed
//     alignSelf: "center", // Center the image horizontally
//     marginTop: 20, // Add margin to separate from the heading
//   },
//   input: {
//     height: 45,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#cccccc",
//     backgroundColor: "white",
//     borderRadius: 5,
//     fontSize: 16,
//     marginHorizontal: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     fontWeight: "bold",
//     marginTop: 20,
//     marginLeft: 20,
//     color: "grey",
//   },
//   button: {
//     backgroundColor: "blue",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 5,
//     marginHorizontal: 20,
//     marginTop: 20,
//     marginVertical: 10,
//   },
//   button2: {
//     height: 45,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#cccccc",
//     borderRadius: 5,
//     fontSize: 16,
//     marginVertical: 10,
//     marginHorizontal: 20,
//   },
//   txt: {
//     fontWeight: "bold",
//     alignSelf: "center",
//     color: "white",
//   },
//   errorText: {
//     color: "red",
//     alignSelf: "center",
//     marginTop: 10,
//   },
// };

// export default Login;

// Import Image component from react-native
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import api from "../connection/api";
import { getData, saveData } from "../localStorage/localStorage";
import { useNavigation } from "@react-navigation/native";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (text) => {
    setUsername(text.toLowerCase());
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

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
        if (error.response && error.response.status === 401) {
          setError("Username or password is incorrect.");
        } else if (error.response && error.response.status === 409) {
          setError("Username already exists.");
        } else {
          setError("Username or password is incorrect.");
        }
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Use Image component to display the logo */}
      <Image
        source={require("../assets/logo.jpg")} // Specify the path to your logo image
        style={styles.logo} // Apply styles for logo
      />

      <Text style={styles.heading}>Welcome!</Text>
      <Text style={styles.subheading}>Sign in to Continue</Text>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        onChangeText={(text) => handleUsernameChange(text)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Password"
        onChangeText={(text) => handlePasswordChange(text)}
        secureTextEntry={true}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("signup")}
      >
        <Text style={[styles.buttonText, { color: "white" }]}>
          Register an Account
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    justifyContent: "center",
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
  logo: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    alignSelf: "center", // Center the image horizontally
    marginTop: 20, // Add margin to separate from the heading
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
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    alignSelf: "center",
    marginTop: 10,
  },
};

export default Login;

