import {Bar} from './HealthBar'
import "./dueling.css"
import { useState } from 'react'
import  Button from "@mui/material/Button" 
import {useEffect} from 'react'
import {wait, Damage} from '../../shared/helpers'
import { Typography, Tooltip } from '@mui/material'


function Dueling(props){
    const [turn, setTurn] = useState('Player One')
    const [playerOneHealth, setPlayerOneHealth] = useState(100)
    const [playerTwoHealth, setPlayerTwoHealth] = useState(100)
    const [currAttack, setCurrAttack] = useState('')
    const [enemyAnimation, setEnemyAnimation] = useState('')
    const [playerAnimation, setPlayerAnimation] = useState('')

    let moveArr = []
    props.moves[props.selChar['fields']['type']].forEach(elem => {
        moveArr.push(elem['fields'])
    });


    const enemyAttack = async (move) => {

        await wait(3000)
        setEnemyAnimation('eneAttack')
        await wait(500)
        setEnemyAnimation("eneReset")
        setPlayerAnimation('hit')
        await wait(500)
        setPlayerAnimation('')
        inflictDamage(move)
        setTurn("Player One")
        
    }

    const attack = async (move) => {
        
        document.getElementById(move.name).disabled = true;
        setPlayerAnimation('attack')
        await wait(500)
        setPlayerAnimation("reset")
        setEnemyAnimation('hit')
        await wait(500)
        inflictDamage(move)
        setEnemyAnimation('')
        setTurn("Player Two")
        document.getElementById(move.name).disabled = false;
        
    }


    useEffect(()=>{
        if(turn === "Player Two"){
            let rand = Math.floor(Math.random() * (3))
            enemyAttack(props.enemyData['attacks'][rand])
        }
    },[turn])

    useEffect(()=>{

        const checkDead = async () =>{
            console.log(playerOneHealth,playerTwoHealth)
            if(playerOneHealth <= 0){
                await wait(2000)
                props.BattleCur("lostBattle")
            }
            else if(playerTwoHealth <= 0){
                await wait(2000)
                props.BattleCur("wonBattle")
            }

        }

        checkDead()

    },[playerOneHealth,playerTwoHealth])


    const inflictDamage = async (move) => {
        const damage = Damage(turn, props.selChar['fields'], props.enemyData['stats'], move)

        if(turn == "Player One"){
            setCurrAttack(`Player One used ${move.name} it did ${damage} damage${damage == 0 ? ', it missed.' : '.'}`)
            setPlayerTwoHealth(val => (val - damage) < 0 ? 0 : (val - damage))
            // // if(playerTwoHealth-damage < 0){
            // //     props.BattleCur("wonBattle")
            // // }
        }
        else if(turn == "Player Two"){
            setCurrAttack(`Player Two used ${move.name} it did ${damage} damage${damage == 0 ? ', it missed.' : '.'}`)
            setPlayerOneHealth(val => (val - damage) < 0 ? 0 : (val - damage))
            // // if(playerOneHealth - damage < 0){
            // //     props.BattleCur("lostBattle")
            // // }
        }

    }
   
    return(
        <div className='container'>
            <div className='row align-items-center' style={{'height':'20vh', 'overflow': 'hidden'}}>
                <div className='col-md-3'>
                    <Bar label={props.selChar['fields']['name']} value={playerOneHealth}/>
                </div>
                <div className='col-md-6'></div>
                <div className='col-md-3'>
                    <Bar label={props.enemyData['name']} value={playerTwoHealth}/>
                </div> 
            </div>
            <div className='row align-items-end' style={{'height':'45vh', 'overflow': 'hidden'}}>
                <div className='wrapper'>
                    <div className = {"row align-items-center justify-content-center"} style={{'width':"300px", 'height': "300px"}}>
                        <div className={`icon ${turn} ${playerAnimation} flip sprite${props.selChar['fields']['type']}`} ></div>
                    </div>
                    <div>
                        <div><img className={`${enemyAnimation}`} src={props.enemyData['pokemon']} width = "300" height = "300"></img></div>
                    </div>
                </div>
            </div>
            <div className='row battleDialog' style={{'height':'20vh','overflow': 'hidden'}}>
                <div className='col-md-3 vstack gap-2 align-self-center'>
                    {moveArr.map(elem=><Tooltip disableInteractive title={`Power: ${elem.power}, Accuracy: ${elem.accuracy}, Magical: ${elem.magical}`}><Button id={elem.name} variant="contained" onClick={()=> (turn == "Player One") && attack(elem)}>{elem['name']}</Button></Tooltip>)}
                    <Button variant="outlined" onClick={props.run}>End Duel</Button>
                </div>
                <div className='col-md-9 align-self-start'>
                    <Typography variant='h3'>{turn}'s Turn!</Typography>
                    <Typography variant='h5'>{currAttack}</Typography>
                </div>
            </div>
        </div>

    )
}

export default Dueling