import { Heading } from "@chakra-ui/react";
import React from "react";
import { useTranslations } from "../../../hooks";
import { IUser } from "../../../interfaces";

interface Props {
  name: string;
}
const WelcomeText = (props: Props) => {
  const { name } = props;
  const t = useTranslations();

  return (
    <Heading>
      {t.quiz.welcome.title}{" "}
      {name.length > 20 ? name.substring(0, 20) + "..." : name}
    </Heading>
  );
};

export default WelcomeText;
