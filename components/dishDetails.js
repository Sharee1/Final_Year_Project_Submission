import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function DishDetails({ route }) {
  const { DishDetails } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{DishDetails.recipeName}</Text>
      <Text style={styles.description}>
        {DishDetails.description}
      </Text>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Total Ingredients:</Text>
        <Text style={styles.info}>{DishDetails.totalIngredients}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Ingredients:</Text>
        <View style={styles.ingredientsContainer}>
          {DishDetails.ingredientsRequired.map((item, index) => (
            <Text key={index} style={styles.ingredients}>
              - {item}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  description: {
    fontSize: 18,
    marginBottom: 16,
    color: "#666",
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  info: {
    fontSize: 16,
    color: "#444",
  },
  ingredientsContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
  },
  ingredients: {
    fontSize: 16,
    marginBottom: 4,
    color: "#444",
  },
});


