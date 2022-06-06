import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
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
        color: "base.primary",
        _hover: {
          textDecoration: "none",
          color: "base.secondary",
        },
        _active: {
          color: "purple.500",
        },
      },
    },
    Button: {
      baseStyle: {
        color: "base.primary",
      },
      variants: {
        primary: {
          bg: "base.secondary",
          borderRadius: "2rem",
          color: "white",

          _hover: {
            color: "black",
            boxShadow: "md",
            boxShadowColor: "gray.200",
          },
        },
        secondary: {
          bg: "#2D3748",
          color: "white",
          borderRadius: "2rem",

          _hover: {
            bg: "gray.200",
            color: "black",
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        bgClip: "text",
        fontWeight: "extrabold",
      },
      variants: {
        sol: {
          bgGradient: "linear(to-r, #56B9BE, #856CCA, #CB7BDC)",
        },
        eth: {
          bgGradient: "linear(to-r, #FEED5B, #F48067, #A85CA5, #242220)",
        },
        appName: {
          bgGradient: "linear(to-r, #EF972C, #FF0080)",
        },
      },
    },
  },
});

export default theme;
