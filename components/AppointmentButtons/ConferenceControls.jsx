import { HStack } from "native-base";
import CameraConferenceButton from "./CameraConferenceButton";
import LeaveConferenceButton from "./LeaveConferenceButton";
import MicrophoneConferenceButton from "./MicrophoneConferenceButton";

const ConferenceControls = ({
  isAudio,
  isVideo,
  toggleMicrophone,
  toggleCamera,
  leaveConference,
}) => {
  return (
    <HStack
      width="100%"
      justifyContent="center"
      alignItems="center"
      mt="auto"
      bottom="45px"
      space="15px"
      position="absolute"
      zIndex="100"
    >
      <MicrophoneConferenceButton
        isAudio={isAudio}
        toggleMicrophone={toggleMicrophone}
      />
      <LeaveConferenceButton leaveConference={leaveConference} />
      <CameraConferenceButton isVideo={isVideo} toggleCamera={toggleCamera} />
    </HStack>
  );
};

export default ConferenceControls;
