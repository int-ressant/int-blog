// import React from "react";
import Image from "next/image";
import styles from "../../styles/login-st.module.css";

import AuthHeader from "../../components/authHeader";
import { Box } from "@chakra-ui/layout";
import {
  Button,
  Flex,
  FormControl,
  Input,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";

function Login() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
  };

  return (
    <div>
      {/* <AuthHeader /> */}
      <Box className={styles.blob}>
        <Flex alignItems="center" justifyContent="center">
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Image
              src={"/intressantLOGO.svg"}
              width={150}
              height={100}
              alt="logoInt"
            />
            <Text textAlign='center' color="blue.dark" fontWeight="bold">
              Bem vindo a maior comunidade Mocambicana de devs
            </Text>
            <Text mt="5" color="blue.dark">
              Entrar
            </Text>
            <Flex
              mt="10"
              mb="10"
              w={["60%",'40%']}
              
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              flexDirection="row"
              
            >
              <Link  >
                <Image
                  src={"/Facebook.svg"}
                  width={20}
                  height={20}
                  alt="logoInt"
                />
              </Link>

              <Link>
                <Image
                  src={"/Google.svg"}
                  width={20}
                  height={20}
                  alt="logoInt"
                />
              </Link>

              <Link>
                <Image
                  src={"/Github.svg"}
                  width={20}
                  height={20}
                  alt="logoInt"
                />
              </Link>
            </Flex>
            <Flex w="100%" justifyContent="center">
              <form onSubmit={handleSubmit}>
                <FormControl id="email">
                  <Flex justifyContent="space-around" flexDirection="column">
                    <Input variant="filled" placeholder="Email" />
                    <Input
                      type="password"
                      mt="5"
                      variant="filled"
                      placeholder="Password"
                    />
                  </Flex>
                  <Flex
                    mt="5"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Link>
                    <Text>Esquecei a senha</Text>
                    </Link>
                    
                    <Button type="submit" bgColor="green.light" color="white">
                      Entrar
                    </Button>
                  </Flex>
                </FormControl>
              </form>
            </Flex>
            <Flex
              mt="10"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
            >
              <Link href="/auth/register">Criar uma conta</Link>
              <Link mt="5" href="/auth/register">
                Entrar como convidado
              </Link>
            </Flex>
          </Flex>
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
