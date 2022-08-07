import Enemy from './Enemy'
import {Bar} from './HealthBar'
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
    const [attacking, setAttacking] = useState('')
    const [enemyAttacking, setEnemyAttacking] = useState('')
    const [playerHit, setPlayerHit] = useState('')
    const [enemyHit, setEnemyHit] = useState('')
    const [enemyName,setEnemyName] = useState('')
    let showTurn = 'false'
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

        console.log(turn,move,damage)


    }

    const attack = (move) => {

        setAttacking('attack')
        setTimeout(()=>{
            setAttacking("reset")
            inflictDamage(move)
            setEnemyHit('hit')
            setTimeout(()=>{
                setEnemyHit('')
                setTimeout(()=>{
                    setTurn("Player Two")
                },200)
            },500)
        },200)
    }

    useEffect(()=>{
    },[turn])

    return(
        <div className='container'>
            <div className='row align-items-center' style={{'height':'20vh', 'overflow': 'hidden'}}>
                <div className='col-md-3'>
                    <Bar label={props.selChar['fields']['name']} value={playerOneHealth}/>
                </div>
                <div className='col-md-6'>
                    
                </div>
                <div className='col-md-3'>
                    <Bar label={enemyName} value={playerTwoHealth}/>
                </div> 
            </div>
            <div className='row align-items-end' style={{'height':'45vh', 'overflow': 'hidden'}}>
                <div className='wrapper'>
                    <div className = {"row align-items-center justify-content-center"} style={{'width':"300px", 'height': "300px"}}>
                        <div className={`icon ${turn} ${showTurn} ${playerHit} flip ${attacking} sprite${props.selChar['fields']['type']}`} ></div>
                    </div>
                    <Enemy setEnemyName={setEnemyName} setTurn={setTurn} enemyHit={enemyHit} setPlayerHit={setPlayerHit} enemyAttacking={enemyAttacking} inflictDamage={inflictDamage} setPlayerOneHealth = {setPlayerOneHealth} playerTwoHealth={playerTwoHealth} turn={turn} setEnemyAttacking = {setEnemyAttacking} setEnemyData={setEnemyData}/>
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