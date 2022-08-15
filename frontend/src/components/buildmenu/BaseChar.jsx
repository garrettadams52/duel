import './characterbuild.css'
import CardDisplay from './BaseCharCard'

function BaseChar(props){

return(
        
        props.baseCharData.map((character, index) => {
        let moveArr = []
        props.moves[character['fields']['type']].forEach(elem => {
            moveArr.push(elem['fields']['name'])
        });
        return <div className='col-md-3'>
            <CardDisplay character={character} moveArr={moveArr} set = {()=>props.setSelectChar(props.baseCharData[index])}/>
        </div>  
    })
)

}

export default BaseChar;