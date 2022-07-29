import Enemy from '../components/Enemy'
import Character from '../components/Character'
import characterData from '../data/character.json'

function Dueling(){
    return(
        <div>
            <Character name={characterData[0].title} moves={characterData[0].moves}/>
            <Enemy name={characterData[1].title} moves={characterData[1].moves}/>
        </div>
    )
}

export default Dueling