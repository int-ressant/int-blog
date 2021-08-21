import { Box, Flex, IconButton, Link, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { Link as LinkN } from "next/link";
import styles from "../styles/login-st.module.css";
import MainLink from "./mainLink";

export default function AuthHeader() {
  return (
    <>
    <Flex display={['none','none','flex','flex']} alignItems="center">
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
        <MainLink
        txt='Entrar'
          className={styles.link}
          href="/auth/login"
          fontWeight="bold"
          mr="10"
          color="green.light"
        >
          Entrar
        </MainLink>

        <MainLink
          txt='Registar'
          href="/auth/register"
          fontWeight="bold"
          color="blue.900"
        >
          
        </MainLink>
      </Box>
     
    </Flex>
    <Flex alignItems='flex-end' justifyContent='flex-end' >
    <IconButton  display={['flex','flex','none','none']} aria-label='Open Menu' size='lg' mr='5' mt='2' icon={<Image src='/hammenu.svg' width={25} height={25}/>} />

    </Flex>
    </>
  );
}
