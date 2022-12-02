import { Text, TextProps, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const AppText = (props: TextProps) => {
  const color = useColorModeValue("gray.700", "gray.200");
  return <Text letterSpacing="wide" color={color} {...props} />;
};

export default AppText;
