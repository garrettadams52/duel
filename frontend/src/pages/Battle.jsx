import { useState,useEffect } from 'react'
import StartBattle from '../components/battlemenu/StartBattle'
import Dueling from "../components/battlemenu/Dueling"
import EndBattle from '../components/battlemenu/EndBattle'



const Battle = (props) => {
    const [battleMode, setBattleMode] = useState('start')
    const [selChar, setSelChar] = useState(null)

    return (
        <div>
            {battleMode === 'start' && props.charData!=null && <StartBattle getSetCharandMoveData = {props.getSetCharandMoveData} selChar={selChar} setSelChar={setSelChar} charData={props.charData} BattleStart={()=>setBattleMode('battle')}/>}
            {battleMode === 'battle' && <Dueling selChar={props.charData[selChar]} moves={props.moves} BattleCur={(result)=>setBattleMode(result)}/>}
            {(battleMode === 'lostBattle' || battleMode === 'wonBattle') && <EndBattle character = {props.charData[selChar]} battleMode={battleMode} BattleEnd={()=>setBattleMode('start')}/>}
        </div>
    
    )
    
}

export default Battle;