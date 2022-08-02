import { getAttacks, getPokemon } from "../../api/GetEnemy"
import {useState,useEffect} from "react"
import './dueling.css'


function Enemy({name,moves,turn,setTurn,playerTwoHealth, setPlayerOneHealth}){
    let turnCss = "color"

    const [pokeData, setPokeData] = useState(null)
    const [attackData, setAttackData] = useState(null)

    const getSetEnemyData = async () => {
        const poke = await getPokemon();
        const attacks = await getAttacks();
        const img = poke.sprites.front_default
        setPokeData(img)
        setAttackData(attacks)
    }

    const attack = () => {
        console.log("testing")
        setTurn("Player One")
      }

    useEffect(() => {
        getSetEnemyData()
    }, [])

    
    turn === "Player Two" ? turnCss = "color" : turnCss = "false"
    return (
        <div>
            <h1>Player Two</h1>
            <h2>{playerTwoHealth} </h2>
            <div><img className={turnCss} src={pokeData}></img></div>
            {attackData && <div> {attackData.map(elem => <button onClick={()=>attack()}>{elem}</button>)} </div>}
        </div>
    )
  }

  export default Enemy
