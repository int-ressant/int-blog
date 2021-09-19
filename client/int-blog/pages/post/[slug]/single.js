import { Flex, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useRouter } from 'next/router';
import { api } from '../../../lib/api';

const MDEditor = dynamic(
 () => import("@uiw/react-md-editor").then((mod) => mod.default),
 { ssr: false }
);

// export const getStaticPaths=async()=>{


//  return {
//   paths:[
//    {params:{slug},fallback:false},
   
//   ]
//  }
// }

// export const getStaticProps=async()=>{
//  // const slug= context.params.slug;
//  const router=useRouter();
// const {slug}=router.query;

//  const res=await fetch(`https://iblogapi.herokuapp.com/api/posts/${slug}/single`);
//  const data= await res.json();

//  return {
//    props: {post:data},
//    fallback:false
//  }
// }

export default function ViewPost({post}) {

const router=useRouter();
const {slug}=router.query;
const [data,setData]=useState([]);


useEffect(()=>{
 // console.log(post);
 getPost();
 
},[])

const getPost=async()=>{
api.get(`https://iblogapi.herokuapp.com/api/posts/${slug}/single`).then((res)=>{
 console.log(res.data);
 setData(res.data);
}).catch((err)=>{
 console.log(err);
})


}

 return (
  <Flex p='5' flexDirection='column' flex='1' width='100vw'>
   <Text mt='5' variant='bold' fontSize='2xl' >Title</Text>
   <Text>{data?.data?.title}</Text>

   <Text mt='5' fontSize='2xl'>Descricao</Text>
   <Text>{slug}</Text>
  
   <MDEditor hideToolbar preview='preview'  height={'900'} width='100vw'  value={data?.data?.body} onChange={(e)=>setData(e)}/>
   {/* <MDEditor.Markdown  style={{width: '100%', height: '100vh' }} height={'100vh'}  source='hello'/> */}
  </Flex>
 )
}
