import { useState } from "react"
import './startbattle.css'

function StartBattle(props){
    
    let show = false

    return(
        <div>
            <button onClick={props.BattleStart}>Start Duel</button>
            <h1>Select Your Player</h1>
            <div className="row">
            {props.charData.map((character, index) => {
                props.selChar===index ? show = 'show' : show = false
                return <div className='col-md-2'>
                    <ul className={show} style={{'list-style':'none'}}>
                        <li><div style = {{'margin': '0 auto'}} className={`icon sprite${character['fields']['type']}`}></div></li>
                        <li>Type: {character['fields']['type']}</li>
                        <li>Level: {character['fields']['level']}</li>
                        <li>Experience: {character['fields']['experience']}</li>
                        <li><button onClick={()=>props.setSelChar(index)}>Select</button></li>
                    </ul>
                </div>  
            })}
            </div>
        
        </div>
    )
}

export default StartBattle