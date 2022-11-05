import React from "react";
import { Spinner, Box } from "@chakra-ui/react";

const CircularProgress = () => {
  return (
    <Box display={"flex"} w={"100vw"} h={"100vh"} justifyContent={"center"}>
      <Spinner
        position={"absolute"}
        top={"50%"}
        left={"50%"}
        translateX={"-50%"}
        translateY={"-50%"}
      />
    </Box>
  );
};

export default CircularProgress;
