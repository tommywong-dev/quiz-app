import { ChakraTheme, extendTheme } from "@chakra-ui/react";

const colors: ChakraTheme["colors"] = {
  brand: {
    50: "#e3f7fd",
    100: "#b9ebfa",
    200: "#8ddef6",
    300: "#65d1ef",
    400: "#50c7e8",
    500: "#4abde1",
    600: "#44adcd",
    700: "#3b99b2",
    800: "#348599",
    900: "#25626d",
  },
};

const fonts: ChakraTheme["fonts"] = {
  heading: "'Montserrat', 'Trebuchet MS', sans-serif",
  body: "'Montserrat', 'Trebuchet MS', sans-serif",
};

export const theme = extendTheme({ colors, fonts });
