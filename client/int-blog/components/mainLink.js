import { Button, Link, LinkOverlay } from "@chakra-ui/react";
import React from "react";
import styles from "../styles/login-st.module.css";

export default function MainLink({ href, mt,txt, mr, color, fontWeight, action }) {
  return (
    
      <Button
      onClick={action}
      mr={mr} color={color} mt={mt}
        className={styles.btn}
        fontWeight={fontWeight? fontWeight :"normal"}
        variant="ghost"
        aria-label={txt}
        as="a"
        href={href}
      >
        {txt}
      </Button>

  );
}
