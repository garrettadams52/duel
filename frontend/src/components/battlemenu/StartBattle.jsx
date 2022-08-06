import './startbattle.css'
import  Button from "@mui/material/Button"
import { useState,useEffect } from 'react'
import BattleCard from './BattleCard'
import Typography from '@mui/material/Typography';



function StartBattle(props){
    
    let show = false

    useEffect(() => {
        props.getSetCharandMoveData()
    }, [])

    return(
        <div>
            {(props.selChar || props.selChar == 0)&& <Button variant="outlined" onClick={props.BattleStart}>Start Duel</Button>}
            <Typography gutterBottom variant="h5" component="div">Select Your Player</Typography>
            <div className="row">
            {props.charData.map((character, index) => {
                props.selChar===index ? show = 'show' : show = false
                return <div className='col-md-2'>
                    <BattleCard character={character} set={()=>props.setSelChar(index)} show={show}/>
                </div>  
            })}
            </div>
        
        </div>
    )
}

export default StartBattle