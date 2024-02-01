import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Login from "./components/login";
import Signup from "./components/signup";
import HomePage from "./components/default";
import SearchRecipe from "./components/searchrecipe";
import Subs from "./components/subs";
import Schedule from "./components/schedule";
import Scanner from "./components/scanner";
import DishDetails from "./components/dishDetails";
import { getData, saveData } from "./localStorage/localStorage";
import RecipesByIngredients from "./components/recipesByIngredients";

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchToken = async () => {
    console.log(2);

    const token = await getData("TOKEN");
    console.log(token);
    if (token === "NULL") {
      setInitialRoute("login");
    } else {
      setInitialRoute("default");
    }
  };

  useEffect(() => {
    console.log(1);
    fetchToken();
  }, []);

  useEffect(() => {
    if (initialRoute) {
      console.log(3);
      setLoading(false);
    }
  }, [initialRoute]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen
          name="default"
          component={HomePage}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "black",
            headerRight: () => <LogoutButton />,
          }}
        />
        <Stack.Screen name="searchrecipe" component={SearchRecipe} />
        <Stack.Screen
          name="recipesByIngredients"
          component={RecipesByIngredients}
        />
        <Stack.Screen name="subs" component={Subs} />
        <Stack.Screen name="schedule" component={Schedule} />
        <Stack.Screen
          name="scanner"
          component={Scanner}
          options={{
            title: "Scanner",
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

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    saveData("TOKEN", "NULL");
    navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text
        style={{
          fontWeight: "bold",
          color: "red",
          paddingHorizontal: 20,
        }}
      >
        Log out
      </Text>
    </TouchableOpacity>
  );
};
