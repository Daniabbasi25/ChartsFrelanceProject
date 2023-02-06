import { Box, Button, Heading, VStack } from "native-base";

const AppointmentEnded = ({ navigation }) => {
  const goToHome = () => {
    navigation.navigate("home");
  };

  return (
    <Box
      width="100%"
      height="100%"
      justifyContent="center"
      p="30px"
      bg={"white"}
    >
      <Box
        bg="white"
        width={515}
        height={600}
        borderRadius={30}
        p={5}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.36,
          shadowRadius: 6.68,
          elevation: 11,
        }}
      >
        <Heading size="xl" color="primary.600">
          Consultation terminée
        </Heading>

        <VStack space={3}>
          <Button borderRadius={10} height={50} variant="outline">
            Impression compte-rendu et ordonnance
          </Button>
          <Button borderRadius={10} height={50} onPress={goToHome}>
            Accueil
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default AppointmentEnded;
