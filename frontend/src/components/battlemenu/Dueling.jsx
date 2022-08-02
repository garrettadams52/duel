import Enemy from './Enemy'
import Character from './Character'
import characterData from '../../data/character.json'
import "./dueling.css"
import { useState } from 'react'

function Dueling(props){
    const [turn, setTurn] = useState('Player One')
    
    return(
        <>
        <div className='wrapper'>
            <Character setTurn={setTurn} moves = {props.moves} turn={turn} selChar={props.selChar}/>
            <h1>{turn}'s Turn!</h1>
            <Enemy setTurn={setTurn} turn={turn} name={characterData[1].title} moves={characterData[1].moves}/>
        </div>
        <button onClick={props.BattleCur}>End Duel</button>
        </>
    )
}

export default Dueling