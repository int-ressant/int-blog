import { Box, Button, Flex, FormControl, HStack, Input, Link, PinInput, PinInputField, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import MainLink from '../../components/mainLink'
import styles from "../../styles/login-st.module.css";


export default function ForgotPassword() {

    const [email,setEmail]=useState('');
    const [fetching,setFecthing]=useState(false);
    const [next,setNext]=useState('none');
    const [password,setPassword]=useState('');
    const [cPassword,setCPassword]=useState('');
    const [otp,setOtp]=useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFecthing(true);
        console.log(email);
        setTimeout(()=>{
            setFecthing(false);
            setNext('step1');
        },2000)

      };

      const handleGoBack=()=>{
          next==='step1' ? setNext('none') : setNext('step1');
      }

      const handleSubmitOtp=()=>{
        e.preventDefault();
        setFecthing(true);
        console.log(otp);
        setTimeout(()=>{
            setFecthing(false);
            setNext('step2');
        },2000)
      }

      const handleSubmitPass=()=>{
        e.preventDefault();
        setFecthing(true);
        console.log(pass);
        setTimeout(()=>{
            setFecthing(false);
            setNext('step3');
        },2000)
      }

      const EmailForm=()=>{
          return(
              <>
            <form onSubmit={handleSubmit}>
            <FormControl id="email">
              <Flex justifyContent="space-around" flexDirection="column">
                <Input value={email} onChange={(e=>setEmail(e.currentTarget.value))} variant="filled" placeholder="Email" />
                
              </Flex>
              <Flex
                mt="5"
                alignItems="center"
                justifyContent="center"
              >
                
                
                <Button isLoading={fetching} type="submit" bgColor="green.light" color="white">
                  Confirmar
                </Button>
              </Flex>
            </FormControl>
          </form>
          </>
          )
      }

      const PasswordForm=()=>{
        return(
          <form onSubmit={handleSubmitPass}>
          <FormControl id="password">
            <Flex justifyContent="space-around" flexDirection="column">
              <Input value={password} onChange={(e=>setPassword(e.currentTarget.value))} variant="filled" placeholder="nova password" />
              <Input value={cPassword} onChange={(e=>setCPassword(e.currentTarget.value))} variant="filled" placeholder="confirmar password" />
            </Flex>
            <Flex
              mt="5"
              alignItems="center"
              justifyContent="center"
            >
              
              
              <Button isLoading={fetching} type="submit" bgColor="green.light" color="white">
                Confirmar
              </Button>
            </Flex>
          </FormControl>
        </form>
        )
    }

      const OtpForm=()=>{
        return(
          <form onSubmit={handleSubmitOtp}>
          <FormControl id="otp">
            <Flex justifyContent="space-around" flexDirection="column">
            <HStack>
  <PinInput value={otp} otp size='lg' >
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
</HStack>
            </Flex>
            <Flex
              mt="5"
              alignItems="center"
              justifyContent="center"
            >
              
              
              <Button isLoading={fetching} type="submit" bgColor="green.light" color="white">
                Confirmar
              </Button>
            </Flex>
          </FormControl>
        </form>
        )
    }

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
            <Text textAlign='center' color="blue.dark" fontWeight="bold">
              Bem vindo a maior comunidade Mocambicana de devs
            </Text>
            <Text mt="5" color="blue.dark">
              Recuperar senha
            </Text>
            

            
            <Flex mt='5' w="100%" justifyContent="center">
             {next==='none' ? <EmailForm/>: next==='step1' ?<OtpForm/> : <PasswordForm/> }
            </Flex>
            <Flex
              mt="20"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
            >
             { next==='none' ?<> <MainLink href="/auth/register" txt='Criar uma conta' /> 
              <MainLink txt="Entrar como convidado" mt="5" href="/auth/register"/></>
            :
              <Button onClick={handleGoBack} leftIcon={<Image src='/backarrow.svg' width='25' height='25 ' />} variant='ghost'>Voltar</Button>
            }
               
            </Flex>
          </Flex>
        </Flex>
      </Box>
    )
}
