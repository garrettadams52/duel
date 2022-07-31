import { useState } from 'react'
import StartBattle from '../components/battlemenu/StartBattle'
import Dueling from "../components/battlemenu/Dueling"

const Battle = () => {
    const [battleMode, setBattleMode] = useState('start')
    
    
    return (
        <div>
            {battleMode === 'start' && <StartBattle BattleStart={()=>setBattleMode('battle')}/>}
            {battleMode === 'battle' && <Dueling BattleCur={()=>setBattleMode('endBattle')}/>}
            {battleMode === 'battleEnd' && <EndBattle BattleEnd={()=>setBattleMode('start')}/>}
        </div>
    )
    
}

export default Battle;