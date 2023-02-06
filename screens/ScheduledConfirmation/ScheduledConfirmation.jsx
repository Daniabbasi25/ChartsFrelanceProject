import { Box, Center, Heading, Text, Button } from "native-base";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

import MobilitycareHeading from "../../components/MobilitycareHeading/MobilitycareHeading";
import Dots from "../../components/Dots/Dots";

const ScheduledConfirmation = ({ navigation, route }) => {
  const { selectedSlot, doctor } = route.params;

  const goHome = () => {
    navigation.navigate("home");
  };

  return (
    <Box w="100%" h="100%">
      <Box position={"absolute"} right={0} bottom={0}>
        <Dots />
      </Box>
      <Box
        position={"absolute"}
        left={0}
        top={200}
        width={100}
        height={100}
        style={{
          transform: [
            {
              rotate: "180deg",
            },
          ],
        }}
      >
        <Dots />
      </Box>
      <Box
        justifyContent="flex-end"
        alignItems={"flex-start"}
        h="100px"
        w="100%"
        px="50px"
      >
        <MobilitycareHeading navigation={navigation} />
      </Box>

      <Center>
        <Center
          w="700"
          h="500"
          bgColor={"background.grey"}
          justifyContent="space-between"
          py="10"
          borderRadius={"3xl"}
        >
          <Heading color="primary.600">Rendez-vous confirmé</Heading>
          <Box
            bgColor={"primary.600"}
            w="400"
            h="100"
            p="5"
            borderRadius={"xl"}
          >
            <Heading size="md" color={"white"}>
              {format(parseISO(selectedSlot.start), "EEEE d LLLL yyyy", {
                locale: fr,
              })}
            </Heading>
            <Text color={"white"} size="2xl" mt="2">
              De {format(parseISO(selectedSlot.start), "HH:mm")} à{" "}
              {format(parseISO(selectedSlot.end), "HH:mm")}
            </Text>
          </Box>

          <Box>
            <Text underline>Avec le docteur :</Text>
            <Heading color={"primary.600"}>Dr {doctor.name}</Heading>
            <Text>{doctor.specialization || ""}</Text>
            <Text>N° RPPS : 9823423</Text>
            <Text>14 Rue Anatole France, 75008 Paris</Text>
            <Text>Se situe à 2,4 km du lieu de cette consultation</Text>
          </Box>

          <Button onPress={goHome} w={"100"} size={"lg"}>
            Accueil
          </Button>
        </Center>
      </Center>
    </Box>
  );
};

export default ScheduledConfirmation;
