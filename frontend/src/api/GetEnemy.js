import axios from 'axios';

const baseUrlPoke = "https://pokeapi.co/api/v2";
const baseUrlDnD = "https://www.dnd5eapi.co/api"

const makeUrl = (baseUrl, relativeUrl) => `${baseUrl}/${relativeUrl}`

export const getPokemon = async () => {
    let rand = Math.floor(Math.random() * (1100))
    const response = await axios.get(makeUrl(baseUrlPoke,`pokemon/${rand}`))
    return response.data;
}

export const getAttacks = async () => {
    const response = await axios.get(makeUrl(baseUrlDnD,'spells'))
    let movesArr = Array.from({length:3},()=> {
        let rand = Math.floor(Math.random() * (319))
        return response.data.results[rand]['name']
    })
    
    return movesArr
}