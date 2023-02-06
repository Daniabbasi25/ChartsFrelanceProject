import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useAtomValue } from "jotai";
import SelectDropdown from "react-native-select-dropdown";

import { Box, Heading, HStack, Text } from "native-base";

import { GET_DOCTORS_BY_SPECIALTY } from "../../api/queries";
import { specializations } from "../../lib/specializations";
import { appointmentTypes } from "../../lib/appointmentTypes";
import DoctorSchedule from "../../components/DoctorSchedule/DoctorSchedule";
import { PatientState } from "../../state/atoms";
import DoctorSelect from "../../components/DoctorSelect/DoctorSelect";
import Dots from "../../components/Dots/Dots";

const ScheduledAppointment = ({ navigation }) => {
  const patient = useAtomValue(PatientState);
  const [appointmentType, setAppointmentType] = useState(
    appointmentTypes[0].value
  );
  const [selectedSpecialization, setSelectedSpecialization] = useState(
    specializations[0].value
  );
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(undefined);

  const [getDoctors, { loading, data, error }] = useLazyQuery(
    GET_DOCTORS_BY_SPECIALTY
  );

  const searchDoctors = (item) => {
    getDoctors({
      variables: {
        code: item.value,
      },
    });
  };

  useEffect(() => {
    if (data?.queryPractitionerRole) {
      const doctorsList = data.queryPractitionerRole.map((d) => {
        const { id: doctorId, name, user, schedule } = d.doctor;

        return {
          id: doctorId,
          name: name[0]?.text,
          avatarKey: user?.avatar,
          scheduleId: schedule.id,
        };
      });

      setDoctors(doctorsList);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <Box width="100%" height="100%" justifyContent="center" bg={"white"}>
      <Box position={"absolute"} right={0} bottom={0}>
        <Dots />
      </Box>
      <Box
        position={"absolute"}
        left={0}
        top={200}
        width={100}
        height={100}
        style={{
          transform: [
            {
              rotate: "180deg",
            },
          ],
        }}
      >
        <Dots />
      </Box>
      <Box height={"85px"} mx={"100px"} justifyContent={"center"}>
        <Heading color={"primary.600"}>MobilityCare</Heading>
      </Box>
      <HStack height={"660px"} mx={"100px"} justifyContent="space-between">
        <Box>
          <Heading color={"primary.600"}>
            Organisez la prochaine visite médicale
          </Heading>
          <Text my={"20px"}>Patient: {patient.name || ""}</Text>

          <Box maxW={"300px"} mt={"20px"}>
            <SelectDropdown
              buttonStyle={{ width: 300 }}
              defaultButtonText="Specialité"
              buttonTextAfterSelection={(item) => <Text>{item.label}</Text>}
              data={specializations}
              onSelect={searchDoctors}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <Box>
                    <Text ml={"20px"}>{item.label}</Text>
                  </Box>
                );
              }}
            />
          </Box>

          {doctors.length > 0 && (
            <Box maxW={"300px"} mt={"20px"} overflow={"scroll"}>
              <SelectDropdown
                rowStyle={{
                  height: 70,
                  display: "flex",
                  paddingLeft: 20,
                }}
                buttonStyle={{ width: 300 }}
                defaultButtonText="Choix du médecin"
                buttonTextAfterSelection={(item) => <Text>{item.name}</Text>}
                data={doctors}
                onSelect={(selectedItem) => setSelectedDoctor(selectedItem)}
                renderCustomizedRowChild={(item, index) => {
                  return <DoctorSelect doctor={item} key={item.id} />;
                }}
              />
            </Box>
          )}

          {selectedDoctor && (
            <Box maxW={"300px"} mt={"20px"}>
              <SelectDropdown
                buttonStyle={{ width: 300 }}
                defaultButtonText="Motif de consultation"
                buttonTextAfterSelection={(item) => <Text>{item.label}</Text>}
                data={appointmentTypes}
                onSelect={(selectedItem) => setAppointmentType(selectedItem)}
                renderCustomizedRowChild={(item, index) => {
                  return (
                    <Box>
                      <Text ml={"20px"}>{item.label}</Text>
                    </Box>
                  );
                }}
              />
            </Box>
          )}
        </Box>

        {selectedDoctor && (
          <DoctorSchedule doctor={selectedDoctor} navigation={navigation} />
        )}
      </HStack>
    </Box>
  );
};

export default ScheduledAppointment;
