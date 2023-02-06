import { Box, VStack } from "native-base"

const DoctorProfile = () => {
  return (
    <Box width={"160px"} height={"280px"}>
      <Box width={"100%"} height={"185px"} bg={"blueGray.300"}></Box>
      <VStack>
        <Text>Doctor's name</Text>
        <Text>Specialization</Text>
        <Text>Distance</Text>
      </VStack>
      <Button>Sélectionner</Button>
    </Box>
  )
}

export default DoctorProfile;