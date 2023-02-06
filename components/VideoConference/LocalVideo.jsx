import { useEffect, useRef } from "react";
import { VideoView } from "@dolbyio/comms-sdk-react-native";

const LocalVideo = ({ participant }) => {
  const videoView = useRef();

  useEffect(() => {
    if (videoView?.current) {
      if (participant.streams.length) {
        videoView.current.attach(participant, participant.streams[participant.streams.length - 1]);
      } else {
        videoView.current.detach();
      }
    }
  }, [participant]);

  return (
    <VideoView
      ref={videoView}
      style={{ height: 220, width: 367, borderRadius: 33 }}
      scaleType="fill"
    />

  )
}

export default LocalVideo;