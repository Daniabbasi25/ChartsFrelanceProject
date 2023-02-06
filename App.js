import { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import { useAtomValue } from "jotai";
import { Amplify } from 'aws-amplify';

const Stack = createNativeStackNavigator();

import Login from "./screens/Login/Login";
import Home from "./screens/Home/Home";
import client from "./api/apollo.config";
import Appointment from "./screens/Appointment/Appointment";
import CodeVerification from "./screens/Login/CodeVerification";

import { AuthState } from "./state/atoms";
import useAuth from "./hooks/useAuth";
import Loading from "./screens/Loading/Loading";
import AppointmentEnded from "./screens/AppointmentEnded/AppointmentEnded";
import ScheduledAppointment from "./screens/ScheduledAppointment/ScheduledAppointment";
import NonScheduledAppointment from "./screens/NonScheduledAppointment/NonScheduledAppointment";
import ScheduledConfirmation from "./screens/ScheduledConfirmation/ScheduledConfirmation";
import NonScheduledConfirmation from "./screens/NonScheduledConfirmation/NonScheduledConfirmation";

Amplify.configure({
  Auth: {
    identityPoolId: "eu-west-3:02acb679-29db-4546-a6c8-f7955e25d244",
    region: "eu-west-3",
    userPoolId: "eu-west-3_dAwi5Qjpe",
    userPoolWebClientId: "2r6ohpluultaepukvgn6rk78t5",
  },
  Storage: {
    AWSS3: {
      bucket: "mobilitycare-dev",
      region: "eu-west-3",
    },
  },
});

export default function App() {
  const isAuth = useAtomValue(AuthState);
  const { loading, getAuthenticatedUser } = useAuth();

  const setScreenOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  };

  useEffect(() => {
    setScreenOrientation();
    getAuthenticatedUser();
  }, []);

  const theme = extendTheme({
    colors: {
      primary: {
        50: "#ECFFFD",
        100: "#C0FFF8",
        200: "#95FFF3",
        300: "#6AFFEE",
        400: "#3EFCE7",
        500: "#27DAC6",
        600: "#14B8A6",
        700: "#069686",
        800: "#007467",
        900: "#005249",
      },
      background: {
        grey: "#D9D9D94D"
      },
      text: {
        "blue-magenta": "#5F5F7D",
        basic: "#222222CC",
      },
    },
  });

  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="login"
          >
            {loading ? (
              <Stack.Screen name="loading" component={Loading} />
            ) : (
              <>
                {!isAuth ? (
                  <>
                    <Stack.Screen name="login" component={Login} />
                    <Stack.Screen
                      name="Verification"
                      component={CodeVerification}
                    />
                  </>
                ) : (
                  <>
                    <Stack.Screen name="home" component={Home} />
                    <Stack.Screen name="appointment" component={Appointment} />
                    <Stack.Screen name="appointmentEnded" component={AppointmentEnded} />
                    <Stack.Screen name="scheduled" component={ScheduledAppointment} />
                    <Stack.Screen name="scheduledConfirmation" component={ScheduledConfirmation} />
                    <Stack.Screen name="nonScheduled" component={NonScheduledAppointment} />
                    <Stack.Screen name="nonScheduledConfirmation" component={NonScheduledConfirmation} />
                  </>
                )}
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
