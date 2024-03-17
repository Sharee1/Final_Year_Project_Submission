import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import api from "../connection/api";

export default function Subs() {
  const [ingredient, setIngredient] = useState("");
  const [error, setError] = useState("");
  const [animation] = useState(new Animated.Value(1));

  const findSubstitute = () => {
    if (!ingredient.trim()) {
      setError("Please enter an ingredient");
      return;
    }

    api
      .get(`myapp/api/ingredient/get/${ingredient.trim().toLowerCase()}`)
      .then((response) => {
        Alert.alert(
          "Substitute Found",
          `For ${ingredient.trim()}, you can use ${
            response.data.substitutesIngredients
          }.`
        );
        setError("");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          "Substitute Not Found",
          `Sorry, no substitute found for ${ingredient}.`
        );
        setError("");
      });
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
  
      <View style={styles.header}>
        <Text style={styles.heading}>Explore Exciting Ingredient Substitutes</Text>
        <Text style={styles.subheading}>
          Discover new flavors with alternative ingredients!
        </Text>
        <Text style={styles.subheading}>
          Don't limit yourself, experiment with your cooking!
        </Text>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Enter an ingredient..."
          onChangeText={(text) => setIngredient(text)}
          value={ingredient}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, { transform: [{ scale: animation }] }]}
          onPress={() => {
            findSubstitute();
            animateButton();
          }}
        >
          <Text style={styles.buttonText}>Find Substitute</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.5, // Adjust the opacity as needed
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginBottom: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
