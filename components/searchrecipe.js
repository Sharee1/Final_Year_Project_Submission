import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
} from "react-native";
import api from "../connection/api";

export default function SearchRecipe({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [foundDish, setFoundDish] = useState(null);
  const [error, setError] = useState(null);

  const dishes = [
    {
      id: 1,
      name: "Pasta",
      description: "Delicious pasta dish",
      ingredients: "Pasta, sauce, cheese",
    },
    // Add more dishes as needed
  ];

  const handleSearch = () => {
    if (!searchText.trim()) {
      setError("Please enter a dish to search.");
      return;
    }

    api
      .get(`myapp/api/recipe/getrecipe/${searchText.toLowerCase()}`)
      .then((response) => {
        const DishDetails = response.data;
        navigation.navigate("DishDetails", { DishDetails });
      })
      .catch((error) => {
        console.log(error);
        // Handle case when dish is not found
        setShowDetails(false);
        setFoundDish(null);
        Alert.alert(
          "Dish Not Found",
          "Sorry, the dish you searched for is not in our database."
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Discover Delicious Recipes</Text>
      <Text style={styles.subheading}>Search for your favorite dish</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a dish..."
        onChangeText={(text) => {
          setSearchText(text);
          setError(null); // Clear error when text changes
        }}
        value={searchText}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {showDetails ? (
        <View>
          {dishes.map((dish) => (
            <TouchableOpacity
              key={dish.id}
              onPress={() => navigateToDetails(dish)}
            >
              <Text style={styles.dishItem}>{dish.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}

      {/* Logo image */}
      <Image
        source={require("../assets/recipe.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    justifyContent: "center",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  searchBar: {
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  dishItem: {
    fontSize: 18,
    marginBottom: 8,
    color: "blue",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  logo: {
    width: "80%",
    height: 200,
    alignSelf: "center",
    marginTop: 20,
  },
});


