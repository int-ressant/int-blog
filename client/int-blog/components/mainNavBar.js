import { Box, Flex, IconButton,  MenuButton, Menu, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import styles from '../styles/Home.module.css'


import MainLink from './mainLink'

export default function MainNavBar() {
    return (
        <Flex alignItems='center'  w="100vw" h="8vh"  flexDirection="row">
          
        <Flex pl='10' w='25%' >
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
            
            <Box   as='button' borderRadius='5' bgColor='red.200' width='50' height='50' >
            <Menu>
            <MenuButton aria-label='user options' as={IconButton} >
            user
            </MenuButton>
            <MenuList>
            <MenuItem>Editar perfil</MenuItem>
            <MenuItem>Meus artigos</MenuItem>
            <MenuItem>Terminar sessao</MenuItem>
            </MenuList>
            </Menu>
            </Box>
           
          </Flex>
        </Flex>
        
        
     
    </Flex>
    )
}
