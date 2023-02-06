import { Image } from "react-native";
import { Box } from "native-base";
import { useAtomValue } from "jotai";
import FastImage from "react-native-fast-image";

import { OtoscopeStream } from "../../state/atoms";

const Otoscope = () => {
  const otoscopeStream = useAtomValue(OtoscopeStream);

  return otoscopeStream ? (
    <Box
      height={"220px"}
      width={367}
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius={33}
    >
      <FastImage
        style={{ width: 220, height: 220, borderRadius: 20 }}
        source={{ uri: otoscopeStream }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </Box>
  ) : null;
};

export default Otoscope;
