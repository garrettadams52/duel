import Enemy from './Enemy'
import Character from './Character'
import "./dueling.css"
import { useState } from 'react'
import  Button from "@mui/material/Button"
import Damage from "./Damage"

function Dueling(props){
    const [turn, setTurn] = useState('Player One')
    const [playerOneHealth, setPlayerOneHealth] = useState(100)
    const [playerTwoHealth, setPlayerTwoHealth] = useState(100)
    const [enemyData, setEnemyData] = useState(null)
    const [currAttack, setCurrAttack] = useState('')

    const inflictDamage = (move) => {
        const damage = Damage(turn, props.selChar['fields'], enemyData, move)

        if(turn == "Player One"){
            setCurrAttack(`Player One used ${move.name} it did ${damage} damage`)
            setPlayerTwoHealth(val => (val - damage).toFixed(2))
            if(playerTwoHealth-damage < 0){
                props.BattleCur("wonBattle")
            }
        }
        else if(turn == "Player Two"){
            setCurrAttack(`Player Two used ${move.name} it did ${damage} damage`)
            setPlayerOneHealth(val => (val - damage).toFixed(2))
            if(playerOneHealth - damage < 0){
                props.BattleCur("lostBattle")
            }
        }

    }


    return(
        <>
        <div className='wrapper'>
            <Character playerOneHealth={playerOneHealth} inflictDamage={inflictDamage} setPlayerTwoHealth = {setPlayerTwoHealth} setTurn={setTurn} moves = {props.moves} turn={turn} selChar={props.selChar}/>
            <div>
                <h1>{turn}'s Turn!</h1>
                <h3>{currAttack}</h3>
                <Button variant="outlined" onClick={props.BattleCur}>End Duel</Button>
            </div>
            <Enemy setTurn={setTurn} inflictDamage={inflictDamage} setPlayerOneHealth = {setPlayerOneHealth} playerTwoHealth={playerTwoHealth} turn={turn} setEnemyData={setEnemyData}/>
        </div>
        </>
    )
}

export default Dueling