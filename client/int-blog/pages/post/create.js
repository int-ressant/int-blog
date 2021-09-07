import React, { useState } from 'react'
import { Box, Flex, Text} from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import {FiChevronLeft} from 'react-icons/fi'
import {RiDraftFill} from 'react-icons/ri'
import {IoSend} from 'react-icons/io5'
import Image from 'next/image'
import {Textarea, Input, Tag, TagLabel, TagCloseButton, useToast} from '@chakra-ui/react'

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
  );

export default function CreatePost() {

    const [data,setData]=useState('# hm...  INTressant');
    const [tags,setTags]= useState([]);
    const [tag,setTag]=useState('');
    const toast=useToast();
    const router=useRouter();

    const handleAddTag=(tagname)=>{
        if(tags.find((tag)=>tag===tagname)){
            console.log('error');
            toast({
                title:'tag ja existe',
                status:'warning',
                position:'top'
            })
        }else if(!tagname){
            toast({
                title:'tag invalida',
                status:'warning',
                position:'top'
            })
        }else{ 
        setTags(oldTags=>[...oldTags,tagname]);
        console.log(tags);
        }
    }

    const handleRemoveTag=(tagname)=>{
        // const newTgas=tags;
    //    const newTags= !tags.filter((tag)=>tag===tagname);
  
        setTags(oldTags=> oldTags.filter((tag)=>tag===!tagname))
    }

    return (
        <Box backgroundColor='gray.100' flex='1' >
            <Flex flex='1' justifyContent='space-between' >
            <Box flex='1' w='25vw' h='100vh'  ><Button onClick={()=>router.back()} backgroundColor='transparent' leftIcon={<FiChevronLeft/>}><Text>Voltar</Text></Button></Box>
            
            <Box w='50vw' h='100vh'>
                <Image src={'/intressantLOGO.svg'} width={45} height={45}/>
                <Flex flexDirection='column' >
                    <Flex mb='5' mt='5' w='100%' justifyContent='space-between' flexDirection='row'>
                        <Text>Criar artigo</Text>
                        <Flex>
                            
                        </Flex>
                    </Flex>
                    {/* for tags */}
                    <Flex>
                        {tags.map((tagname)=>{
                            return(<Tag
                    size={'sm'}
                    key={tagname}
                    borderRadius="full"
                    variant="solid"
                    colorScheme="green"
                    
    >
        <TagLabel>{tagname}</TagLabel>
      <TagCloseButton onClick={()=>handleRemoveTag(tagname)} />
    </Tag>)
                        })}
                    
                    </Flex>
                    <Flex mt='5' justifyContent='space-between' flexDirection='row'>
                        
                        <Button w='120' backgroundColor='gray.200'>Adiconar Foto de capa</Button>
                        <Box w='60%' h='100%' backgroundColor='green.100'>
                            <Flex ml='2'>
                                <Button onClick={()=>handleAddTag(tag)} variant='ghost' backgroundColor='transparent' >Adicionar tag</Button>
                                <Flex  alignItems='center' w='70%' >
                                <Input value={tag} onChange={(e)=>setTag(e.currentTarget.value)} placeholder="escreva a tag" size="sm" />
                                </Flex>
                            </Flex>
                        </Box>

                    </Flex>
                    <Flex placeholder='something' mt='5' h='50vh' w='100%' backgroundColor='white'>
                        <MDEditor style={{width: '100%', height: '500px' }} height={350}  value={data} onChange={(e)=>setData(e)}/>
                    </Flex>
                    <Flex mt='10' w='80%' justifyContent='space-between'>
                        <Button leftIcon={<RiDraftFill/>} color='white' backgroundColor='green.light' p='5'>Guardar rascunho</Button>
                        <Button rightIcon={<IoSend/>} color='white' backgroundColor='blue.dark' p='5'>Publicar artigo</Button>
                    </Flex>

                </Flex>
            </Box>

            <Box w='25vw' h='100vh'  ></Box>
            </Flex>
            
        </Box>
    )
}
