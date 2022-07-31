import './characterbuild.css'

function BaseChar(props){

return(
    props.baseCharData.map((character, index) => {
        return <div className='col-md-3'>
            <ul style={{'list-style':'none'}}>
                <li><img className={`icon sprite${character['fields']['type']}`}></img></li>
                <li>Type: {character['fields']['type']}</li>
                <li>Strength: {character['fields']['strength']}</li>
                <li>Defense: {character['fields']['defense']}</li>
                <li>Evasion: {character['fields']['evasion']}</li>
                <li>Spirit: {character['fields']['spirit']}</li>
                <li>Wisdom: {character['fields']['wisdom']}</li>
                <li>Accuracy: {character['fields']['accuracy']}</li>
                <button onClick={()=>props.setSelectChar(props.baseCharData[index])}>Choose {character['fields']['type']}</button>
            </ul>
        </div>  
    })
)

}

export default BaseChar;