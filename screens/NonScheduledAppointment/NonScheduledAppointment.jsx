import { Box, Heading, HStack } from "native-base";

const NonScheduledAppointment = () => {
  return (
    <Box width="100%" height="100%" justifyContent="center" p="30px" bg={"white"}>
      <HStack>
        <Heading>Liste des médecins actuellement disponibles</Heading>
      </HStack>
    </Box>
  );
};

export default NonScheduledAppointment;
