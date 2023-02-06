import { useEffect, useState } from "react";
import CommsAPI from "@dolbyio/comms-sdk-react-native";

import { requestPermissions } from "../lib/permissions";
import { getAccessToken } from "../globals";

const useAppointmentConference = ({ appointment, firstName, lastName }) => {
  const [participants, setParticipants] = useState(new Map());
  const [localParticipantId, setLocalParticipantId] = useState(undefined);
  const [localParticipant, setLocalParticipant] = useState(undefined);
  const [remoteParticipant, setRemoteParticipant] = useState(undefined);
  const [isVideo, setIsVideo] = useState(true);
  const [isAudio, setIsAudio] = useState(true);
  const [isConference, setConference] = useState(false);

  useEffect(() => {
    async function initialize() {
      if (Platform.OS === "android") {
        await requestPermissions();
      }

      try {
        const access_token = await getAccessToken();
        await CommsAPI.initializeToken(access_token, getAccessToken);

        const conferenceOptions = {
          alias: appointment.id,
        };

        const joinOptions = {
          constraints: {
            audio: true,
            video: true,
          },
        };

        await CommsAPI.session.open({ name: `${firstName} ${lastName}` });
        const conference = await CommsAPI.conference.create(conferenceOptions);
        setConference(true);
        await CommsAPI.conference.join(conference, joinOptions);

        const localP = await CommsAPI.session.getParticipant();
        setLocalParticipantId(localP.id);
      } catch (error) {
        console.error(error);
      }
    }
    initialize();
  }, []);

  const onParticipantChange = (data) => {
    setParticipants(
      (participants) =>
        new Map(participants.set(data.participant.id, data.participant))
    );
  };

  const onStreamsChange = (data) => {
    setParticipants((participants) => {
      let p = participants.get(data.participant.id);
      if (p) {
        p = { ...p };
        p.streams = data.participant.streams;
        return new Map(participants.set(p.id, p));
      }
      return participants;
    });
  };

  useEffect(() => {
    const unsubscribers = [
      CommsAPI.conference.onParticipantsChange(onParticipantChange),
      CommsAPI.conference.onStreamsChange(onStreamsChange),
    ];

    return () => {
      unsubscribers.forEach((u) => u());
    };
  }, []);

  useEffect(() => {
    if (participants.size > 0) {
      if (localParticipantId) {
        const localParticipant = participants.get(localParticipantId);
        if (localParticipant) {
          setLocalParticipant(localParticipant);
        }
      }

      if (participants.size > 1) {
        const remoteParticipantKey = [...participants.keys()].find(
          (p) => p !== localParticipantId
        );

        setRemoteParticipant(participants.get(remoteParticipantKey));
      }
    }
  }, [participants]);

  const toggleMicrophone = async () => {
    if (localParticipant) {
      if (isAudio) {
        setIsAudio(false);
        await CommsAPI.conference.mute(localParticipant, true);
      } else {
        setIsAudio(true);
        await CommsAPI.conference.mute(localParticipant, false);
      }
    }
  };

  const toggleCamera = async () => {
    if (localParticipant) {
      if (isVideo) {
        setIsVideo(false);
        await CommsAPI.conference.stopVideo(localParticipant);
      } else {
        setIsVideo(true);
        await CommsAPI.conference.startVideo(localParticipant);
      }
    }
  };

  const leaveConference = async () => {
    if (localParticipant) {
      await CommsAPI.conference.leave();
      setConference(false);
      return true;
    }
    return false;
  };

  return {
    isConference,
    localParticipant,
    remoteParticipant,
    toggleMicrophone,
    toggleCamera,
    leaveConference,
    isAudio,
    isVideo,
  };
};

export default useAppointmentConference;
