import { HStack, Divider, Avatar, Box, Text } from "native-base";

const Welcome = ({ avatar, name, role }) => {
  return (
    <HStack mt="40px" alignItems="center" space={3} ml="-28px">
      <Divider orientation="vertical" width="10px" bg="primary.600" />
      <Avatar
        size="lg"
        source={{
          uri: avatar,
        }}
      />
      <Box>
        <Text color="primary.600" fontSize="lg" fontWeight="medium">
          Bienvenue
        </Text>
        <Text color="primary.600" fontSize="lg" fontWeight="medium">
          {name}
        </Text>
        <Text>{role}</Text>
      </Box>
    </HStack>
  );
};

export default Welcome;
