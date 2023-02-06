import { useState, useEffect } from "react";
import {
  Input,
  Button,
  VStack,
  Heading,
  Text,
  FormControl,
  IconButton,
  Icon,
  Box,
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { FontAwesome5 } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    const { email, password } = data;
    login({ email, password });
  };

  useEffect(() => {}, [errors]);

  return (
    <KeyboardAwareScrollView>
      <Box
        p={75}
        h={{
          base: "400px",
          lg: "auto",
        }}
        bg={"white"}
      >
        <VStack>
          <Heading color={"primary.600"}>S'identifier</Heading>
          <Text color={"text.basic"}>
            Veuillez entrer les informations nécessaires :
          </Text>

          <FormControl
            w={350}
            mt={60}
            isRequired
            isInvalid={errors.email?.type === "required"}
          >
            <FormControl.Label>Email / Identifiant</FormControl.Label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  type="text"
                  placeholder="adresse@email.com"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  variant="underlined"
                />
              )}
            />
            <FormControl.ErrorMessage>Champ requis</FormControl.ErrorMessage>
          </FormControl>

          <FormControl
            w={350}
            mt={60}
            isRequired
            isInvalid={errors.password?.type === "required"}
          >
            <FormControl.Label>Mot de passe</FormControl.Label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  type={showPassword ? "text" : "password"}
                  variant="underlined"
                  placeholder="Entrez votre mot de passe"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  InputRightElement={
                    <IconButton
                      icon={
                        <Icon
                          as={FontAwesome5}
                          name="eye-slash"
                          size="25px"
                          color="#03014C"
                        />
                      }
                      onPress={togglePassword}
                      backgroundColor={
                        showPassword ? "primary.600" : "transparent"
                      }
                    />
                  }
                />
              )}
            />
            <FormControl.ErrorMessage>Champ requis</FormControl.ErrorMessage>
          </FormControl>

          <Button
            onPress={handleSubmit(onSubmit)}
            w={380}
            h={75}
            mt={75}
            rounded="xl"
            _text={{
              fontWeight: "bold",
            }}
          >
            S'identifier
          </Button>
        </VStack>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default Login;
