import "./battle.css"
import { useState } from 'react'
import StartBattle from '../components/StartBattle'
import Dueling from "../components/Dueling"

const Battle = () => {
    const [battleMode, setBattleMode] = useState('start')
    
    
    return (
        <div className='wrapper'>
            {battleMode === 'start' && <StartBattle BattleStart={()=>setBattleMode('battle')}/>}
            {battleMode === 'battle' && <Dueling BattleCur={()=>setBattleMode('endBattle')}/>}
            {battleMode === 'battleEnd' && <EndBattle BattleCur={()=>setBattleMode('endBattle')}/>}
        </div>
    )
    
}

export default Battle;