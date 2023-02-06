import { useEffect, useState } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { useForm, Controller } from "react-hook-form";
import {
  Divider,
  VStack,
  HStack,
  Text,
  FormControl,
  Input,
  Button,
  Icon,
  Spinner,
  Image,
  Avatar,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useLazyQuery } from "@apollo/client";
import { GET_PATIENT_BY_NIR } from "../../api/queries";
import { PatientState } from "../../state/atoms";
import useUpload from "../../hooks/useUpload";
import { differenceInCalendarYears, parseISO } from "date-fns";

const CurrentPatient = () => {
  const [patientAvatar, setPatientAvatar] = useState(undefined);
  const patient = useAtomValue(PatientState);
  const setPatient = useSetAtom(PatientState);

  const { download } = useUpload();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [getPatient, { data, error, loading }] =
    useLazyQuery(GET_PATIENT_BY_NIR);

  const onSubmit = ({ nir }) => {
    if (nir && nir.length === 13) {
      getPatient({
        variables: {
          nir,
        },
      });
    }
  };

  useEffect(() => {
    const getAvatar = async (key) => {
      const avatar = await download({ key });
      setPatientAvatar(avatar);
    };

    console.log(data);
    if (data && data.queryPatient.length > 0) {
      const {
        id,
        name,
        birthDate,
        gender,
        telecom,
        address: patientAddress,
        appointments,
        user
      } = data.queryPatient[0];

      if (user?.avatar) getAvatar(user.avatar);
      const email = telecom?.find((t) => t.system === "EMAIL")?.value || "";
      const phone = telecom?.find((t) => t.system === "PHONE")?.value || "";

      const address = patientAddress[0]?.text;
      const age = differenceInCalendarYears(new Date(), parseISO(birthDate));

      setPatient({
        id,
        appointments,
        name: name[0]?.text || "",
        birthDate,
        age,
        gender,
        email,
        phone,
        address,
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <VStack width="70%" mt={"40px"} ml={"30px"}>
      <Text>Vous êtes en présence de :</Text>
      <Divider width={"210px"} mt={"12px"} />

      {patient ? (
        <HStack space={7} alignItems={"center"} height={"150px"}>
          {patientAvatar && (
            <Avatar
              source={{
                uri: patientAvatar,
              }}
              alt="Alternate Text"
              size="xl"
            />
          )}
          <VStack justifyContent={"center"} width={"400px"}>
            <Text>{patient.name || ""}</Text>
            <Text>{patient.age || ""} ans</Text>
            <Text>{patient.address || ""}</Text>
            <Text>{patient.phone || ""}</Text>
            <Text>{patient.email || ""}</Text>
          </VStack>
        </HStack>
      ) : (
        <VStack space={"20px"} width={"550px"} mt={"20px"}>
          <FormControl
            w={"100%"}
            isRequired
            isInvalid={errors.nir?.type === "required"}
          >
            <FormControl.Label>Identifiant patient</FormControl.Label>
            <Controller
              name="nir"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  type="text"
                  placeholder="Identifiant patient"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  variant="outline"
                  borderRadius={"10px"}
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcons name="identifier" />}
                      size={6}
                      ml="2"
                      color="muted.400"
                    />
                  }
                />
              )}
            />
            <FormControl.ErrorMessage>Champ requis</FormControl.ErrorMessage>
          </FormControl>

          <HStack alignItems="flex-end">
            {loading && <Spinner />}
            <Button
              ml={"auto"}
              onPress={handleSubmit(onSubmit)}
              w={135}
              height={50}
              _text={{
                fontWeight: "bold",
              }}
            >
              Valider
            </Button>
          </HStack>
        </VStack>
      )}
    </VStack>
  );
};

export default CurrentPatient;

{
  /* <HStack width={"550px"} space={"10px"}>
          <FormControl
            width={"270px"}
            isInvalid={errors.name?.type === "required"}
          >
            <FormControl.Label>Nom</FormControl.Label>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  type="text"
                  placeholder="Nom"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  variant="outline"
                  borderRadius={"10px"}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={6}
                      ml="2"
                      color="muted.400"
                    />
                  }
                />
              )}
            />
            <FormControl.ErrorMessage>Champ requis</FormControl.ErrorMessage>
          </FormControl>

          <FormControl
            width={"270px"}
            isInvalid={errors.lastName?.type === "required"}
          >
            <FormControl.Label>Prénom</FormControl.Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  type="text"
                  placeholder="Prénom"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  variant="outline"
                  borderRadius={"10px"}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={6}
                      ml="2"
                      color="muted.400"
                    />
                  }
                />
              )}
            />
            <FormControl.ErrorMessage>Champ requis</FormControl.ErrorMessage>
          </FormControl>

                    <FormControl
            width={"270px"}
            isInvalid={errors.birth?.type === "required"}
          >
            <FormControl.Label>Nom</FormControl.Label>
            <Controller
              name="birth"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  type="text"
                  placeholder="Date de naissance"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  variant="outline"
                  borderRadius={"10px"}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="calendar-today" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                />
              )}
            />
            <FormControl.ErrorMessage>Champ requis</FormControl.ErrorMessage>
          </FormControl>

          <HStack alignItems={"center"}>
            <Divider width={"250px"} />
            <Text width={"50px"} px={"15px"}>
              OU
            </Text>
            <Divider width={"250px"} />
          </HStack>
        </HStack> */
}
