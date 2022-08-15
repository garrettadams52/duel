import { useState,useEffect } from 'react'
import StartBattle from '../components/battlemenu/StartBattle'
import Dueling from "../components/battlemenu/Dueling"
import EndBattle from '../components/battlemenu/EndBattle'
import {getEnemyData} from '../shared/helpers'
import * as React from 'react';
import { Box,CircularProgress } from '@mui/material'



const Battle = (props) => {
    const [battleMode, setBattleMode] = useState('start')
    const [selChar, setSelChar] = useState(null)
    const [enemyData, setEnemyData] = useState(null)
    

    const getSetEnemyData = async () => {
        const data = await getEnemyData()
        if(data)
            setEnemyData(data)
    }


const CircularIndeterminate = () => {
        
    return (
      <Box sx={{ display: 'flex' }}>
        <div className='col align-self-center'>
            <CircularProgress />
        </div>
      </Box>
    )
  }

    useEffect(()=>{
        if(battleMode == 'battle')
            getSetEnemyData()
    },battleMode)
    

    return (
        <>
            {battleMode === 'start' && props.charData!=null && <StartBattle getSetCharandMoveData = {props.getSetCharandMoveData} setEnemyData={setEnemyData} selChar={selChar} setSelChar={setSelChar} charData={props.charData} BattleStart={()=>setBattleMode('battle')}/>}
            {battleMode === 'battle' && enemyData && <Dueling enemyData={enemyData} selChar={props.charData[selChar]} moves={props.moves} run = {()=>setBattleMode('start')} BattleCur={(result)=>setBattleMode(result)}/>}
            {battleMode === 'battle' && !enemyData && <CircularIndeterminate/>}
            {(battleMode === 'lostBattle' || battleMode === 'wonBattle') && <EndBattle character = {props.charData[selChar]} battleMode={battleMode} BattleEnd={()=>setBattleMode('start')}/>}
        </>
    
    )
    
}

export default Battle;