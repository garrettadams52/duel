import axios from 'axios';

export const getBaseChars = async () =>{
    const baseCharData = axios.get('/basecharacters')
    return baseCharData
}

