import axios from 'axios';

const baseUrlPoke = "https://pokeapi.co/api/v2";
const baseUrlDnD = "https://www.dnd5eapi.co/api";
const baseUrlName = "https://randomuser.me/api/";

const makeUrl = (baseUrl, relativeUrl) => `${baseUrl}/${relativeUrl}`

export const getPokemon = async () => {
    let rand = Math.floor(Math.random() * (900))
    const response = await axios.get(makeUrl(baseUrlPoke,`pokemon/${rand}`))
    return response.data
}

export const getAttacks = async () => {
    const response = await axios.get(makeUrl(baseUrlDnD,'spells'))
    const movesArr = Array.from({length:3},()=> {
            const rand = Math.floor(Math.random() * (319))
            const randName = response.data.results[rand]['name']
            const randAccuracy = Math.floor(Math.random() * (10))+1
            const randPower = Math.floor(Math.random() * (10))+1
            const randMag = Math.random() < 0.5
        return {name:randName, accuracy:randAccuracy, power: randPower, magical: randMag}
    })
    
    return movesArr
}

export const getName = async () => {
    const response = await axios.get(baseUrlName)
    return response.data
}