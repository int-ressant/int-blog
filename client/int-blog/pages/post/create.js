import React from 'react'
import { Box, Flex, Text} from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import {FiChevronLeft} from 'react-icons/fi'
import {RiDraftFill} from 'react-icons/ri'
import {IoSend} from 'react-icons/io5'
import Image from 'next/image'
import {Textarea} from '@chakra-ui/react'

export default function CreatePost() {
    return (
        <Box backgroundColor='gray.100' flex='1' >
            <Flex flex='1' justifyContent='space-between' >
            <Box flex='1' w='25vw' h='100vh'  ><Button backgroundColor='transparent' leftIcon={<FiChevronLeft/>}><Text>Voltar</Text></Button></Box>
            
            <Box w='50vw' h='100vh'>
                <Image src={'/intressantLOGO.svg'} width={45} height={45}/>
                <Flex flexDirection='column' >
                    <Flex mt='5' w='100%' justifyContent='space-between' flexDirection='row'>
                        <Text>Criar artigo</Text>
                        <Flex>
                            
                        </Flex>
                    </Flex>
                    <Flex mt='5' justifyContent='space-between' flexDirection='row'>
                        <Button w='2' backgroundColor='gray.200' >B</Button>
                        <Button w='2' backgroundColor='gray.200'>I</Button>
                        <Button w='20' backgroundColor='gray.200'>Link</Button>
                        <Button w='120' backgroundColor='gray.200'>Foto de capa</Button>

                    </Flex>
                    <Textarea placeholder='something' mt='5' h='50vh' w='100%' backgroundColor='white'>
                        <Button>carregar imagem</Button>
                    </Textarea>
                    <Flex mt='5' w='80%' justifyContent='space-between'>
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
