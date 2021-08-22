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
       

        <Flex flex="5">
          <Flex flex="1" bg="blue"></Flex>
          <Flex flex="3" bg="red.400">
            
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
