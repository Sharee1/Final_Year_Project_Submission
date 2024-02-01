// Default.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import api from "../connection/api";
import { getData, saveData } from "../localStorage/localStorage";
import { StatusBar } from "expo-status-bar";

export default function Default({ navigation }) {
  const fetchDataWithAuthentication = async () => {
    try {
      const storedToken = getData("TOKEN"); // Retrieve the token from storage
      const response = await api.get(
        "/myapp/api/ingredients/getAllIngredients",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      console.log("Data fetched successfully:", response.data);
    } catch (error) {
      console.log("Error fetching data:", error.response.data);
    }
  };

  const navigateToModule = (moduleName) => {
    // Use navigation to navigate to the specific module based on the module name
    // For simplicity, assuming module names match the screen names
    navigation.navigate(moduleName);
  };

  useEffect(() => {
    // fetchDataWithAuthentication();
  });

  return (
    <View style={styles.container}>
      <StatusBar style="black" />

      <View
        style={{
          color: "pink",
          width: "100%",
          alignItems: "flex-end",
        }}
      ></View>
      <View style={styles.grid}>
        {/* Scan Item */}
        <TouchableOpacity
          style={styles.module}
          onPress={() => navigateToModule("scanner")}
        >
          <Text style={styles.moduleText}>Scan Item</Text>
        </TouchableOpacity>

        {/* Search Recipe */}
        <TouchableOpacity
          style={styles.module}
          onPress={() => navigateToModule("searchrecipe")}
        >
          <Text style={styles.moduleText}>Search Recipe</Text>
        </TouchableOpacity>

        {/* Substitute */}
        <TouchableOpacity
          style={styles.module}
          onPress={() => navigateToModule("subs")}
        >
          <Text style={styles.moduleText}>Substitute</Text>
        </TouchableOpacity>

        {/* Schedule */}
        <TouchableOpacity
          style={styles.module}
          onPress={() => navigateToModule("schedule")}
        >
          <Text style={styles.moduleText}>Schedule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  module: {
    width: 150,
    height: 150,
    backgroundColor: "blue",
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  logoutBtn: {
    width: 100,
    padding: 10,
    backgroundColor: "red",
    marginTop: 16,
    marginHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  moduleText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
