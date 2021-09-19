import { Box, Flex, Tag, Text } from '@chakra-ui/react'
import React from 'react'


export default function ShortenArticle({title,description,datetime,tag1,tag2,tag3,username,views,comments,myref, actionPost, actionTag,tags}) {
    return (
      <div ref={myref}>
        <Flex
        
        borderRadius="10"
        bg="gray.200"
        w="100%"
        h="12rem"
        flex="5"
        mb='5'
      >
        <Flex p="5" flex="3" flexDirection="column">
          <Text as='button' textAlign='left' onClick={actionPost} py="5" fontSize="xl" fontWeight="bold">
            {title}
          </Text>
          <Text as='button'  onClick={actionPost} textAlign='left'  >
           {description}
          </Text>
          <Flex alignItems='center' mt="5" >
          <Text fontSize="xs" mr='5' color="gray.400">
            {datetime}
          </Text>
          <Flex   w='50%' justifyContent='space-around'>
       
          {tags?.map((item,index)=>{
            return(
            <Tag as='button'  onClick={actionTag(item)} size='sm' bgColor='green.100' >{item}</Tag>)
            
})}
          </Flex>
         
          {/* {tag1 && <Flex   w='50%' justifyContent='space-between'>
          <Tag as='button'  onClick={actionTag} size='sm' bgColor='green.100' >{tag1}</Tag>
          {tag2 && <Tag as='button'  onClick={actionTag} size='sm' bgColor='green.100' >{tag2}</Tag>}
          {tag3 && <Tag as='button'  onClick={actionTag} size='sm' bgColor='green.100' >{tag3}</Tag>}
          </Flex>} */}
          
          </Flex>
          
        </Flex>
        <Flex flex="1" pr='5' flexDirection="column">
          <Box as='button' bg='green.300' w='100%' borderRadius='0px 0px 10px 10px' h='50%' />
          <Text textAlign='center'>{username}</Text>
           <Flex justifyContent='space-around'  mt='2' >
             <Box  as='button' >
               <Text fontWeight='bold' >Views</Text>
               <Text>{views}</Text>
             </Box>
             <Box as='button' >
               <Text fontWeight='bold'>Comm</Text>
               <Text textAlign='center'>{comments}</Text>
             </Box>
             </Flex> 
         
        </Flex>
      </Flex>
      </div>
    )
}
