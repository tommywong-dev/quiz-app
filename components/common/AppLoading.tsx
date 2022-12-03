import { CircularProgress, CircularProgressProps } from "@chakra-ui/react";
import React from "react";

const AppLoading = (props: CircularProgressProps) => {
  return (
    <CircularProgress
      isIndeterminate
      size="16px"
      color="gray.700"
      mr="4"
      {...props}
    />
  );
};

export default AppLoading;
