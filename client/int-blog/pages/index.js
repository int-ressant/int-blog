import { Box, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import MainLink from "../components/mainLink";
import styles from "../styles/Home.module.css";

export default function Home() {
  const handlePublish = () => {};

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

      <Box  className={styles.main}>
        <Flex flex="5">
          <Flex flex="1" bg="blue"></Flex>
          <Flex flexDirection='column' flex="3">
            <Flex flexFlow={['column wrap','nowrap']} flexBasis='auto'  justifyContent="space-around"  p="5">
              <Clickables txt="Publicar artigo" />
              <Clickables txt="Publicar artigo" />
              <Clickables txt="Publicar artigo" />
            </Flex>
            <Flex w='85%' h='20%' borderRadius='10' justifyContent='center' alignItems='center' as='button'  alignSelf='center' bgColor='blue.dark' >
<Text color='white'fontWeight='bold' fontSize='xxx-large' >ANUNCIE AQUI</Text>
            </Flex>
          </Flex>
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
