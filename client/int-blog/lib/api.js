const axios=require('axios');

export const api=axios.default.create({
    baseURL:'https://iblogapi.herokuapp.com/api/',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Acess-Control-Allow-Origin':'*',
    }
})