import {
  Box,
  BoxProps,
  Stack,
  StackProps,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

interface Props extends BoxProps {
  spacing?: StackProps["spacing"];
}
const QuizBox = (props: Props) => {
  const { children, spacing } = props;
  const borderColor = useColorModeValue("gray.300", "gray.700");

  return (
    <Box
      sx={{
        border: "1px solid",
        padding: "1rem",
        borderColor,
      }}
      {...props}
    >
      <Stack spacing={spacing}>{children}</Stack>
    </Box>
  );
};

export default QuizBox;
