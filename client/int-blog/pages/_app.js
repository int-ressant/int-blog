import "../styles/globals.css";
import "@fontsource/montserrat";
// import "../styles/login-st.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import router, { useRouter } from "next/router";
import AuthHeader from "../components/authHeader";
import { useEffect, useState } from "react";
import MainNavBar from "../components/mainNavBar";
import { AuthProvider } from "../contexts/authContext";

function MyApp({ Component, pageProps }) {
  const routeHistory = useRouter();
  const [route, setRoute] = useState(routeHistory.pathname);

  useEffect(() => {
    setRoute(routeHistory.pathname);
  }, [routeHistory]);

  return (
    <AuthProvider>
    <ChakraProvider theme={theme}>
      {/* {console.log(routeHistory.pathname)} */}

     {/* //just render de authHeader if the user is at auth routes */}
      {((route === "/auth/login")|| route==="/auth/register"  ) && <AuthHeader />}
      {route==='/' && <MainNavBar/>}
      <Component {...pageProps} />
    </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
