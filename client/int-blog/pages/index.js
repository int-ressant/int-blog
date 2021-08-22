import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import MainLink from "../components/mainLink";
import styles from "../styles/Home.module.css";

export default function Home() {
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
        <Flex alignItems='center'  w="100vw" h="8vh"  flexDirection="row">
          
            <Flex w='25%' >
            <img
              src="/intressantLOGO.svg"
              alt="Interessant Logo"
              className={styles.logo}
            />
            </Flex>

            <Flex borderRadius='0px 0px 0px 20px' justifyContent='space-between' alignItems='center' bgColor='blue.dark' flex='1' h='100%' flexDirection='row'>
              <Flex ml='5' flexDirection='row' >
                <MainLink color='white' txt='Home' fontWeight='bold' href='/'/>
                <MainLink color='white' txt='Artigos' fontWeight='bold' href='/'/>
                <MainLink color='white' txt='Pesquisar' fontWeight='bold' href='/'/>
                <MainLink color='white' txt='Ajuda' fontWeight='bold' href='/'/>
              </Flex>

              <Flex mr='10'>
              <Box p='5' mr='5' as='button' borderRadius='5' bgColor='gray.200'  width='5' height='5' />
                <Box p='5' as='button' borderRadius='5' bgColor='red.200' width='50' height='50' >
                Hey
                </Box>
              </Flex>
            </Flex>
            
            
         
        </Flex>

        <Flex flex="5">
          <Flex flex="1" bg="blue"></Flex>
          <Flex flex="3" bg="red.400"></Flex>

          <Flex flex="1" bg="green"></Flex>
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
