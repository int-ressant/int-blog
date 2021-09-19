import { Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic';
import React from 'react'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(
 () => import("@uiw/react-md-editor").then((mod) => mod.default),
 { ssr: false }
);

export default function ViewPost() {
 return (
  <Flex flexDirection='column' flex='1' width='100vw'>
   <MDEditor style={{width: '100%', height: '500px' }} height={350}  value={'hello'} onChange={(e)=>setData(e)}/>
  </Flex>
 )
}
