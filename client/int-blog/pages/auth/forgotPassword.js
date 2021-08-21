import { Box, Button, Flex, FormControl, Input, Link, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import MainLink from '../../components/mainLink'
import styles from "../../styles/login-st.module.css";


export default function ForgotPassword() {

    const [email,setEmail]=useState('');
    const [fetching,setFecthing]=useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);

      };
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
              Entrar
            </Text>
            

            
            <Flex mt='5' w="100%" justifyContent="center">
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
                    
                    
                    <Button type="submit" bgColor="green.light" color="white">
                      Confirmar
                    </Button>
                  </Flex>
                </FormControl>
              </form>
            </Flex>
            <Flex
              mt="20"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
            >
              <MainLink href="/auth/register" txt='Criar uma conta' /> 
              <MainLink txt="Entrar como convidado" mt="5" href="/auth/register"/>
               
            </Flex>
          </Flex>
        </Flex>
      </Box>
    )
}
