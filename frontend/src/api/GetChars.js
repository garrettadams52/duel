import axios from 'axios';

export const getChars = async () =>{
    const charData = axios.get('/characters')

    return charData
}