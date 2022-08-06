import { getAttacks, getPokemon } from "../../api/GetEnemy"
import {useState,useEffect} from "react"
import './dueling.css'
import  Button from "@mui/material/Button"


function Enemy({turn,setTurn,playerTwoHealth, inflictDamage, setEnemyData}){
    let turnCss = "color"

    const [pokeData, setPokeData] = useState(null)
    const [attackData, setAttackData] = useState(null)
    
    const getStats = () => {
        const fields = ['accuracy','defense','evasion','spirit','strength','wisdom']
        const stats = fields.reduce((a,b)=>{
            return {...a, [b]:(Math.floor(Math.random() * (10))+1)}
        },{});
        return stats
    }

    const getSetEnemyData = async () => {
        const poke = await getPokemon();
        const attacks = await getAttacks();
        const stats = getStats();
        const img = poke.sprites.front_default
        setPokeData(img)
        setAttackData(attacks)
        setEnemyData(stats)
    }

    const attack = (move) => {
        setTurn("Player One")
        inflictDamage(move)
      }

    useEffect(() => {
        getSetEnemyData()
    }, [])

    
    turn === "Player Two" ? turnCss = "color" : turnCss = "false"
    return (
        <div>
            <h1>Player Two</h1>
            <h2>Health: {playerTwoHealth} </h2>
            <div><img className={turnCss} src={pokeData}></img></div>
            {attackData && <div> {attackData.map(elem => <Button variant="outlined" onClick={()=>(turn === "Player Two") && attack(elem)}>{elem["name"]}</Button>)} </div>}
        </div>
    )
  }

  export default Enemy
