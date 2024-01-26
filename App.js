import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/login";
import Signup from "./components/signup";
import HomePage from "./components/default";
import SearchRecipe from "./components/searchrecipe";
import Subs from "./components/subs";
import Schedule from "./components/schedule";
import Scanner from "./components/scanner";
import DishDetails from "./components/dishDetails";
import { useEffect, useState } from "react";
import { getData } from "./localStorage/localStorage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={getData("TOKEN") !== "" ? "default" : "login"}
      >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="default" component={HomePage} />
        <Stack.Screen name="searchrecipe" component={SearchRecipe} />
        <Stack.Screen name="subs" component={Subs} />
        <Stack.Screen name="schedule" component={Schedule} />
        <Stack.Screen
          name="scanner"
          component={Scanner}
          options={{
            // headerShown: false,
            title: "Scanner", // Set a custom header title
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen name="DishDetails" component={DishDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
