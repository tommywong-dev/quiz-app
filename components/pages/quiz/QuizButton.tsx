import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const QuizButton = (props: ButtonProps) => {
  const isOutline = props.variant === "outline";
  const color = useColorModeValue(
    isOutline ? "gray.900" : "gray.200",
    isOutline ? "gray.300" : "gray.900"
  );
  const backgroundColor = useColorModeValue(
    isOutline ? "white" : "gray.900",
    isOutline ? "gray.900" : "gray.200"
  );
  const borderColor = useColorModeValue("gray.900", "gray.200");
  const hoverBackgroundColor = useColorModeValue(
    isOutline ? "gray.50" : "gray.800",
    isOutline ? "gray.800" : "gray.100"
  );

  return (
    <Button
      colorScheme="blackAlpha"
      sx={{
        borderWidth: "1.5px",
        px: "2rem",
        color,
        backgroundColor,
        borderColor,
        _hover: {
          backgroundColor: hoverBackgroundColor,
        },
      }}
      {...props}
    />
  );
};

export default QuizButton;
