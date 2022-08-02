import '../buildmenu/characterbuild.css'
import './dueling.css'
import {useEffect} from 'react'


function Character(props){
let turn = "false"

let moveArr = []
props.moves[props.selChar['fields']['type']].forEach(elem => {
    moveArr.push(elem['fields']['name'])
});
props.turn === "Player One" ? turn = "color" : turn = "false"

useEffect(()=>{
},[props.turn])

const attack = () => {
  console.log("testing")
  props.setTurn("Player Two")
}

return (
  <div>
    <h1>Player One</h1>
    <h2>{props.playerOneHealth} </h2>
    <div style = {{'margin': '0 auto'}} className={`icon ${turn} flip sprite${props.selChar['fields']['type']}`}></div>
    <div>
      {moveArr.map(elem=> <button onClick={()=>attack()}>{elem}</button>)}
    </div>
  </div>
)

}

export default Character