import { io } from "socket.io-client";
import { useAtom, useSetAtom } from "jotai";

import {
  ConnectedState,
  HeartBeatState,
  BloodPressureState,
  TemperatureState,
  WeightState,
  OximeterState,
  BloodGlucoseState,
  UrineAnalysisState,
  ECGMeasureState,
  VideoState
  // RespiratoryRateState,
} from "./atoms";
import { useState } from "react";

const socket = io("http://192.168.0.160:61803", {
  transports: ["websocket", "polling"],
  autoConnect: false,
});

const useGlobalState = () => {
  const setConnected = useSetAtom(ConnectedState);
  const setHeartBeat = useSetAtom(HeartBeatState);
  const setBloodPressure = useSetAtom(BloodPressureState);
  const setTemperature = useSetAtom(TemperatureState);
  const setWeight = useSetAtom(WeightState);
  const setOximeter = useSetAtom(OximeterState);
  const setVideoStream = useSetAtom(VideoState);
  const setBloodGlucose = useSetAtom(BloodGlucoseState);
  const setUrineAnalysis = useSetAtom(UrineAnalysisState);
  const [ecgState, setECGState] = useAtom(ECGMeasureState);

  const initWebsocketClient = () => {
    let connectionPolling = null;

    socket.on("MEASURE", ({ payload }) => {
      if (payload) {
        switch (payload.device) {
          case "bloodPressure": {
            const {
              pressure,
              systolicPressure,
              diastolicPressure,
              meanPressure,
            } = payload;
            setBloodPressure({
              pressure,
              systolicPressure,
              diastolicPressure,
              meanPressure,
            });
            break;
          }
          case "thermometer": {
            if (payload.temperature) {
              setTemperature(Math.round(payload.temperature * 10) / 10);
            }
            break;
          }
          case "scale": {
            setWeight(payload.weight);
            break;
          }
          case "oximeter": {
            const { pulseRate, SpO2 } = payload;
            setHeartBeat(pulseRate);
            setOximeter(SpO2);
          }
          case "bloodGlucose": {
            if (payload.type === "glucose") {
              setBloodGlucose(payload.glucose);
            }
          }
          case "urineAnalyzer": {
            if (payload.type === "result") {
              const { device, type, ...result } = payload;
              setUrineAnalysis(result);
            }
          }
          default:
            break;
        }
      }
    });

    socket.on("START_VIDEO", ({ payload }) => {
      console.log(payload);
      setVideoStream(true);
    })

    socket.on("connect", () => {
      setConnected(true);

      socket.once("disconnect", () => {
        setConnected(false);
      });

      if (connectionPolling) {
        clearInterval(connectionPolling);
      }
    });

    socket.on("connect_error", (error) => {
      console.log(error);
      connectionPolling = setInterval(() => {
        socket.connect();
      }, 1000);
    });

    socket.connect();
  };

  const sendAppointment = ({ id }) => {
    socket.emit("APPOINTMENT", {
      id,
    });
  };

  const sendEndAppointment = () => {
    socket.emit("APPOINTMENT_END");
    socket.close();
  }

  const connectOtoscope = () => {
    socket.emit("CONNECT_DEVICE", {
      action: "connect",
      device: "otoscope",
    });
  };

  const connectDermatoscope = () => {
    socket.emit("CONNECT_DEVICE", {
      action: "connect",
      device: "dermatoscope",
    });
  };

  const connectStethoscope = () => {
    socket.emit("CONNECT_DEVICE", {
      action: "connect",
      device: "stethoscope",
    });
  };

  const connectTongueDepressor = () => {
    socket.emit("CONNECT_DEVICE", {
      action: "connect",
      device: "tongueDepressor",
    });
  }

  const toggleECGMeasure = () => {
    if (ecgState) {
      socket.emit("MEASURE", {
        action: "stop",
        device: "ECG",
      });
      setECGState(false);
    } else {
      socket.emit("MEASURE", {
        action: "start",
        device: "ECG",
      });
      setECGState(true);
    }
  }

  return {
    initWebsocketClient,
    sendAppointment,
    sendEndAppointment,
    connectOtoscope,
    connectDermatoscope,
    connectStethoscope,
    connectTongueDepressor,
    toggleECGMeasure,
  };
};

export default useGlobalState;
