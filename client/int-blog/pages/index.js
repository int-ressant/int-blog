import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  useToast,

} from "@chakra-ui/react";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLink from "../components/mainLink";
import ShortenArticle from "../components/shortenArticle";
import { useAuth } from "../contexts/authContext";
import { api } from "../lib/api";
import styles from "../styles/Home.module.css";

export default function Home() {
  
  const [post,setPost]=useState([]);
  const router=useRouter();
  const toast=useToast();

  const {userData}=useAuth();

  const getPosts=async()=>{
    api.get('/posts').then((res)=>{
      console.log(res.data);
      setPost(res.data);

    }).catch((err)=>{
      console.log(err);
      toast({
        title:'Erro ao carregar posts, tente novamente',
        description:err.message,
        status:'error'
      })
    })
  }

  const getPostByUser=async()=>{

    api.get('/posts/all').then((res)=>{
      console.log(res.data);
      setPost(res.data);
      
    }).catch((err)=>{
      console.log(err);
      toast({
        title:'Erro ao carregar posts, tente novamente',
        description:err.message,
        status:'error'
      })
    })
  }

  useEffect(()=>{

    if(userData.type==='Guest'){
      toast({
        position: 'top',
        title:'Logado como visitante',
        status:'warning',
      })
      getPosts();
    }
    if(userData.type==='Regular'){
      getPostByUser()
    }

  },[])

  const handlePublish = () => {router.push('/post/create')};

  const Clickables = ({ txt }) => {
    return (
      <Flex
        alignItems="flex-end"
        onClick={handlePublish}
        justifyContent="center"
        as="button"
        bgColor="blue.dark"
        borderRadius="10"
        h="15rem"
        w="10rem"
        bgGradient='linear(to-t, blue.dark,blue.500)'
      >
        <Text
          textTransform="uppercase"
          pb="5"
          textAlign="center"
          color="white"
          fontWeight="bold"
          w="80%"
        >
          {txt}
        </Text>
      </Flex>
    );
  };

  const ClickablesSection = () => {
    return (
      <Flex
        flexFlow={["column wrap", "nowrap"]}
        flexBasis="auto"
        justifyContent="space-around"
        p="5"
      >
        <Clickables txt="Publicar artigo" />
        <Clickables txt="Publicar artigo" />
        <Clickables txt="Publicar artigo" />
      </Flex>
    );
  };

  const AdSection = () => {
    return (
      <Flex
        w="85%"
        h="10rem"
        borderRadius="10"
        justifyContent="center"
        alignItems="center"
        as="button"mt='5'
        alignSelf="center"
        bgColor="blue.dark"
        bgGradient='linear(to-r,#6a85b6,#bac8e0)'
      >
        <Text color="white" fontWeight="bold" fontSize="xxx-large">
          
        </Text>
      </Flex>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Int.ressant</title>
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Box className={styles.main}>
        <Flex flex="5">
          <Flex flex="1"
          //  bg="blue"
           ></Flex>
          <Flex flexDirection="column" flex="3">
            {/* <ClickablesSection /> */}
            {/* <AdSection /> */}
            <Button onClick={handlePublish} alignSelf='center' alignItems='center' justifyContent='center' w='50%' mt='10' borderRadius='5' height='10' backgroundColor='green.400'>
             
              <Text color='white' >Publicar artigo</Text>
              
              
            </Button>
         
            <Flex flex='1'>
              <Flex p="10" w="100%" justifyContent="space-between">
                <Text ml='5' fontWeight="bold" color="blue.dark">
                  Feed
                </Text>
                <Flex  flex="1">
                  <Tabs variant="unstyled" align="end" colorScheme="green">
                    <TabList>
                      <Tab
                        _selected={{
                          bg: "blue.dark",
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "10",
                        }}
                      >
                        Todos
                      </Tab>
                      <Tab
                        _selected={{
                          bg: "blue.dark",
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "10",
                        }}
                      >
                        Sugeridos
                      </Tab>
                      <Tab
                        _selected={{
                          bg: "blue.dark",
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "10",
                        }}
                      >
                        Recentes
                      </Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel align="start" w="50vw">
                        
                        <ShortenArticle description='Something soweto' title='Big title' datetime='20:20 de Julho de 2021' username='paichato' comments='50' views='44' />
                        <ShortenArticle description='Something soweto' title='Big title' datetime='20:20 de Julho de 2021' username='paichato' comments='50' views='44' />
                        <ShortenArticle description='Something soweto' title='Big title' datetime='20:20 de Julho de 2021' username='paichato' comments='50' views='44' />
                        <ShortenArticle description='Something soweto' title='Big title' datetime='20:20 de Julho de 2021' username='paichato' comments='50' views='44' />

                      </TabPanel>
                      <TabPanel align="start" w="50vw">
                        <p>two!</p>
                      </TabPanel>
                      <TabPanel align="start" w="50vw"></TabPanel>
                    </TabPanels>
                  </Tabs>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex flex="1"
          //  bg="green"
           ></Flex>
        </Flex>
      </Box>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img
            src="/intressantLOGO.svg"
            alt="Interessant Logo"
            className={styles.logo}
          />
        </a>
      </footer>
    </div>
  );
}


{/* <Flex
                          borderRadius="10"
                          bg="gray.100"
                          w="100%"
                          h="100%"
                          flex="5"
                        >
                          <Flex p="5" flex="3" flexDirection="column">
                            <Text py="5" fontSize="xl" fontWeight="bold">
                              Big ttitle that you cant imagine
                            </Text>
                            <Text>
                              Big ttitle that you cant imagine Big ttitle that
                              you cant imagine. Big ttitle that you cant imagine
                              Big ttitle that you cant imagine
                            </Text>
                            <Flex alignItems='center' mt="5" >
                            <Text fontSize="xs" mr='5' color="gray.400">
                              18:20 25 Jan de 2021
                            </Text>
                            <Flex w='50%' justifyContent='space-between'>
                            <Tag size='sm' bgColor='green.100' >react</Tag>
                            <Tag size='sm' bgColor='green.100' >javscript</Tag>
                            <Tag size='sm' bgColor='green.100' >javscript</Tag>
                            </Flex>
                            
                            </Flex>
                            
                          </Flex>
                          <Flex flex="1" pr='5' flexDirection="column">
                            <Box as='button' bg='green.300' w='100%' borderRadius='0px 0px 10px 10px' h='50%' />
                            <Text textAlign='center'>username</Text>
                             <Flex justifyContent='space-around'  mt='2' >
                               <Box  as='button' >
                                 <Text fontWeight='bold' >Views</Text>
                                 <Text>900</Text>
                               </Box>
                               <Box>
                                 <Text fontWeight='bold'>Comm</Text>
                                 <Text>900</Text>
                               </Box>
                               </Flex> 
                           
                          </Flex>
                        </Flex> */}
