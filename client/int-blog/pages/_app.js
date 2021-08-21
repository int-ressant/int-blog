import "../styles/globals.css";
import "@fontsource/montserrat";
// import "../styles/login-st.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import router, { useRouter } from "next/router";
import AuthHeader from "../components/authHeader";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const routeHistory = useRouter();
  const [route, setRoute] = useState(routeHistory.pathname);

  useEffect(() => {
    setRoute(routeHistory.pathname);
  }, [routeHistory]);

  return (
    <ChakraProvider theme={theme}>
      {/* {console.log(routeHistory.pathname)} */}

     {/* //just render de authHeader if the user is at auth routes */}
      {(route === "/auth/login"|| "/auth/register"  ) && <AuthHeader />}

      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
