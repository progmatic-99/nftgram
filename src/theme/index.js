import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "white",
      },
    },
  },
  colors: {
    base: {
      border: "#a9b2bf",
      primary: "gray.700",
      secondary: "#ef972c",
    },
  },
  fonts: {
    heading: "Open Sans",
    body: "Raleway",
  },
  components: {
    Link: {
      baseStyle: {
        color: "grey.700",
        _hover: {
          textDecoration: "none",
          color: "#ef972c",
        },
        _active: {
          color: "purple.500",
        },
      },
    },
    Button: {
      baseStyle: {
        bg: "purple.500",
      },
    },
  },
});

export default theme;
