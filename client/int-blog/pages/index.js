import {
  Box,
  Button,
  Flex,
  Input,
  InputLeftElement,
  InputGroup,
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
import { useCallback, useEffect, useRef, useState } from "react";
import MainLink from "../components/mainLink";
import ShortenArticle from "../components/shortenArticle";
import { useAuth } from "../contexts/authContext";
import { api } from "../lib/api";
import styles from "../styles/Home.module.css";
import {FaSearch,FaFilter} from 'react-icons/fa'

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itsAll, setItsAll] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const observer = useRef();

  const lastPostElementRef = useCallback((node) => {
    // console.log(node);
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  });

  const router = useRouter();
  const toast = useToast();

  const { userData } = useAuth();

  const getPosts = async () => {
    setLoading(true);
    api
      .get(`/posts?page=${page}&offset=2`)
      .then((res) => {
        

        console.log(res.data);
        console.log(res.data.data[0].title);
        setPosts((prevPosts) => [...prevPosts, ...res.data.data]);
        setHasMore(res.data.next !== null);
        setLoading(false);
        res.data.next===null && console.log('fim');
        setItsAll(res.data.next===null);
        // setHasMore(res.data.length>posts.length);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
        // console.log(err.response.data.message);
        toast({
          title: "Erro ao carregar posts, tente novamente",
          description: err.message,
          status: "error",
        });
      });
  };

  const getPostByUser = async () => {
    api
      .get("/posts/all")
      .then((res) => {

        setLoading(false);

        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {

        setLoading(false);

        console.log(err);
        // console.log(err.response.data.message);
        toast({
          title: "Erro ao carregar posts, tente novamente",
          description: err.message,
          status: "error",
        });
      });
  };

  const handleTabsChange=(index)=>{
    setTabIndex(index);
  }

  useEffect(() => {
    setLoading(true);

    if (userData.type === "Guest") {
      toast({
        position: "top",
        title: "Logado como visitante",
        status: "warning",
      });
      getPosts();
    }
    if (userData.type === "Regular") {
      // getPostByUser();
      getPosts();
    }else{
      toast({
        position: "top",
        title: "Bem vindo. Nao tem sessao iniciada",
        status: "warning",
      });
      getPosts();
    }
  }, []);

  useEffect(() => {
    if(page>1){
      console.log('page:',page, 'hasmore:',hasMore);
      hasMore && getPosts();
    }
    
  }, [page]);

  const handlePublish = () => {
    router.push("/post/create");
  };

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
        bgGradient="linear(to-t, blue.dark,blue.500)"
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
        as="button"
        mt="5"
        alignSelf="center"
        bgColor="blue.dark"
        bgGradient="linear(to-r,#6a85b6,#bac8e0)"
      >
        <Text color="white" fontWeight="bold" fontSize="xxx-large"></Text>
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
        <Flex  flex="5">
          <Flex
            flex="1"
            h='80vh'
            w='20vw'
            position='fixed'
            // backgroundColor='green.300' 
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            >
              {/* <Flex
            flex="1"
            
           
            
          
            alignItems='center'
            > */}
              <Button w='90%' p='10' mt='120' >Home</Button>
              <Button w='90%' p='10' mt='5' >Pesquisar</Button>
              <Button w='90%' p='10' mt='5' >Ajuda</Button>
            </Flex>
          <Flex ml='20vw' flexDirection="column" flex="3">
          {/* <Flex  flexDirection="column" flex="3"> */}
           

            {/* <Box zIndex='10' p='5' w='60vw' borderRadius='10' backgroundColor='blue.dark' position='fixed' >
              <InputGroup flexDirection='row' alignItems='center'>
              <InputLeftElement alignItems='center' pointerEvents="none" children={<FaSearch color="white" />}/>
              <Input color='white' variant="flushed" />
              </InputGroup>
              </Box> */}


            <Button
              onClick={handlePublish}
              alignSelf="center"
              alignItems="center"
              justifyContent="center"
              w="50%"
              mt="10"
              borderRadius="5"
              height="10"
              backgroundColor="green.400"
            >
              <Text color="white">Publicar artigo</Text>
            </Button>

            <Flex flex="1">
              <Flex p="10" w="100%" justifyContent="space-between">
                <Text ml="5" fontWeight="bold" color="blue.dark">
                  {tabIndex===0 ? 'Feed':'Pesquisar'}
                </Text>
                <Flex flex="1">
                  <Tabs index={tabIndex} onChange={handleTabsChange} variant="unstyled" align="end" colorScheme="green">
                    <TabList>
                      <Tab
                        _selected={{
                          bg: "blue.dark",
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "10",
                        }}
                      >Recentes
                        
                      </Tab>
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
                        Pesquisar
                      </Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel align="start" w="50vw">
                        {posts.map((item, index) => {
                          let isLastElement = posts.length === index + 1;
                          // if (isLastElement) {
                          //   return (
                          //     <ShortenArticle
                          //       myref={lastPostElementRef}
                          //       description={item.slug}
                          //       title={item?.title}
                          //       datetime={item.createdAt}
                          //       username="author"
                          //       comments="50"
                          //       views={item.views.count}
                          //     />
                          //   );
                          // } else {
                          //   return (
                          //     <ShortenArticle
                          //       description={item.slug}
                          //       title={item?.title}
                          //       datetime={item.createdAt}
                          //       username="author"
                          //       comments="50"
                          //       views={item.views.count}
                          //       tag1={item.tags[0]}
                          //       tag2={item.tags[1]}
                          //       tag3={item.tags[2]}
                          //     />
                          //   );
                          // }
                          return(
                          // isLastElement ? (<div ref={lastPostElementRef} key={index}>{item.title}</div>) :
                            isLastElement ? (<ShortenArticle myref={lastPostElementRef} description={item.description} title={item.title}  datetime={item.createdAt} username='author' comments='50' views={item.views.count} />) :
                          <ShortenArticle description={item.slug} title={item.title}  datetime={item.createdAt}
                           username='author' comments='50' views={item.views.count} tag1={item.tags[0]} tag2={item.tags[1]} tag3={item.tags[2]}
                           />

                          //  <>

                            // <ShortenArticle description={item.slug} title={item.title}  datetime={item.createdAt}
                            //  username='author' comments='50' views={item.views.count} tag1={item.tags[0]} tag2={item.tags[1]} tag3={item.tags[2]}
                            //  />
                          //    {isLastElement && (<><ShortenArticle myref={lastPostElementRef} description={item.description} title={item.title}  datetime={item.createdAt} username='author' comments='50' views={item.views.count} /></>)}
                          // </>

                          )
                        })}
                        <div>{loading && "Loading..."}</div>
                        <Box  alignItems='center' w='100%' justifyContent='center' ><Text textAlign='center'>{itsAll && 'Sem mais posts'}</Text></Box>
                        
                        {/* <ShortenArticle description='Something soweto' title='Big title' datetime='20:20 de Julho de 2021' username='paichato' comments='50' views='44' />
                        <ShortenArticle description='Something soweto' title='Big title' datetime='20:20 de Julho de 2021' username='paichato' comments='50' views='44' />
                        <ShortenArticle description='Something soweto' title='Big title' datetime='20:20 de Julho de 2021' username='paichato' comments='50' views='44' />
                        <ShortenArticle description='Something soweto' title='Big title' datetime='20:20 de Julho de 2021' username='paichato' comments='50' views='44' /> */}
                      </TabPanel>
                      <TabPanel align="start" w="50vw">
                     
                        <p>two!</p>
                      </TabPanel>
                      <TabPanel align="start" w="50vw">
                      <Flex flexDirection='row' p='5' w='80%' justifyContent='space-between' borderRadius='10'  >
              <InputGroup flexDirection='row' alignItems='center'>
              <InputLeftElement alignItems='center' pointerEvents="none" children={<FaSearch color="#003049" />}/>
              <Input color='blue.dark' variant="flushed" />
              </InputGroup>
              <Button w='20%' ><Text mr='2'>filtrar</Text><FaFilter /></Button>
              </Flex> 
              <p>3!</p>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            flex="1"
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

{
  /* <Flex
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
                        </Flex> */
}
