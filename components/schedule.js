import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getData } from "../localStorage/localStorage";
import api from "../connection/api";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

export default function Schedule() {
  const [foodName, setFoodName] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigation = useNavigation(); 

  useEffect(() => {
    getAllMeals();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
  };

  const addMeal = async () => {
    if (foodName && selectedDate) {
      const token = await getTokenData();
      if (!token) {
        Alert.alert(
          "Error",
          "Your session has expired. Please log in again.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
        return;
      }
      fetchDataWithAuthentication(token);
    } else {
      Alert.alert("Error", "Please enter a meal name and select a date.");
    }
  };

  const fetchDataWithAuthentication = async (token) => {
    const dateTime = JSON.stringify(selectedDate).slice(1, 11) + "T18:00:00";
    try {
      const response = await api.post(
        "/myapp/api/addSchedule",
        { dateTime, foodName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllMeals();
      scheduleNotification();
      Alert.alert("Success", "Meal added successfully!");
      console.log("Data Saved successfully:", response.data);
    } catch (error) {
      console.log("Error fetching data:", error.response.data);
      Alert.alert("Error", "Failed to add meal. Please try again.");
    }
  };

  const getTokenData = async () => {
    try {
      const tokenData = await getData("TOKEN");
      return tokenData;
    } catch (error) {
      console.error("Error fetching token data:", error);
    }
  };

  const getAllMeals = async () => {
    const token = await getTokenData();
    try {
      const response = await api.get("/myapp/api/findAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Data Retrieved:", response.data);
      setSchedule(response.data);
    } catch (error) {
      console.log("Error fetching data:", error.response.data);
    }
  };

  const deleteMeal = async (id) => {
    const token = await getTokenData();
    try {
      const response = await api.post(
        `/myapp/api/delete/id/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllMeals();
      Alert.alert("Success", "Meal deleted successfully!");
      console.log("Deleted Meal successfully:", response.data);
    } catch (error) {
      console.log("Error fetching data:", error.response.data);
      Alert.alert("Error", "Failed to delete meal. Please try again.");
    }
  };

  const scheduleNotification = async () => {
    // Code to schedule notification goes here
  };

  const convertDateTime = (date) => {
    const dateString = date;
    const dateObject = new Date(dateString);
    return dateObject;
  };

  return (
    <ImageBackground
      source={require("../assets/bb.jpg")}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Welcome to Meal Scheduler</Text>
        <Text style={styles.description}>
          Schedule your meals and never miss a delicious dish!
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Meal Name"
            placeholderTextColor="white"
            value={foodName}
            onChangeText={setFoodName}
          />
          <TouchableOpacity style={styles.button} onPress={showDatePicker}>
            <Text style={styles.buttonText}>
              {selectedDate ? selectedDate.toLocaleTimeString() : "Select Time"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button1} onPress={addMeal}>
          <Text style={styles.buttonText}>Add Meal</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {schedule.length > 0 && (
          <View style={styles.scheduleContainer}>
            <Text style={styles.scheduleHeading}>Your Schedule:</Text>
            {schedule.map((item, index) => (
              <View style={styles.scheduleItem} key={index}>
                <View>
                  <Text style={styles.mealName}>{item.foodName}</Text>
                  <Text style={styles.dateTime}>
                    {convertDateTime(item.dateTime).toLocaleTimeString()} on{" "}
                    {convertDateTime(item.dateTime).toLocaleDateString()}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => deleteMeal(item.id)}
                  style={styles.deleteButton}
                >
                  <Text style={{ color: "white" }}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "transparent",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  description: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    fontSize: 16,
    flex: 1,
    color: "white",
  },
  button: {
    backgroundColor: "#efefef",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginLeft: 10,
    borderRadius: 5,
  },
  button1: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  scheduleContainer: {
    marginTop: 20,
  },
  scheduleHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  scheduleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  mealName: {
    fontWeight: "bold",
    color: "white",
  },
  dateTime: {
    color: "white",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
});
