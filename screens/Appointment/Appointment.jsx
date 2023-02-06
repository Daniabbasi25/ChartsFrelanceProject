import { useEffect, useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { View, StyleSheet } from 'react-native';
import { Badge, Box, HStack, VStack, Button, ScrollView } from "native-base";
import { useAtom, useAtomValue } from "jotai";
import { Video, AVPlaybackStatus } from 'expo-av';

import { ASSISTANT_END_APPOINTMENT } from "../../api/mutations";
import useGlobalState from "../../state/useGlobalState";
import {
  ConnectedState,
  HeartBeatState,
  BloodPressureState,
  TemperatureState,
  WeightState,
  OximeterState,
  BloodGlucoseState,
  UrineAnalysisState,
  RespiratoryRateState,
  UserState,
  ECGMeasureState,
  VideoState,
} from "../../state/atoms";

import useAppointmentConference from "../../hooks/useAppointmentConference";

import HeartBeat from "../../assets/Icons/HeartBeat";
import BloodPressure from "../../assets/Icons/BloodPressure";
import Temperature from "../../assets/Icons/Temperature";
import Weight from "../../assets/Icons/Weight";
import Oximeter from "../../assets/Icons/Oximeter";
import RespiratoryRate from "../../assets/Icons/RespiratoryRate";
import ConferenceControls from "../../components/AppointmentButtons/ConferenceControls";
import RemoteVideo from "../../components/VideoConference/RemoteVideo";
import LocalVideo from "../../components/VideoConference/LocalVideo";
import DeviceMeasure from "../../components/DeviceMeasure/DeviceMeasure";
import MobilitycareHeading from "../../components/MobilitycareHeading/MobilitycareHeading";
import EcgChart from "../../components/Charts/ECG";
import BulletChart from "../../components/Charts/BulletChart";
import StackedBarChartWithOnPressExample from "../../components/Charts/BulletChart";

let p = null;

const Appointment = ({ navigation, route }) => {
  const [status, setStatus] = useState({});
  const video = useRef(null);
  const user = useAtomValue(UserState);

  const { appointment } = route.params;
  const {
    initWebsocketClient,
    sendAppointment,
    sendEndAppointment,
    connectOtoscope,
    connectDermatoscope,
    connectStethoscope,
    connectTongueDepressor,
    toggleECGMeasure,
  } = useGlobalState();

  const [endAppointmentMutation] = useMutation(ASSISTANT_END_APPOINTMENT);

  const {
    isConference,
    localParticipant,
    remoteParticipant,
    isAudio,
    toggleMicrophone,
    isVideo,
    toggleCamera,
    leaveConference,
  } = useAppointmentConference({
    appointment,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  const connected = useAtomValue(ConnectedState);
  const heartBeat = useAtomValue(HeartBeatState);
  const bloodPressure = useAtomValue(BloodPressureState);
  const temperature = useAtomValue(TemperatureState);
  const weight = useAtomValue(WeightState);
  const oximeter = useAtomValue(OximeterState);
  const bloodGlucose = useAtomValue(BloodGlucoseState);
  const urineAnalysis = useAtomValue(UrineAnalysisState);
  const respiratoryRate = useAtomValue(RespiratoryRateState);
  const ecgMeasureState = useAtomValue(ECGMeasureState);
  const [videoState, setVideoState] = useAtom(VideoState);

  useEffect(() => {
    if (route.params?.appointment) {
      initWebsocketClient();
    }
  }, []);

  useEffect(() => {
    if (connected && appointment) {
      console.log("sending APPOINTMENT");
      sendAppointment({ id: appointment.id });
    }
  }, [connected]);

  const endAppointment = () => {
    const ended = leaveConference();
    if (ended) {
      endAppointmentMutation({
        variables: {
          id: appointment.id,
          assistantId: user.id,
          patientId: appointment.patient.id,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });

      sendEndAppointment();
      navigation.navigate("appointmentEnded");
    }
  };

  useEffect(() => {
    console.log(status);
  }, [status])

  return (
    <ScrollView>
      <Box w="100%" h="100%" bg={"white"}>
        <HStack
          justifyContent="space-between"
          alignItems={"center"}
          h="90px"
          w="100%"
          px="50px"
        >
          <MobilitycareHeading navigation={navigation} />
          <Box w="200px" h="50px">
            {connected ? (
              <Badge variant="solid" colorScheme="success">
                Connecté
              </Badge>
            ) : (
              <Badge variant="solid" colorScheme="error">
                Déconnecté
              </Badge>
            )}
          </Box>
        </HStack>
        <HStack h="450px" w="100%" px="65px" space={30}>
          <Box
            height={"450px"}
            width={767}
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius={20}
            position="relative"
          >
            {isConference && (
              <ConferenceControls
                isAudio={isAudio}
                isVideo={isVideo}
                toggleMicrophone={toggleMicrophone}
                toggleCamera={toggleCamera}
                leaveConference={endAppointment}
              />
            )}
            {remoteParticipant && (
              <RemoteVideo participant={remoteParticipant} />
            )}
          </Box>
          <VStack
            w="400px"
            height={"450px"}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              height={"220px"}
              width={367}
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius={33}
            >
              {isConference && localParticipant && (
                <LocalVideo participant={localParticipant} />
              )}
            </Box>
            <Box
              height={240}
              width={300}
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius={33}
              backgroundColor={"#00FF00"}
            >
              {videoState && (
                <Video
                  ref={video}
                  source={{
                    uri: "http://192.168.0.160:8888/video",
                  }}
                  style={{ width: 300, height: 240 }}
                  resizeMode="contain"
                  useNativeControls={false}
                  shouldPlay
                  type="hls"
                  onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
              )}
            </Box>
            <View style={styles.buttons}>
              <Button
                title={status.isPlaying ? "Pause" : "Play"}
                onPress={() => setVideoState(!videoState)}
              >
                Play
              </Button>
            </View>
          </VStack>
        </HStack>

        <Box height={"210px"} width={"100%"} px={"65px"}>
          <HStack space={4} w="100%" h="100%">
            <DeviceMeasure
              device="Fréquence cardiaque"
              measure={heartBeat}
              unit="bpm"
              icon={<HeartBeat />}
            />
            <DeviceMeasure
              device="Pression artérielle"
              measure={`${bloodPressure?.systolicPressure || "-"} / ${
                bloodPressure?.diastolicPressure || "-"
              }`}
              unit="mmHG"
              icon={<BloodPressure />}
            />
            <DeviceMeasure
              device="Température"
              measure={temperature}
              unit="C"
              icon={<Temperature />}
            />
            <DeviceMeasure
              device="Poids"
              measure={weight}
              unit="kg"
              icon={<Weight />}
            />
            <DeviceMeasure
              device="Saturation"
              measure={oximeter}
              unit="%"
              icon={<Oximeter />}
            />
            <DeviceMeasure
              device="Fréquence respiratoire"
              measure={respiratoryRate}
              unit="/min"
              icon={<RespiratoryRate />}
            />

            <VStack space={1} ml="auto" justifyContent="center">
              <Button width={150} onPress={connectOtoscope}>
                Otoscope
              </Button>
              <Button width={150} onPress={connectDermatoscope}>
                Dermatoscope
              </Button>
              <Button width={150} onPress={connectStethoscope}>
                Stethoscope
              </Button>
              <Button width={150} onPress={connectTongueDepressor}>
                Abaisse-langue
              </Button>
              <Button width={150} onPress={toggleECGMeasure}>
                {ecgMeasureState ? "Arrêter l'ECG" : "Démarrer l'ECG"}
              </Button>
            </VStack>
          </HStack>
        </Box>

        <EcgChart />
        <BulletChart />

       
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Appointment;
