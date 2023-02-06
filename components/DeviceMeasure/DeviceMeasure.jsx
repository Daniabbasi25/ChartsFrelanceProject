import { VStack, Box, Text } from "native-base";

const DeviceMeasure = ({ device, measure, unit, icon }) => {
  return (
    <VStack
      space="12px"
      w="160px"
      h="150px"
      backgroundColor="white"
      borderRadius="17px"
      alignItems="center"
      py="20px"
      my={"auto"}
      style={{
        shadowColor: "#929292",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3,
      }}
    >
      <Box h="40px">{icon}</Box>
      <Text color="primary.600" fontWeight="bold">
        {device}
      </Text>
      <Text>
        {measure || "-"} {unit}
      </Text>
    </VStack>
  );
};

export default DeviceMeasure;
