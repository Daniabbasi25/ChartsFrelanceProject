import { Avatar, HStack, VStack, Text, Box } from "native-base";
import { useEffect, useState } from "react";

import useUpload from "../../hooks/useUpload";

const DoctorSelect = ({ doctor }) => {
  const { download } = useUpload();
  const [avatar, setAvatar] = useState(undefined);

  useEffect(() => {
    const getAvatar = async (key) => {
      const avatar = await download({ key });
      setAvatar(avatar);
    };

    getAvatar(doctor.avatarKey).catch((err) => console.error(err));
  }, []);

  return (
    <HStack alignItems={"center"} space={5}>
      {avatar && <Avatar source={{ uri: avatar }} />}
      <Text color={"black"} backgroundColor={"blue.500"}>
        Dr {doctor.name}
      </Text>
    </HStack>
  );
};

export default DoctorSelect;
