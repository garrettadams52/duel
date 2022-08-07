import { getAttacks, getName, getPokemon } from "../../api/GetEnemy"
import {useState,useEffect} from "react"
import './dueling.css'
import  Button from "@mui/material/Button"



function Enemy({turn,setTurn, inflictDamage, setEnemyData, setEnemyName, setEnemyAttacking, enemyAttacking,setPlayerHit, enemyHit}){
    let turnCss = "false"
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
        const name = await getName();
        const img = poke.sprites.front_default
        setPokeData(img)
        setAttackData(attacks)
        setEnemyData(getStats())
        setEnemyName(name.results[0].name.first)
    }

    const attack = (move) => {
        setTimeout(()=>{
            inflictDamage(move)
            setTurn("Player One")
            setEnemyAttacking('eneAttack')
            setTimeout(setEnemyAttacking,200,"eneReset")
            setPlayerHit('hit')
            setTimeout(setPlayerHit,500,"")

        },3000)
    
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
            <div><img className={`${enemyAttacking} ${enemyHit} ${turnCss}`} src={pokeData} width = "300" height = "300"></img></div>
        </div>
    )
  }

  export default Enemy
