import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { useWindowDimensions } from "react-native";

import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
LogBox.ignoreAllLogs();

export default function Scanner() {
  const { width } = useWindowDimensions();
  const height = Math.round((width * 16) / 9);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [images, setImages] = useState([]);

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
    }
  };

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  // const handleBarCodeScanned = ({ data }) => {
  //   setScanned(true);
  //   // Handle scanned data here, such as sending it to your backend.
  //   alert(`Food item with barcode ${data} has been scanned!`);
  // };

  // const startScanning = () => {
  //   setScanned(false);
  // };

  // if (hasPermission === null) {
  //   return <Text>Requesting camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

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

  return (
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
              // onPress={startScanning}
              style={[styles.button, { backgroundColor: "#9CDE46" }]}
            >
              <Image
                source={require("../assets/accept.png")}
                style={{ width: 55, height: 55 }}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={startScanning} style={styles.button}>
              <Image
                source={require("../assets/qr-scan.png")}
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
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
