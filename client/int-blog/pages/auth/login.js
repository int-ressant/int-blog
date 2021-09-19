// import React from "react";
import Image from "next/image";
import styles from "../../styles/login-st.module.css";
import {Link as NextLink} from 'next/link'
import AuthHeader from "../../components/authHeader";
import { Box } from "@chakra-ui/layout";
import {
  Button,
  Flex,
  FormControl,
  Input,
  Link,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import MainLink from "../../components/mainLink";
import { api } from "../../lib/api";
import { useState } from "react";
import { useRouter } from "next/router";
import authContext, { useAuth } from "../../contexts/authContext";
import Cookies from "js-cookie";
import {AuthProvider} from '../../contexts/authContext'

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [data,setData]=useState({});
  const toast=useToast();
  const router=useRouter();
  const {handleLogin, handleGuestLogin, clearUserData, userData}=useAuth();

  

  const handleLoginAsGuest=()=>{
      clearUserData();
     Cookies.remove('int@username',{path:'/',domain:'localhost'});
        Cookies.remove('int@type',{path:'/',domain:'localhost'});
        Cookies.remove('int@token',{path:'/',domain:'localhost'});
        Cookies.remove('int@id',{path:'/',domain:'localhost'});
     handleGuestLogin();
    console.log(userData);
    router.push('/');
  }



  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true);


    console.log("clicked");
  
    api.post('/users/signin', email.toLowerCase().includes('@') ? {email:email,password:password} :{username:email,password:password}).then((res)=>{
      console.log(res.data.message);
      console.log(JSON.stringify(res.data.data.token));
      let newData={
        id:String(res.data.data.id),
        type:res.data.data.user.type,
        email:res.data.data.user.email,
        username:res.data.data.user.username
      };

      

      Cookies.set('int@token',res.data.data.token);
      api.defaults.headers.common['Authorization']=res.data.data.token;
      handleLogin(newData);
      setLoading(false);

      toast({
        title:'Logando...',
        description:res.message,
        status:'success',
        duration:5000,
        isClosable:true,
      });
      router.push('/');

    }).catch((error)=>{
      console.log(error);
      setLoading(false);
      toast({
        title:'Erro ao logar!',
        description:error ? error.message : error.response.data.message ,
        status:'error',
        duration:5000,
        isClosable:true,
      })
    })
  };

  const LinkB=({href,mt,txt})=>{
    return(
     
      <Link mt={mt} className={styles.btn} >
                <Button as='a' href={href} textDecoration='none' className={styles.btn} fontWeight='normal' variant='ghost' aria-label={txt} >
                {txt}
                </Button>
                </Link>
    )
  }

  return (
    <>
    {/* <AuthProvider> */}
    <div>
      {/* <AuthHeader /> */}
      <Box className={styles.blob}>
        <Flex alignItems="center" justifyContent="center">
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Image
              src={"/intressantLOGO.svg"}
              width={150}
              height={100}
              alt="logoInt"
            />
            <Text textAlign='center' color="blue.dark" fontWeight="bold">
              Bem vindo a maior comunidade Mocambicana de devs
            </Text>
            <Text mt="5" color="blue.dark">
              Entrar
            </Text>
            <Flex
              mt="10"
              mb="10"
              w={["60%",'40%']}
              
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              flexDirection="row"
              
            >
              <Link  >
                <Image
                  src={"/Facebook.svg"}
                  width={20}
                  height={20}
                  alt="logoInt"
                />
              </Link>

              <Link>
                <Image
                  src={"/Google.svg"}
                  width={20}
                  height={20}
                  alt="logoInt"
                />
              </Link>

              <Link>
                <Image
                  src={"/Github.svg"}
                  width={20}
                  height={20}
                  alt="logoInt"
                />
              </Link>
            </Flex>
            <Flex w="100%" justifyContent="center">
              <form onSubmit={handleSubmit}>
                <FormControl id="email">
                  <Flex justifyContent="space-around" flexDirection="column">
                    <Input value={email} onChange={(e)=>setEmail(e.currentTarget.value)} variant="filled" placeholder="Email" />
                    <Input
                    value={password} onChange={(e)=>setPassword(e.currentTarget.value)}
                      type="password"
                      mt="5"
                      variant="filled"
                      placeholder="Password"
                    />
                  </Flex>
                  <Flex
                    mt="5"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Link href='/auth/forgotPassword' >
                    <Text>Esquecei a senha</Text>
                    </Link>
                    
                    <Button isLoading={loading} type="submit" bgColor="green.light" color="white">
                      Entrar
                    </Button>
                  </Flex>
                </FormControl>
              </form>
            </Flex>
            <Flex
              mt="10"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
            >
              <MainLink href="/auth/register" txt='Criar uma conta' /> 
              {/* <MainLink action={handleGuestLogin} href='/' txt="Entrar como convidado" mt="5"/> */}
              <Button variant='link' mt='5' onClick={handleLoginAsGuest} >Entrar como Guest</Button>
               
            </Flex>
          </Flex>
        </Flex>
      </Box>
      {/* <Image
        className="blob"
        src="/blob.svg"
        width="100%"
        height="100%"
        layout="responsive"
      /> */}
    </div>
    {/* </AuthProvider> */}
    </>
  );
}

export default Login;


// export const getServerSideProps= async (ctx) => {
//   const { type, id, username, token} = ctx.req.cookies;

//   return {}
// }
