import { Pressable, Heading } from "native-base";

const MobilitycareHeading = ({ navigation }) => {
  const goToHome = () => {
    navigation.navigate("home");
  };

  return (
    <Pressable onPress={goToHome}>
      <Heading color="primary.600">MobilityCare</Heading>
    </Pressable>
  );
};

export default MobilitycareHeading;
