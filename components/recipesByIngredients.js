import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import api from "../connection/api";
import { Colors } from "react-native/Libraries/NewAppScreen";

const RecipesByIngredients = ({ route, navigation }) => {
  const { fetchedIngredients } = route.params;
  const ingredients = ["Butter"]; //Dymmy Data
  // const ingredients = fetchedIngredients; // Data Fetched from api

  const [recipesList, setRecipesList] = useState([]);

  // console.log("ingredients: ", JSON.stringify(ingredients));

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = () => {
    const queryString = ingredients
      .map((ingredient) => `ingredients=${encodeURIComponent(ingredient)}`)
      .join("&");

    api
      .get(`/myapp/api/recipe/getRecipesByIngredients?${queryString}`)
      .then((response) => {
        const recipes = response.data;
        setRecipesList(recipes);
        console.log("Recipes Recieved: ", JSON.stringify(recipes));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recipes</Text>
      <FlatList
        data={recipesList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.recipeItem}
              onPress={() => {
                navigation.navigate("DishDetails", { DishDetails: item });
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{item.recipeName}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  recipeItem: {
    flexDirection: "row",
    // height: 45,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
  },
});

export default RecipesByIngredients;
