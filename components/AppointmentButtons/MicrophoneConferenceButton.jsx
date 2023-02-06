import { IconButton, Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MicrophoneConferenceButton = ({ isAudio, toggleMicrophone }) => {

  return (
    <IconButton
      width="57px"
      height="50px"
      bg="#FFFFFF4D"
      borderRadius="15px"
      icon={
        <Icon
          as={MaterialCommunityIcons}
          name={isAudio ? "microphone" : "microphone-off"}
          size="30px"
        />
      }
      _pressed={{
        bg: "white",
      }}
      variant="solid"
      color="white"
      onPress={toggleMicrophone}
    />
  );
};

export default MicrophoneConferenceButton;
