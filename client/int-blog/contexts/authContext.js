import { createContext, useContext, useState } from "react";


export const AuthContext= createContext([]);

export default AuthProvider=({children})=>{

    //dados e funcoes

    const [isLogged,setIsLogged]=useState(null);

    const handleLogin=()=>{
        setIsLogged(true);
    }

    const handleLogout=()=>{
        setIsLogged(false);
    }

    return <AuthContext.Provider value={{isLogged,setIsLogged, handleLogin,handleLogout}}>
{children}
    </AuthContext.Provider>

}

export function UseAuth () {
    const context=useContext(AuthContext);
    const {isLogged,setIsLogged, handleLogout, handleLogin}=context;

    return {isLogged,setIsLogged, handleLogout, handleLogin}
}