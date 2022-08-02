import { useState } from 'react'
import StartBattle from '../components/battlemenu/StartBattle'
import Dueling from "../components/battlemenu/Dueling"


const Battle = (props) => {
    const [battleMode, setBattleMode] = useState('start')
    const [selChar, setSelChar] = useState(null)
    
    return (
        <div>
            {battleMode === 'start' && props.charData!=null && <StartBattle selChar={selChar} setSelChar={setSelChar} charData={props.charData} BattleStart={()=>setBattleMode('battle')}/>}
            {battleMode === 'battle' && <Dueling selChar={props.charData[selChar]} moves={props.moves} BattleCur={()=>setBattleMode('endBattle')}/>}
            {battleMode === 'battleEnd' && <EndBattle BattleEnd={()=>setBattleMode('start')}/>}
        </div>
    
    )
    
}

export default Battle;