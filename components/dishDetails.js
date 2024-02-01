// DishDetails.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DishDetails({ route }) {
  const { DishDetails } = route.params;

  // console.log(DishDetails);
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{DishDetails.recipeName}</Text>
      <Text style={styles.description}>
        Description: {DishDetails.description}
      </Text>
      <Text style={styles.ingredients}>
        Total Ingredients: {DishDetails.totalIngredients}
      </Text>
      <Text style={styles.ingredients}> </Text>
      <Text style={styles.ingredients}>Ingredients: </Text>
      {DishDetails.ingredientsRequired.map((item, index) => {
        return (
          <Text key={index} style={styles.ingredients}>
            {item}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    marginBottom: 8,
  },
  ingredients: {
    fontSize: 16,
  },
});
