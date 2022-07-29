import { getCards } from "../api/pokeapi"


function Enemy({name,moves}){

    //Enemy needs an image, strength, defense, accuracy, evasion, wisdom, spirit, name, and 3 moves
    //Image -> Pokemon
    //Stats -> Calculated
    //Name -> Magic Subtypes
    //Moves -> DnD Moves




    return (
        <div>
            <h1>{name}</h1>
            <span>{moves.join(',')}</span>
        </div>
    )
  }

  export default Enemy
