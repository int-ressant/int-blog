import React, { useEffect } from 'react'
import {useRouter} from 'next/router'

export default function NotFound() {


    const router =useRouter();

    useEffect(()=>{
        setTimeout(()=>{
            router.push('/');
        },3000)
    },[])

    return (
        <div>
            <h1>Ooops</h1>
            <h2>Pagina nao encontrada</h2>
            <p>Voltar a <Link hrefef='/'><a>Pagina Inicial</a></Link> </p>
        </div>
    )
}
