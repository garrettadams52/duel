import Enemy from './Enemy'
import Character from './Character'
import characterData from '../../data/character.json'
import "./dueling.css"

function Dueling(props){
    return(
        <>
        <div className='wrapper'>
            <Character name={characterData[0].title} moves={characterData[0].moves}/>
            <Enemy name={characterData[1].title} moves={characterData[1].moves}/>
        </div>
        <button onClick={props.BattleCur}>End Duel</button>
        </>
    )
}

export default Dueling