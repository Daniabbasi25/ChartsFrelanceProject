import { useState } from "react";
import { useAtomValue } from "jotai";
import { VStack, HStack, Text, Divider, Pressable, Alert } from "native-base";

import Calendar from "../../assets/Icons/Calendar";
import FastClock from "../../assets/Icons/FastClock";
import { PatientState } from "../../state/atoms";

const AppointmentButtons = ({ navigation }) => {
  const patient = useAtomValue(PatientState);
  const [showAlert, setAlert] = useState(false);

  const goToScheduled = () => {
    if (patient) {
      navigation.navigate("scheduled");
    } else {
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  const goToNonScheduled = () => {
    if (patient) {
      navigation.navigate("nonScheduled");
    } else {
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 3500);
    }
  };

  return (
    <VStack space={3} h="50%">
      <Text fontSize="md" color="gray.500">
        Vous souhaitez organiser une consultation:
      </Text>
      <Divider width={330} />
      {showAlert ? (
        <Alert maxW="400" status="info" colorScheme="info" mt={60}>
          <Text>Veuillez identifier le patient.</Text>
        </Alert>
      ) : (
        <VStack
          borderWidth={1}
          borderRadius={15}
          width={390}
          px={60}
          py={30}
          borderStyle="dashed"
          borderColor="#7D7D7D"
        >
          <Pressable onPress={goToScheduled}>
            <HStack alignItems="center" space={3}>
              <Calendar />
              <Text fontWeight="bold" fontSize="xl" color="text.blue-magenta">
                Rendez-vous{"\n"}programmé
              </Text>
            </HStack>
          </Pressable>
          <Divider width={210} my={5} />
          <Pressable onPress={goToNonScheduled}>
            <HStack alignItems="center" space={3}>
              <FastClock />
              <Text fontWeight="bold" fontSize="xl" color="text.blue-magenta">
                Rendez-vous{"\n"}non programmé
              </Text>
            </HStack>
          </Pressable>
        </VStack>
      )}
    </VStack>
  );
};

export default AppointmentButtons;
