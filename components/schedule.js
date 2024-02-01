import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getData } from "../localStorage/localStorage";
import api from "../connection/api";
import { ScrollView } from "react-native-gesture-handler";

export default function Schedule() {
  const [foodName, setfoodName] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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

  const addMeal = () => {
    if (foodName && selectedDate) {
      console.log(selectedDate);
      fetchDataWithAuthentication();
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

  const fetchDataWithAuthentication = async () => {
    const token = await getTokenData();
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
      console.log("Data Saved successfully:");
    } catch (error) {
      console.log("Error fetching data:", error.response.data);
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
      console.log("Data Retrieved: ", response.data);
      setSchedule(response.data);
    } catch (error) {
      console.log("Error fetching data:", error.response.data);
    }
  };

  const deleteMeal = async (id) => {
    const token = await getTokenData();
    console.log(token, `/myapp/api/delete/id/${id}`);
    try {
      console.log("1");
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
      console.log("Deleted Meal successfully: ", response.data);
    } catch (error) {
      console.log("Error fetching data:", error.response.data);
    }
  };

  const convertDateTime = (date) => {
    const dateString = date;
    const dateObject = new Date(dateString);
    return dateObject;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Schedule Your Meals</Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TextInput
          style={styles.input}
          placeholder="Enter Meal Name"
          value={foodName}
          onChangeText={(text) => setfoodName(text)}
        />
        <TouchableOpacity style={styles.button} onPress={showDatePicker}>
          <Text style={[styles.buttonText, { color: "black" }]}>
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
                <Text style={{ fontWeight: "bold" }}>{item.foodName}</Text>
                <Text style={{ color: "grey" }}>
                  {convertDateTime(item.dateTime).toLocaleTimeString()} on{" "}
                  {convertDateTime(item.dateTime).toLocaleDateString()}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => deleteMeal(item.id)}
                style={{
                  backgroundColor: "#efefef",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "black" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    // justifyContent: "center",
    // alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    fontSize: 16,
    flex: 1,
    // marginBottom: 5,
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
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  scheduleContainer: {
    marginTop: 20,
  },
  scheduleHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scheduleItem: {
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
