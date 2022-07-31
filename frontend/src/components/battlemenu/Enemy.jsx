import { getCards, getPokemon } from "../../api/GetEnemy"
import {useState,useEffect} from "react"


function Enemy({name,moves}){

    //Enemy needs an image, strength, defense, accuracy, evasion, wisdom, spirit, name, and 3 moves
    //Image -> Pokemon
    //Stats -> Calculated
    //Name -> Magic Subtypes
    //Moves -> DnD Moves

    const [pokeData, setPokeData] = useState(null)

    const getSetPokeData = async () => {
        const poke = await getPokemon();
        const img = poke.sprites.front_default
        setPokeData(img)

    }

    useEffect(() => {
        getSetPokeData()
    }, [])


    console.log(pokeData)
    return (
        <div>
            <h1>{name}</h1>
            <span>{moves.join(',')}</span>
            <img src={pokeData}></img>
        </div>
    )
  }

  export default Enemy
