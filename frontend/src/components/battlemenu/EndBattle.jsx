import { Typography,Button } from '@mui/material'
import axios from 'axios'


function EndBattle(props){

    const exp = Math.random() * (160 - 5) + 5
    const currentExp = parseFloat(props.character['fields']['experience'],10)
    let message = ''
    let levelUp = false

    if(((exp+currentExp) > 100)&&(props.battleMode == 'wonBattle')){
        levelUp = true
    }

    const ExpGain = (exp, character,levelUp) =>{
        console.log(character)
        axios.post('/addexp', {exp:exp, pk: character['pk'],level_up:levelUp}).then((response)=>{
           console.log('response from server: ', response)
        })

    }

    if(props.battleMode == 'wonBattle'){
        message = "You won the battle!"
        ExpGain(exp, props.character,levelUp)
    }
    else if(props.battleMode == 'lostBattle'){
        message = "You lost the battle!"
    }

    return(
        <div>
            <Typography variant="h1">{message}</Typography>
            {props.battleMode == 'wonBattle' && <Typography variant='h3'>You gained {exp.toFixed(2)} experience points!</Typography>}
            {(levelUp === true) && <Typography variant='h3'>You Leveled Up!</Typography>}
            <Button variant="contained" color="secondary" size="medium" onClick={props.BattleEnd}>Return Home</Button>
        </div>
    )
}

export default EndBattle