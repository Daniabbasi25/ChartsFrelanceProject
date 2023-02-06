import { Dimensions } from "react-native";
import {
  Box,
  HStack,
  VStack,
  Heading,
  Button,
} from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAtomValue } from "jotai";

import { UserState } from "../../state/atoms";
import useAuth from "../../hooks/useAuth";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import AppointmentButtons from "../../components/AppointmentButtons/AppointmentButtons";
import Welcome from "../../components/Home/Welcome";
import CurrentPatient from "../../components/CurrentPatient/CurrentPatient";
import Dots from "../../components/Dots/Dots";

const screenHeight = Dimensions.get("window").height;

const Home = ({ navigation }) => {
  const { logout } = useAuth();
  const user = useAtomValue(UserState);

  return (
    <KeyboardAwareScrollView>
      <Box p="7" w="100%" h={screenHeight} bg={"white"}>
        <Box position={"absolute"} right={0} bottom={0}>
          <Dots />
        </Box>

        <HStack h="100%" w="100%">
          <VStack h="100%" w="50%" py="50px">
            <Heading color="primary.600">MobilityCare</Heading>
            {user && (
              <Welcome
                name={user.name}
                avatar={user.avatar}
                role="Assistant"
              />
            )}
            <CurrentPatient />
          </VStack>

          <VStack space={4} h="100%" w="50%">
            <AppointmentCard navigation={navigation} />
            <AppointmentButtons navigation={navigation} />
          </VStack>
        </HStack>

        <Box position="absolute" bottom={7} right={10} width={135} height={50}>
          <Button onPress={logout}>Déconnexion</Button>
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default Home;
