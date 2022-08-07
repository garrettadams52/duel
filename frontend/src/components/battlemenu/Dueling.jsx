import Enemy from './Enemy'
import Character from './Character'
import "./dueling.css"
import { useState } from 'react'
import  Button from "@mui/material/Button"
import Damage from "./Damage"
import {useEffect} from 'react'

function Dueling(props){
    const [turn, setTurn] = useState('Player One')
    const [playerOneHealth, setPlayerOneHealth] = useState(100)
    const [playerTwoHealth, setPlayerTwoHealth] = useState(100)
    const [enemyData, setEnemyData] = useState(null)
    const [currAttack, setCurrAttack] = useState('')
    let showTurn = "false"
    let moveArr = []
    props.moves[props.selChar['fields']['type']].forEach(elem => {
        moveArr.push(elem['fields'])
    });
    turn === "Player One" ? showTurn = "color" : showTurn = "false"

    const inflictDamage = (move) => {
        const damage = Damage(turn, props.selChar['fields'], enemyData, move)

        if(turn == "Player One"){
            setCurrAttack(`Player One used ${move.name} it did ${damage} damage${damage == 0 ? ', it missed.' : '.'}`)
            setPlayerTwoHealth(val => (val - damage).toFixed(2))
            if(playerTwoHealth-damage < 0){
                props.BattleCur("wonBattle")
            }
        }
        else if(turn == "Player Two"){
            setCurrAttack(`Player Two used ${move.name} it did ${damage} damage${damage == 0 ? ', it missed.' : '.'}`)
            setPlayerOneHealth(val => (val - damage).toFixed(2))
            if(playerOneHealth - damage < 0){
                props.BattleCur("lostBattle")
            }
        }

    }

    const attack = (move) => {
        setTurn("Player Two")
        inflictDamage(move)
    }

    useEffect(()=>{
    },[turn])

    return(
        <div className='container'>
            <div className='row align-items-center' style={{'height':'20vh', 'overflow': 'hidden'}}>
                <div className='col-md-3'>
                    <h1>{props.selChar['fields']['name']}</h1>
                    <h2>Health: {playerOneHealth} </h2>
                    </div>
                <div className='col-md-6'>
                    
                </div>
                <div className='col-md-3'>
                    <h1>Player Two</h1>
                    <h2>Health: {playerTwoHealth} </h2>
                </div> 
            </div>
            <div className='row align-items-end' style={{'height':'45vh', 'overflow': 'hidden'}}>
                <div className='wrapper'>
                    <Character turn={showTurn} selChar={props.selChar}/>
                    <Enemy setTurn={setTurn} inflictDamage={inflictDamage} setPlayerOneHealth = {setPlayerOneHealth} playerTwoHealth={playerTwoHealth} turn={turn} setEnemyData={setEnemyData}/>
                </div>
            </div>
            <div className='row align-items-end' style={{'height':'20vh','overflow': 'hidden'}}>
                <div className='col-md-3'>
                    {moveArr.map(elem=><Button variant="outlined" onClick={()=> turn == "Player One" && attack(elem)}>{elem['name']}</Button>)}
                </div>
                <div className='col-md-9'>
                    <h1>{turn}'s Turn!</h1>
                    <h3>{currAttack}</h3>
                    <Button variant="outlined" onClick={props.BattleCur}>End Duel</Button>
                </div>
            </div>
        </div>

    )
}

export default Dueling