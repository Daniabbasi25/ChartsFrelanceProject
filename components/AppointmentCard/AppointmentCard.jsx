import { useEffect, useState } from "react";
import { Box, VStack, Text, Divider, Pressable, Button } from "native-base";
import { parseISO, format } from "date-fns";
import { useAtomValue } from "jotai";

import { fr } from "date-fns/locale";

import { UserState } from "../../state/atoms";

const AppointmentCard = ({ navigation }) => {
  const user = useAtomValue(UserState);
  const [appointment, setAppointment] = useState(undefined);

  const goToAppointment = () => {
    navigation.navigate("appointment", {
      appointment,
    });
  };

  useEffect(() => {
    if (user) {
      // console.log(user.schedule.slots);
      setAppointment(user.schedule.slots[0]?.appointments[0]);
    }
  }, [user]);

  return (
    <VStack h="50%" pt="30px">
      <Text fontSize="md" color="gray.500">
        Un rendez-vous est prévu pour ce patient
      </Text>
      <Divider width={300} mt={"10px"} />

      {appointment ? (
        <Box
          w={395}
          h={205}
          mt={25}
          rounded="lg"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "F6F9FC",
          }}
        >
          <VStack
            p="4"
            space={3}
            backgroundColor="#F6F9FC"
            width="100%"
            height="100%"
          >
            <Text>Prochain rendez-vous prévu le :</Text>
            <Text>
              {format(parseISO(appointment.start), "EEEE d LLLL yyyy à HH:mm", {
                locale: fr,
              })}
            </Text>
            <Text> Avec {appointment.patient.name[0].text}</Text>
            <Button w={160} ml={200} mt={25} onPress={goToAppointment}>Demarrer</Button>
          </VStack>
        </Box>
      ) : (
        <Box pt={7}>
          <Text>Aucune consultation prevue</Text>
        </Box>
      )}
    </VStack>
  );
};

export default AppointmentCard;
