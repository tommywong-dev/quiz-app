import { ChakraTheme } from "@chakra-ui/react";
import { buttonTheme } from "./buttonTheme";
import { inputTheme } from "./inputTheme";

export const components: ChakraTheme["components"] = {
  Input: inputTheme,
  Button: buttonTheme,
};
