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
            
            Cookies.set('username',String(userData.username));
            Cookies.set('type',String(userData.type));
            Cookies.set('id',String(userData.id));
            
        }

    },[userData])

    function handleLogin(data){
        
        setUserData(data);
        setIsLogged(true);
    }

    const handleUserData=(data)=>{
        setUserData(data);
    }

    const clearUserData=()=>{
        setUserData([]);
    }

    const handleLogout=()=>{
        setIsLogged(false);
        clearUserData();
    }

    

    return <AuthContext.Provider value={{isLogged,setIsLogged, handleLogin,handleLogout, handleUserData,clearUserData,userData,setUserData}}>
{children}
    </AuthContext.Provider>

}

export function useAuth () {
    const context=useContext(AuthContext);
    const {isLogged,setIsLogged, handleLogout, handleLogin,handleUserData,clearUserData,userData,setUserData}=context;

    return {isLogged,setIsLogged, handleLogout, handleLogin,handleUserData,clearUserData,userData,setUserData}
}