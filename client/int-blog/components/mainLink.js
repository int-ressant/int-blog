import { Button, Link } from "@chakra-ui/react";
import React from "react";
import styles from "../styles/login-st.module.css";

export default function MainLink({ href, mt,txt, mr, color, fontWeight }) {
  return (
    <Link mr={mr} color={color} mt={mt} href={href}>
      <Button
        className={styles.btn}
        fontWeight={fontWeight? fontWeight :"normal"}
        variant="ghost"
        aria-label={txt}
        as="a"
      >
        {txt}
      </Button>
    </Link>
  );
}
