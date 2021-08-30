import React, { useState } from "react";
import styles from "../../styles/register-st.module.css";

import AuthHeader from "../../components/authHeader";
import { Box } from "@chakra-ui/layout";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import MainLink from "../../components/mainLink";
import BackButton from "../../components/backButton";
import useSWR from 'swr'

const myInit = { method: 'POST',
              //  headers: myHeaders,
              header:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
               'Access-Control-Allow-Origin':'*',
              },
               mode: 'cors',
               cache: 'default' };

const fecther =(url)=> fetch(url, {method:'POST'}).then((res)=>res.json());


// export const gestServerSideProps=async(req,res)=>{
  
// }

function Register() {
  const [next, setNext] = useState("none");
  const [fetching, setFetching] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [email, setEmail] = useState("");
  const [submited, setSubmited] = useState(false);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [username,setUsername]=useState('');

  const {data,error}=useSWR(
    'https://iblogapi.herokuapp.com/api/users/register',
    fecther
  )

  const handleClick = () => setShow(!show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmited(true);
    setValidated(cpassword === password && password.length >= 6);
    validated && setFetching(true);

   
    

    if(data){
      console.log(data);
    }

    if(error){
      console.log(error);
    }
    

    // auth.post('https://iblogapi.herokuapp.com/api/users/register',{
    //   username:username,
    //   email:email,
    //   password:password,
    //   // headers:{
    //   //   'Accept':'application/json',
    //   //   'Content-Type': 'application/json',
    //   //   'Access-Control-Allow-Origin':'*',
    //   // }
    // }).then((res)=>{
    //   console.log(JSON.stringify(res));
    // }).catch((err)=>{
    //   console.log('err',err);
    // })

    // setTimeout(() => {
    //   setFetching(false);
    //   validated && setNext("step1");
    // }, 2000);

    console.log("clicked");
  };

  const handleGoBack = () => {
    setNext("none");
  };

  const SocialLinks = () => {
    return (
      <Flex
        mt="10"
        mb="10"
        w={["60%", "40%"]}
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        flexDirection="row"
      >
        <Link>
          <Image src={"/Facebook.svg"} width={20} height={20} alt="logoInt" />
        </Link>

        <Link>
          <Image src={"/Google.svg"} width={20} height={20} alt="logoInt" />
        </Link>

        <Link>
          <Image src={"/Github.svg"} width={20} height={20} alt="logoInt" />
        </Link>
      </Flex>
    );
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
            <Text textAlign="center" color="blue.dark" fontWeight="bold">
              Bem vindo a maior Comunidade Mocambicana
            </Text>
            <Text mt="5" color="blue.dark">
              Criar conta
            </Text>

            {next === "none" && <SocialLinks />}

            <Flex w="100%" justifyContent="center">
              {next === "none" ? (
                <form onSubmit={handleSubmit}>
                  <FormControl >
                    <Flex justifyContent="space-around" flexDirection="column">
                    <Input
                        variant="filled"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.currentTarget.value)}
                        type='username'
                        mb='5'
                      />
                      <Input
                        variant="filled"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                      />
                      <InputGroup mt='5' size="md">
                        <Input
                          pr="4.5rem"
                          value={password}
                          onChange={(e) => setPassword(e.currentTarget.value)}
                          isInvalid={password.length < 6}
                          errorBorderColor="red.200"
                          type={show ? "text" : "password"}
                          // mt="5"
                          variant="filled"
                          placeholder="Create password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button variant='solid'   color='blue.dark' h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Esc" : "Ver"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>

                      {submited && password.length < 6 && (
                        <Text fontSize="xx-small" color="red.400">
                          password deve conter pelo menos 6 caracteres
                        </Text>
                      )}
<InputGroup mt='5' size="md">
                      <Input
                        value={cpassword}
                        onChange={(e) => setCpassword(e.currentTarget.value)}
                        isInvalid={password != cpassword}
                        errorBorderColor="red.200"
                        type="password"
                        // mt="5"
                        variant="filled"
                        placeholder="Confirm password"
                      />
                      <InputRightElement width="4.5rem">
                          <Button variant='solid'  color='blue.dark' h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Esc" : "Ver"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      {submited && cpassword != password && (
                        <Text fontSize="xx-small" color="red.400">
                          passwords devem ser iguais
                        </Text>
                      )}
                    </Flex>
                    <Flex
                      mt="5"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Link href="/auth/login">
                        <Text>Tenho conta</Text>
                      </Link>

                      <Button
                        isLoading={fetching}
                        type="submit"
                        bgColor="green.light"
                        color="white"
                      >
                        Criar conta
                      </Button>
                    </Flex>
                  </FormControl>
                </form>
              ) : (
                <Box p="5" mt="5" textAlign="center" bgColor="green.50">
                  <Text>
                    Enviamos lhe um email, verifique a sua caixa <br /> de
                    entrada no seu email.
                  </Text>
                </Box>
              )}
            </Flex>
            <Flex
              mt="10"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
            >
              {next === "none" ? (
                <>
                  <MainLink txt="Entrar como convidado" mt="5" href="/" />
                </>
              ) : (
                <Box mt="20">
                  <BackButton handleGoBack={handleGoBack} />
                </Box>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
}

export default Register;
