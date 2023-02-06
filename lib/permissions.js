import { Platform, PermissionsAndroid } from "react-native";

export const requestPermissions = async () => {
  try {
    const cameraGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Permission Caméra",
        message: "eCabinet a besoin d'accéder à votre caméra",
        buttonNeutral: "Me demander ultérieurement",
        buttonNegative: "Annuler",
        buttonPositive: "OK",
      }
    );

    if (cameraGranted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }

    const micGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "Permission Microphone",
        message: "eCabinet a besoin d'accéder à votre microphone",
        buttonNeutral: "Me demander ultérieurement",
        buttonNegative: "Annuler",
        buttonPositive: "OK",
      }
    );

    if (micGranted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the microphone");
    } else {
      console.log("Camera permission denied");
    }
  } catch (error) {
    console.warn(error);
  }
};
