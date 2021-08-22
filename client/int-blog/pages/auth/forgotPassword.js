import {
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Input,
  Link,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import MainForm from "../../components/mainForm";

import MainLink from "../../components/mainLink";
import styles from "../../styles/login-st.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [fetching, setFecthing] = useState(false);
  const [next, setNext] = useState("none");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFecthing(true);
    console.log(email);
    setTimeout(() => {
      setFecthing(false);
      setNext("step1");
    }, 2000);
  };

  const handleGoBack = () => {
    setOtp("");

    next === "step1" ? setNext("none") : setNext("step1");
  };

  const handleSubmitOtp = async(e) => {
    e.preventDefault();
    setFecthing(true);
    console.log(otp);
    setTimeout(() => {
      setFecthing(false);
      setNext("step2");
    }, 2000);
  };

  const handleSubmitPass = async(e) => {
    e.preventDefault();
    setFecthing(true);
    console.log(pass);
    setTimeout(() => {
      setFecthing(false);
      setNext("step3");
    }, 2000);
  };

 

  // if(next==='none'){
  //     return null
  // }else if(next==='step1'){

  // }else if(next==='setp2'){

  // }

  return (
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
            Bem vindo a maior comunidade Mocambicana de devs
          </Text>
          <Text mt="5" color="blue.dark">
            { next==='none' ? 'Recuperar senha' : next==='step1'? 'Insira o codigo otp': 'Digite nova password'}
          </Text>

          <Flex mt="5" w="100%" justifyContent="center">
            {next === "none" ? (
              <MainForm
                email
                value={email}
                id={email}
                setValue={setEmail}
                action={handleSubmit}
                fetching={fetching}
              />
            ) : next === "step1" ? (
              <MainForm
                otp
                value={otp}
                
                setValue={setOtp}
                action={handleSubmitOtp}
                fetching={fetching}
              />
            ) : (
              <MainForm pass value={password}
             
              setValue={setPassword}
              setValue2={setCPassword}
              value2={cPassword}
              action={handleSubmitPass}
              fetching={fetching} />
            )}
          </Flex>
          <Flex
            mt="20"
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
          >
            {next === "none" ? (
              <>
                {" "}
                <MainLink href="/auth/register" txt="Criar uma conta" />
                <MainLink
                  txt="Entrar como convidado"
                  mt="5"
                  href="/auth/register"
                />
              </>
            ) : (
              <Button
                onClick={handleGoBack}
                leftIcon={
                  <Image src="/backarrow.svg" width="25" height="25 " />
                }
                variant="ghost"
              >
                Voltar
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
