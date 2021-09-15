import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'


export const AuthContext= createContext([]);

export function AuthProvider({children}){

    //dados e funcoes
    let guest={id:'',type:'Guest',username:''}

    const [isLogged,setIsLogged]=useState(null);
    const [userData,setUserData]=useState({});

    useEffect(()=>{
        if(userData.type==='Guest'){
            // setIsLogged(true);
        }else if(!isLogged && userData.id ){
            
            Cookies.set('int@username',String(userData.username));
            Cookies.set('int@type',String(userData.type));
            Cookies.set('int@id',String(userData.id));
            
        }

    },[userData])

    function handleLogin(data){
        
        setUserData(data);
        setIsLogged(true);
    }

    const handleGuestLogin=()=>{
        setUserData(guest);
    }

    const handleUserData=(data)=>{
        setUserData(data);
    }

    const clearUserData=()=>{
        setUserData([]);
        Cookies.remove('int@username');
        Cookies.remove('int@type');
        Cookies.remove('int@token');
        Cookies.remove('int@id');
    }

    const handleLogout=()=>{
        setIsLogged(false);
        clearUserData();
    }

    

    return <AuthContext.Provider value={{isLogged,setIsLogged, handleLogin,handleLogout, handleUserData,clearUserData,userData,setUserData,handleGuestLogin}}>
{children}
    </AuthContext.Provider>

}

export function useAuth () {
    const context=useContext(AuthContext);
    const {isLogged,setIsLogged, handleLogout, handleLogin,handleUserData,clearUserData,userData,setUserData,handleGuestLogin}=context;

    return {isLogged,setIsLogged, handleLogout, handleLogin,handleUserData,clearUserData,userData,setUserData,handleGuestLogin}
}