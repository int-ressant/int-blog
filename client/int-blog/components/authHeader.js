import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { Link as LinkN } from "next/link";
import styles from "../styles/login-st.module.css";

export default function AuthHeader() {
  return (
    <Flex alignItems="center">
      <Box p="5" w="95%">
        <Image
          src={"/intressantLOGO.svg"}
          width={100}
          height={50}
          alt="logoInt"
        />
      </Box>
      <Spacer />
      <Box p="5" d="flex" flexDirection="row" w="400px">
        <Link
          className={styles.link}
          href="/auth/login"
          fontWeight="bold"
          mr="10"
          color="green.light"
        >
          Entrar
        </Link>

        <Link
          as={LinkN}
          href="/auth/register"
          fontWeight="bold"
          color="blue.900"
        >
          Registar
        </Link>
      </Box>
    </Flex>
  );
}
