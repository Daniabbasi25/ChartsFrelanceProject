import { Box, Spinner } from "native-base";

const Loading = () => {
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
      <Spinner color="primary.600" size={80} />
    </Box>
  );
};

export default Loading;
