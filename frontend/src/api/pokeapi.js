import axios from 'axios';

const baseUrlPoke = "https://pokeapi.co/api/v2";
const baseUrlMagic = "https://api.magicthegathering.io"

const makeUrl = (baseUrl, relativeUrl) => `${baseUrl}/${relativeUrl}`

export const getDitto = async () => {
    const response = await axios.get(makeUrl(baseUrlPoke,'pokemon/ditto'))
    return response.data;
}

export const getCards = async () => {
    const response = await axios.get(makeUrl(baseUrlMagic,'v1/cards'))
    return response.data;
}