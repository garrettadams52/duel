import { useEffect, useState } from 'react'
import { getDitto } from '../api/pokeapi'
import characterData from '../data/character.json'

const ViewCharacter = () => {

    const [dittoData, setDittoData] = useState(null)

    const getSetDittoData = async () => {
        const dd = await getDitto();
        setDittoData(dd)

    }

    useEffect(() => {
        getSetDittoData()
    }, [])

    return <div>
    {JSON.stringify(dittoData)}
    {characterData.map((character) => {
        return <div>
            <h1>{character.title}</h1>
            <div>
             Class: {character.class}
            </div>
            <div>
             Weapon: {character.weapon}
            </div>
            <div>
             Scores: {character.attack}, {character.defense}
            </div>
            <div>
             Moves: {character.moves.join(',')}
            </div>
        </div>
    })}
    </div>
}

export default ViewCharacter;