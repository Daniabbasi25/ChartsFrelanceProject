import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import {
  VStack,
  Heading,
  Box,
  Text,
  Divider,
  Button,
  ScrollView,
  Center,
  Pressable,
  Spinner,
} from "native-base";
import CalendarStrip from "react-native-calendar-strip";
import {
  getDay,
  parseISO,
  formatISO,
  addMinutes,
  differenceInMinutes,
  isBefore,
  isAfter,
  isEqual,
  format,
  startOfDay,
  endOfDay,
  isDate,
} from "date-fns";
import { fr } from "date-fns/locale";

// import { locale } from "./scheduleLocale";
import { GET_DOCTOR_SCHEDULE_SETTINGS, GET_SCHEDULE } from "../../api/queries";
import { PatientState, UserState } from "../../state/atoms";
import { CREATE_APPOINTMENT } from "../../api/mutations";

const DoctorSchedule = ({ doctor, navigation }) => {
  const user = useAtomValue(UserState);
  const patient = useAtomValue(PatientState);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(undefined);
  const [settings, setSettings] = useState(undefined);
  const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [createAppointment] = useMutation(CREATE_APPOINTMENT);
  const [getScheduleSlots, { data: scheduleData, loading, error }] =
    useLazyQuery(GET_SCHEDULE);

  const { data: doctorData, error: doctorError } = useQuery(
    GET_DOCTOR_SCHEDULE_SETTINGS,
    {
      variables: {
        id: doctor?.scheduleId,
      },
    }
  );

  useEffect(() => {
    if (doctorData) {
      const { id, scheduleSettings } = doctorData.getSchedule;
      setSettings({
        0: scheduleSettings.sunday,
        1: scheduleSettings.monday,
        2: scheduleSettings.tuesday,
        3: scheduleSettings.wednesday,
        4: scheduleSettings.thursday,
        5: scheduleSettings.friday,
        6: scheduleSettings.saturday,
        duration: scheduleSettings.duration,
      });
    }
  }, [doctorData]);

  useEffect(() => {
    if (settings) {
      getScheduleSlots({
        variables: {
          id: doctor.scheduleId,
          start: startOfDay(selectedDate),
          end: endOfDay(selectedDate),
        },
      });
      setSlots(getSlots(selectedDate, settings));
    }
  }, [settings]);

  useEffect(() => {
    let date = selectedDate;
    if (!isDate(date)) date = parseISO(selectedDate);
    getScheduleSlots({
      variables: {
        id: doctor.scheduleId,
        start: startOfDay(date),
        end: endOfDay(date),
      },
    });
  }, [selectedDate]);

  useEffect(() => {
    if (scheduleData) {
      if (scheduleData.getSchedule !== null) {
        const { slots } = scheduleData.getSchedule;
        const appointmentsData = slots.map((s) => {
          return s.appointments.map((appointment) => {
            return {
              start: parseISO(appointment.start),
              end: parseISO(appointment.end),
            };
          });
        });
        setAppointments(appointmentsData.flat(2));
      }
    }
  }, [scheduleData]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const onDateSelected = (date) => {
    setSelectedDate(date);
    const slotsArray = getSlots(date, settings);
    setSlots(slotsArray);
  };

  const validateAppointment = () => {
    const variables = {
      patient: patient.id,
      start: formatISO(selectedSlot.start),
      end: formatISO(selectedSlot.end),
      minutesDuration: differenceInMinutes(
        selectedSlot.end,
        selectedSlot.start
      ),
      assistantSchedule: user.schedule.id,
      doctorSchedule: doctor.scheduleId,
    };
    console.log(variables);
    createAppointment({ variables })
      .then((res) => {
        navigation.navigate("scheduledConfirmation", {
          doctor,
          selectedSlot: {
            start: formatISO(selectedSlot.start),
            end: formatISO(selectedSlot.end),
          },
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <VStack
      height={"600px"}
      width={"480px"}
      bg={"primary.600"}
      px={"70px"}
      alignItems="center"
      justifyContent={"flex-start"}
      borderRadius={"xl"}
      space={5}
    >
      <Heading color={"white"}>Créneau</Heading>
      <Box w={350} h={70}>
        <CalendarStrip
          scrollable
          calendarAnimation={{ type: "sequence", duration: 30 }}
          // daySelectionAnimation={{
          //   type: "background",
          //   duration: 300,
          //   highlightColor: "#9265DC",
          // }}
          style={{
            height: 100,
            paddingBottom: 0,
          }}
          calendarHeaderStyle={{ color: "white" }}
          calendarColor={"transparent"}
          dateNumberStyle={{ color: "black" }}
          dateNameStyle={{ color: "#5F5F7D" }}
          iconContainer={{ flex: 0.1 }}
          highlightDateContainerStyle={{ backgroundColor: "#00F5A0" }}
          highlightDateNameStyle={{ color: "white" }}
          highlightDateNumberStyle={{ color: "white" }}
          selectedDate={selectedDate}
          onDateSelected={(date) =>
            onDateSelected(parseISO(date.toISOString()))
          }
          useIsoWeekday={false}
          dayComponentHeight={50}
          dayContainerStyle={{
            backgroundColor: "white",
            width: 38,
            height: 50,
            borderRadius: 5,
            bottom: 0,
          }}
          // locale={locale}
        />
      </Box>
      <Text color={"white"}>Sélectionner l'horaire</Text>
      <Box w={"100%"} h="40">
        {loading ? (
          <Center h="40">
            <Spinner color={"white"} size="lg" />
          </Center>
        ) : (
          <ScrollView w={"100%"} h="10">
            <Center>
              {slots &&
                slots.length > 0 &&
                slots.map((s) => {
                  const exists = appointments.find((a) =>
                    isEqual(a.start, s.start)
                  );
                  if (exists) {
                    return (
                      <Box
                        key={s.start}
                        bgColor="primary.600"
                        my={1}
                        w={40}
                        h={7}
                        borderRadius={7}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Text>
                          {format(s.start, "HH:mm")} - {format(s.end, "HH:mm")}
                        </Text>
                      </Box>
                    );
                  } else {
                    return (
                      <Pressable
                        key={s.start}
                        onPress={() => setSelectedSlot(s)}
                      >
                        <Box
                          bgColor="white"
                          my={1}
                          w={40}
                          h={7}
                          borderRadius={7}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Text>
                            {format(s.start, "HH:mm")} -{" "}
                            {format(s.end, "HH:mm")}
                          </Text>
                        </Box>
                      </Pressable>
                    );
                  }
                })}
            </Center>
          </ScrollView>
        )}
      </Box>
      <Divider height={"2px"} mt={5} mb={"10px"} bg={"white"} />
      {selectedSlot && (
        <VStack w="100%" h="100%" alignItems="center">
          <Text color="white" fontSize={15}>
            {format(selectedSlot.start, "EEEE d LLLL yyyy à HH:mm", {
              locale: Locales.fr,
            })}
          </Text>
          <Button
            bg={"white"}
            _text={{ color: "primary.600", fontWeight: "bold" }}
            mt={10}
            width={"130px"}
            height={"50px"}
            onPress={validateAppointment}
          >
            Valider
          </Button>
        </VStack>
      )}
    </VStack>
  );
};

const getSlots = (day, dayOpenHours, duration) => {
  let slots = dayOpenHours.map((hoursStr) => {

    // Split the begin time and the end time of the availability slot
    const hours = hoursStr.split("-");
    const begin = hours[0].split(":");
    const end = hours[1].split(":");


    const chunkBegin = new Date(day);
    const chunkEnd = new Date(day);

    // Assign hours and minutes to the day
    chunkBegin.setHours(begin[0]);
    chunkBegin.setMinutes(begin[1]);
    chunkBegin.setSeconds(0);
    chunkBegin.setMilliseconds(0);
    chunkEnd.setHours(end[0]);
    chunkEnd.setMinutes(end[1]);
    chunkEnd.setSeconds(0);
    chunkEnd.setMilliseconds(0);


    const numberOfSlots =
      differenceInMinutes(chunkEnd, chunkBegin, { roundingMethod: "trunc" }) /
      duration;
    const availableSlots = [];

    // Create slots for the availability slot of the day
    for (let i = 0; i < numberOfSlots; i++) {
      const startDate = addMinutes(chunkBegin, i * duration);
      const endDate = addMinutes(startDate, duration);

      if (isBefore(endDate, chunkEnd) || isEqual(endDate, chunkEnd)) {
        availableSlots.push({
          startDate: startDate,
          endDate: endDate,
        });
      }
    }

    return availableSlots;
  });

  return slots.flat();
};

export default DoctorSchedule;
