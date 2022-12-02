import { Box, BoxProps, Stack, StackProps } from "@chakra-ui/react";
import React from "react";

interface Props extends BoxProps {
  stackSpacing?: StackProps["spacing"];
}
const QuizBox = (props: Props) => {
  const { children, stackSpacing } = props;
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "blackAlpha.300",
        padding: "1rem",
      }}
      {...props}
    >
      <Stack spacing={stackSpacing}>{children}</Stack>
    </Box>
  );
};

export default QuizBox;
