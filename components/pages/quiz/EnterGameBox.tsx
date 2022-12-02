import { Box, SimpleGrid, Stack } from "@chakra-ui/react";
import React from "react";
import { useTranslations } from "../../../hooks";
import AppText from "../../common/AppText";
import QuizButton from "../../common/QuizButton";

interface Props {
  handleExit: () => void;
  handleStart: () => void;
}
const EnterGameBox = (props: Props) => {
  const { handleExit, handleStart } = props;
  const t = useTranslations();

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "blackAlpha.300",
        padding: "1rem",
      }}
    >
      <Stack>
        <AppText color="blackAlpha.800">{t.quiz.welcome.message}</AppText>
        <SimpleGrid columns={2} spacing="4">
          <QuizButton variant="outline" onClick={handleExit}>
            {t.quiz.welcome.exit}
          </QuizButton>
          <QuizButton onClick={handleStart}>{t.quiz.welcome.enter}</QuizButton>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default EnterGameBox;
