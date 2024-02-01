import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (token, value) => {
  try {
    console.log("===========>Token Saved locally: ", JSON.stringify(value));
    await AsyncStorage.setItem(token, value);
  } catch (error) {
    console.error(error);
  }
};

export const getData = async (token) => {
  try {
    const value = await AsyncStorage.getItem(token);
    if (value != null) {
      // console.log("===========>Token Called: ", value);
      return value;
    } else {
    }
  } catch (error) {
    console.error(error);
  }
};
