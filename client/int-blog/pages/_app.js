import "../styles/globals.css";
import "@fontsource/montserrat";
// import "../styles/login-st.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
