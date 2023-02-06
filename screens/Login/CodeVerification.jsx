import { Box, VStack, Heading, Text, FormControl, Input, Button, Link } from "native-base";

const CodeVerification = ({ navigation }) => {

  const handleNoCodeReceived = () => {
    console.log("Handling no code received");
  }

  const validateCode = () => {
    navigation.navigate("home");
  }

  return (<Box flex justifyContent="center" alignItems="center">
    <VStack borderWidth={2} borderColor={"primary.600"} borderRadius="3xl" p="40px" w="470px">
      <Heading size="md">Saisir le code de vérification</Heading>
      <Text mt="15px" color="text.basic">Nous venons tout juste d’envoyer un sms avec un code
        de vérification à votre numéro : +33612345678</Text>
      <FormControl mt="15px">
        <Input
          name="code"
          placeholder="Code"
          variant="outline"
          borderWidth="4px"
          borderColor="primary.600"
          borderRadius="2xl"
          h="46px"
        />
      </FormControl>

      <Button
        onPress={validateCode}
        h="40px"
        w="160px"
        mt="25px"
        borderRadius="2xl"
        p="2px"
        _text={{
          fontWeight: "bold",
          fontSize: "lg",
        }}
      >Valider</Button>

      <Box alignItems="flex-end">
        <Link
          onPress={handleNoCodeReceived}
          _text={{
            color: "text.basic"
          }} mt="25px" >Je n’ai pas reçu de code</Link>
      </Box>
    </VStack>
  </Box>)
}

export default CodeVerification;