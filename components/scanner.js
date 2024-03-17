// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Button,
//   Image,
//   ActivityIndicator,
// } from "react-native";
// import { Camera } from "expo-camera";
// import * as Permissions from "expo-permissions";
// import * as ImagePicker from "expo-image-picker";
// import { useWindowDimensions } from "react-native";
// import { LogBox } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import axios from "axios";
// LogBox.ignoreAllLogs();

// export default function Scanner({ navigation }) {
//   const { width } = useWindowDimensions();
//   const height = Math.round((width * 16) / 9);
//   const [hasPermission, setHasPermission] = useState(null);
//   const cameraRef = useRef(null);
//   const [images, setImages] = useState([]);
//   const [fetchedIngredients, setFetchedIngredients] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [image, setImage] = useState();

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const photo = await cameraRef.current.takePictureAsync();
//       setImages([...images, photo.uri]);
//       setImage(photo);
//     }
//   };

//   useEffect(() => {
//     if (fetchedIngredients) {
//       console.log("Fetched Ingredients: ", JSON.stringify(fetchedIngredients));
//       if (fetchedIngredients.length !== 0) {
//         navigation.navigate("recipesByIngredients", { fetchedIngredients });
//       }
//     }
//   }, [fetchedIngredients]);

//   useEffect(() => {
//     console.log("Images: ", JSON.stringify(images));
//   }, [images]);

//   const startFetchingIngredients = async () => {
//     try {
//       setLoading(true);
//       const list = [];
//       for (let i = 0; i < images.length; i++) {
//         const ingredient = await uploadImage(images[i]);
//         list.push(ingredient.predicted_class);
//       }
//       setFetchedIngredients(list);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//     }
//   };

//   const uploadImage = async (uri) => {
//     try {
//       const imageData = {
//         uri: uri,
//         type: "image/jpeg",
//         name: "image.jpg",
//       };

//       const formData = new FormData();
//       formData.append("image", imageData);

//       const response = await axios.post("http://192.168.10.15:5000", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log(
//         "Image upload successful, Ingredient Fetched: ",
//         response.data
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       return null; // or handle error condition
//     }
//   };

//   const selectImage = async () => {
//     const status = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true,
//       quality: 1,
//     });

//     let newImages = [];
//     for (let i = 0; i < result.assets.length; i++) {
//       if (!result.cancelled) {
//         newImages.push(result.assets[i].uri);
//       }
//     }
//     setImages([...images, ...newImages]);
//   };

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="blue" />
//         <Text style={{ padding: 10 }}>Searching Recipes</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar style="light" />
//       <Camera
//         type={Camera.Constants.Type.back}
//         ref={cameraRef}
//         ratio="16:9"
//         style={[styles.camera, { height: height }]}
//       >
//         <View
//           style={{
//             width: "100%",
//             alignItems: "center",
//           }}
//         >
//           <ScrollView horizontal style={{ width: "100%" }}>
//             {images.map((image, index) => (
//               <Image
//                 key={index}
//                 source={{ uri: image }}
//                 style={{ width: 90, height: 90, margin: 5, borderRadius: 5 }}
//               />
//             ))}
//           </ScrollView>
//           <View style={styles.controls}>
//             <TouchableOpacity onPress={selectImage} style={styles.button}>
//               <Image
//                 source={require("../assets/gallery.png")}
//                 style={{ width: 35, height: 35 }}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={takePicture}
//               style={[styles.button, { width: 80, height: 80 }]}
//             >
//               <Image
//                 source={require("../assets/capture.png")}
//                 style={{ width: 50, height: 50 }}
//               />
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={startFetchingIngredients}
//               style={[styles.button, { backgroundColor: "#9CDE46" }]}
//             >
//               <Image
//                 source={require("../assets/accept.png")}
//                 style={{ width: 55, height: 55 }}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Camera>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     width: "100%",
//   },
//   camera: {
//     flex: 1,
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "flex-end",
//   },
//   controls: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "black",
//     width: "100%",
//   },
//   button: {
//     width: 55,
//     height: 55,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white",
//     borderRadius: 100,
//     margin: 20,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     textAlign: "center",
//   },
// });



import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { useWindowDimensions } from "react-native";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
LogBox.ignoreAllLogs();

export default function Scanner({ navigation }) {
  const { width } = useWindowDimensions();
  const height = Math.round((width * 16) / 9);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [images, setImages] = useState([]);
  const [fetchedIngredients, setFetchedIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImages([...images, photo.uri]);
      setImage(photo);
    }
  };

  useEffect(() => {
    if (fetchedIngredients) {
      console.log("Fetched Ingredients: ", JSON.stringify(fetchedIngredients));
      if (fetchedIngredients.length !== 0) {
        navigation.navigate("recipesByIngredients", { fetchedIngredients });
      }
    }
  }, [fetchedIngredients]);

  useEffect(() => {
    console.log("Images: ", JSON.stringify(images));
  }, [images]);

  const startFetchingIngredients = async () => {
    try {
      setLoading(true);
      const list = [];
      for (let i = 0; i < images.length; i++) {
        const ingredient = await uploadImage(images[i]);
        list.push(ingredient.predicted_class);
      }
      setFetchedIngredients(list);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const imageData = {
        uri: uri,
        type: "image/jpeg",
        name: "image.jpg",
      };

      const formData = new FormData();
      formData.append("image", imageData);

      const response = await axios.post("http://192.168.10.15:5000", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(
        "Image upload successful, Ingredient Fetched: ",
        response.data
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null; // or handle error condition
    }
  };

  const selectImage = async () => {
    const status = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    let newImages = [];
    for (let i = 0; i < result.assets.length; i++) {
      if (!result.cancelled) {
        newImages.push(result.assets[i].uri);
      }
    }
    setImages([...images, ...newImages]);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={{ padding: 10 }}>Searching Recipes</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Camera
          type={Camera.Constants.Type.back}
          ref={cameraRef}
          ratio="16:9"
          style={[styles.camera, { height: height }]}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <ScrollView horizontal style={{ width: "100%" }}>
              {images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={{ width: 90, height: 90, margin: 5, borderRadius: 5 }}
                />
              ))}
            </ScrollView>
            <View style={styles.controls}>
              <TouchableOpacity onPress={selectImage} style={styles.button}>
                <Image
                  source={require("../assets/gallery.png")}
                  style={{ width: 35, height: 35 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takePicture}
                style={[styles.button, { width: 80, height: 80 }]}
              >
                <Image
                  source={require("../assets/capture.png")}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={startFetchingIngredients}
                style={[styles.button, { backgroundColor: "#9CDE46" }]}
              >
                <Image
                  source={require("../assets/accept.png")}
                  style={{ width: 55, height: 55 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  camera: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    width: "100%",
  },
  button: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 100,
    margin: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
