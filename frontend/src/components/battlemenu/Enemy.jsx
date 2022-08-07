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
        const img = poke.sprites.front_default
        setPokeData(img)
        setAttackData(attacks)
        setEnemyData(getStats())
    }

    const attack = (move) => {
        setTimeout(setTurn,3000,"Player One")
        setTimeout(inflictDamage,3000,move)
      }

    useEffect(() => {
        getSetEnemyData()
    }, [])

    if(turn === "Player Two"){
        let rand = Math.floor(Math.random() * (3))
        attack(attackData[rand])
        
    }
    turn === "Player Two" ? turnCss = "color" : turnCss = "false"
    return (
        <div>
            <div><img className={turnCss} src={pokeData} width = "300" height = "300"></img></div>
        </div>
    )
  }

  export default Enemy
