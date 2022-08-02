import { getCards, getPokemon } from "../../api/GetEnemy"
import {useState,useEffect} from "react"
import './healthbar.css'


function Enemy({name,moves,turn,setTurn}){
    let turnCss = "color"

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


    turn === "Player Two" ? turnCss = "color" : turnCss = "false"
    return (
        <div>
            <h1>Player Two</h1>
            <div class="health-bar">
                <div class="health-bar-glass">
                    <div class="health-bar-fluid anim-width"></div>
                </div>
            </div>
            <span>{moves.join(',')}</span>
            <img className={turnCss} src={pokeData}></img>
            <button onClick={()=>setTurn("Player One")}>End Turn</button>
        </div>
    )
  }

  export default Enemy
