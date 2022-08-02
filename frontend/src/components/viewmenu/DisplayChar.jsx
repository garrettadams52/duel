import "../buildmenu/characterbuild.css"
import axios from "axios"
import { useState,useEffect } from "react"

function DisplayChar(props){
    const [reload, setReload] = useState(1)

    //Function to delete a char, called when button is pressed
    const deleteChar = function(event,pk){
        event.preventDefault()
        axios.delete('/deletecharacter', {headers:{'header':"header"},data:{'pk':pk}}).then((response)=>{
           console.log('response from server: ', response)
           reload === 1 ? setReload(2) : setReload(1)
        })
        
    }

    useEffect(() => {
        props.getSetCharandMoveData()
    }, [reload])

    return (
        <div className="row">
        {props.charData.map((character, index) => {
            let moveArr = []
            props.moves[character['fields']['type']].forEach(elem => {
                moveArr.push(elem['fields']['name'])
            });
            return <div className='col-md-2'>
                <ul style={{'list-style':'none'}}>
                    <li><img className={`icon sprite${character['fields']['type']}`}></img></li>
                    <li>Type: {character['fields']['type']}</li>
                    <li>Level: {character['fields']['level']}</li>
                    <li>Experience: {character['fields']['experience']}</li>
                    <li>Strength: {character['fields']['strength']}</li>
                    <li>Defense: {character['fields']['defense']}</li>
                    <li>Evasion: {character['fields']['evasion']}</li>
                    <li>Spirit: {character['fields']['spirit']}</li>
                    <li>Wisdom: {character['fields']['wisdom']}</li>
                    <li>Accuracy: {character['fields']['accuracy']}</li>
                    <li>Moves: {moveArr.join(', ')}</li>
                    <li><button>Give NickName</button><button onClick={(event)=>deleteChar(event,character['pk'])}>Delete Character</button></li>
                </ul>
            </div>  
        })}
        </div>
    )
    


}

export default DisplayChar