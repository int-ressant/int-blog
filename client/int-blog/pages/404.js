import React, { useEffect } from 'react'
import {useRouter} from 'next/router'
import {Link} from 'next/link'
import { Box, Text } from '@chakra-ui/react';

export default function NotFound() {


    const router =useRouter();

    useEffect(()=>{
        setTimeout(()=>{
            router.push('/');
        },3000)
    },[])

    return (
        <div>
            <Box p='5' align='center' md='8' >
            <Text fontSize='40'>Ooops</Text>
            <h2>Pagina nao encontrada</h2>
            <p>Voltar a  </p> 
            
            </Box>
            
        </div>
    )
}
