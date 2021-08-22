import { Box, Flex, IconButton, Link, Spacer, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Image from "next/image";
import { Link as LinkN } from "next/link";
// import styles from "../styles/login-st.module.css";
import MainLink from "./mainLink";

export default function AuthHeader() {
  const [display, setDisplay] = useState("none");

  const HamburguerMenu=()=>{
    return(
      <Flex
      p="0"
      alignItems="center"
      
      w="100vw"
      bgColor="gray.50"
      zIndex={20}
      h="100vh"
      pos="fixed"
      top="0"
      left="0"
      overflowY="auto"
      flexDir="column"
      display={display}
    >
      <Flex width='100%' align='flex-end' justify="flex-end">
        <IconButton alignSelf='flex-end'
          onClick={() => setDisplay("none")}
          mt="2"
          mr="5"
          aria-label="Close Menu"
          size="lg"
          icon={<Image src="/close.svg" width={25} height={25} />}
        />
      </Flex>

      <Box p="5" d="flex" flexDirection="row" justifyContent='center' w="100vw">
        <Flex
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <MainLink
            txt="Entrar"
            // className={styles.link}
            href="/auth/login"
            fontWeight="bold"
            mr="10"
            color="green.light"
          />
          <Box w='100vw' h='10' bgColor='blue.dark' >

          </Box>

          <MainLink
            txt="Registar"
            href="/auth/register"
            fontWeight="bold"
            color="blue.900"
          />
        </Flex>
      </Box>
    </Flex>

    )
  }

  return (
    <>
      <Flex display={["none", "none", "flex", "flex"]} alignItems="center">
        <Box p="5" w="95%">
          <Image
            src={"/intressantLOGO.svg"}
            width={100}
            height={50}
            alt="logoInt"
          />
        </Box>
        <Spacer />
        
{/* Normal menu */}

          <Box p="5" d="flex" flexDirection="row" w="400px">
          
              <MainLink
                txt="Entrar"
                // className={styles.link}
                href="/auth/login"
                fontWeight="bold"
                mr="10"
                color="green.light"
              />

              <MainLink
                txt="Registar"
                href="/auth/register"
                fontWeight="bold"
                color="blue.900"
              />
           
          </Box>
        
      </Flex>


{/* ham menu opened */}

     <HamburguerMenu/>

{/* Ham button */}

      <Flex alignItems="flex-end" justifyContent="flex-end">
        <IconButton
          onClick={() => setDisplay("flex")}
          display={["flex", "flex", "none", "none"]}
          aria-label="Open Menu"
          size="lg"
          mr="5"
          mt="2"
          icon={<Image src="/hammenu.svg" width={25} height={25} />}
        />
      </Flex>
    </>
  );
}
