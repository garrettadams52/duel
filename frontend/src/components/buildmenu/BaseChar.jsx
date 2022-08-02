import './characterbuild.css'

function BaseChar(props){

return(
    
        props.baseCharData.map((character, index) => {
        let moveArr = []
        props.moves[character['fields']['type']].forEach(elem => {
            moveArr.push(elem['fields']['name'])
        });
        return <div className='col-md-3'>
            <ul style={{'list-style':'none'}}>
                <li> <div style = {{'margin': '0 auto'}} className={`icon sprite${character['fields']['type']}`}></div></li>
                <li>Type: {character['fields']['type']}</li>
                <li>Strength: {character['fields']['strength']}</li>
                <li>Defense: {character['fields']['defense']}</li>
                <li>Evasion: {character['fields']['evasion']}</li>
                <li>Spirit: {character['fields']['spirit']}</li>
                <li>Wisdom: {character['fields']['wisdom']}</li>
                <li>Accuracy: {character['fields']['accuracy']}</li>
                <li>Moves: {moveArr.join(', ')}</li>
                <button onClick={()=>props.setSelectChar(props.baseCharData[index])}>Choose {character['fields']['type']}</button>
            </ul>
        </div>  
    })
)

}

export default BaseChar;