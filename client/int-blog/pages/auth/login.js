// import React from "react";
import Image from "next/image";
import styles from "../../styles/login-st.module.css";

import AuthHeader from "../../components/authHeader";
import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";

function Login() {
  return (
    <div>
      <AuthHeader />
      <Box className={styles.blob}>
        <Flex align="center">
          <Box>
            
          </Box>
        </Flex>
      </Box>
      {/* <Image
        className="blob"
        src="/blob.svg"
        width="100%"
        height="100%"
        layout="responsive"
      /> */}
    </div>
  );
}

export default Login;
