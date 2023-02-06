import { useEffect } from "react";
import { Image } from "react-native";
import { Box } from "native-base";
import { useAtomValue } from "jotai";

import {
  DermatoscopeStream,
} from "../../state/atoms";

const Dermatoscope = () => {
  const dermatoscopeStream = useAtomValue(DermatoscopeStream);

  return (dermatoscopeStream ?
    <Box
      height={220}
      width={367}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        style={{ width: 220, height: 220, borderRadius: 20 }}
        source={{ uri: dermatoscopeStream }}
      />
    </Box>
    :
    null
  )
}

export default Dermatoscope;