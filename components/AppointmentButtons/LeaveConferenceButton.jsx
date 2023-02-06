import { IconButton, Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LeaveConferenceButton = ({ leaveConference }) => {

  return (
    <IconButton
      width="80px"
      height="70px"
      bg="#FC5D5B"
      borderRadius="20px"
      icon={
        <Icon as={MaterialCommunityIcons} name="phone-hangup" size="40px" />
      }
      _pressed={{
        bg: "white",
      }}
      variant="solid"
      color="white"
      onPress={leaveConference}
    />
  );
};

export default LeaveConferenceButton;
