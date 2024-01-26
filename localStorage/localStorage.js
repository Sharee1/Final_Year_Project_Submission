import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (token, value) => {
  try {
    console.log("Token Saved locally");
    await AsyncStorage.setItem(token, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const getData = async (token) => {
  try {
    const value = await AsyncStorage.getItem(token);
    console.log("Token Called");
    if (value != null) {
      return JSON.parse(value);
    } else {
    }
  } catch (error) {
    console.error(error);
  }
};
