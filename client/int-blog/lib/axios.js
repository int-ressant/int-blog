import axios from 'axios'

export const http=axios.create({
    baseUrl: 'https://iblogapi.herokuapp.com/api',

})