import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import { getData } from "../localStorage/localStorage";
import api from "../connection/api";

export default function Default({ navigation }) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchDataWithAuthentication(); // Call fetchDataWithAuthentication when component mounts
    fadeIn(); // Start fade-in animation
  }, []);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fetchDataWithAuthentication = async () => {
    try {
      const storedToken = await getData("TOKEN"); // Retrieve the token from storage
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
    navigation.navigate(moduleName);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar style="black" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome to Culinary Magic</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.gridContainer}>
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => navigateToModule("scanner")}
          >
            <Image
              source={require("../assets/plan.jpg")}
              style={styles.itemIcon}
            />
            <Text style={styles.itemText}>Scan Item</Text>
            <Text style={styles.itemDescription}>Quickly scan items to add to your pantry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => navigateToModule("searchrecipe")}
          >
            <Image
              source={require("../assets/scan.jpg")}
              style={styles.itemIcon}
            />
            <Text style={styles.itemText}>Search Recipe</Text>
            <Text style={styles.itemDescription}>Discover new recipes based on ingredients you have</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => navigateToModule("subs")}
          >
            <Image
              source={require("../assets/substiute.jpg")}
              style={styles.itemIcon}
            />
            <Text style={styles.itemText}>Substitute Ingredient</Text>
            <Text style={styles.itemDescription}>Find alternatives for ingredients in your recipes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => navigateToModule("schedule")}
          >
            <Image
              source={require("../assets/schedule.jpg")}
              style={styles.itemIcon}
            />
            <Text style={styles.itemText}>Schedule Meal</Text>
            <Text style={styles.itemDescription}>Plan your meals in advance for a healthier lifestyle</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Start your culinary journey now!</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  headerContainer: {
    backgroundColor: "#fff",
    padding: 18,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  gridContainer: {
    flex: 1,
    padding: 16,
  },
  gridItem: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  itemIcon: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  footerContainer: {
    backgroundColor: "#333",
    paddingVertical: 12,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#fff",
  },
});

