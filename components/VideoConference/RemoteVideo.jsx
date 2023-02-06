import { useEffect, useRef } from "react";
import { VideoView } from "@dolbyio/comms-sdk-react-native";

const RemoteVideo = ({ participant }) => {
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
      style={{ height: 460, width: 767, borderRadius: 20 }}
      scaleType="fill"
    />

  )
}

export default RemoteVideo;