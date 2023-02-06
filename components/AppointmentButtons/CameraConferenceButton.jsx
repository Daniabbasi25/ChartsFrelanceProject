import { useState } from "react";
import { IconButton, Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CameraConferenceButton = ({ isVideo, toggleCamera }) => {

  return (
    <IconButton
    width="57px"
    height="50px"
      bg="#FFFFFF4D"
      borderRadius="15px"
      icon={
        <Icon
          as={MaterialCommunityIcons}
          name={isVideo ? "video" : "video-off"}
          size="30px"
        />
      }
      _pressed={{
        bg: "white",
      }}
      variant="solid"
      color="white"
      onPress={toggleCamera}
    />
  );
};

export default CameraConferenceButton;