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
            <h1>{message}</h1>
            {props.battleMode == 'wonBattle' && <h3>You gained {exp.toFixed(2)} experience points!</h3>}
            {(levelUp === true) && <h3>You Leveled Up!</h3>}
            <button onClick={props.BattleEnd}>Return Home</button>
        </div>
    )
}

export default EndBattle