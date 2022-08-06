import '../buildmenu/characterbuild.css'
import './dueling.css'
import {useEffect} from 'react'
import  Button from "@mui/material/Button"


function Character(props){
let turn = "false"

let moveArr = []
props.moves[props.selChar['fields']['type']].forEach(elem => {
    moveArr.push(elem['fields'])
});
props.turn === "Player One" ? turn = "color" : turn = "false"

useEffect(()=>{
},[props.turn])

const attack = (move) => {
  props.setTurn("Player Two")
  props.inflictDamage(move)
}

return (
  <div>
    <h1>Player One</h1>
    <h2>Health: {props.playerOneHealth} </h2>
    <div style = {{'margin': '0 auto'}} className={`icon ${turn} flip sprite${props.selChar['fields']['type']}`}></div>
    <div>
      {moveArr.map(elem=><Button variant="outlined" onClick={()=> props.turn == "Player One" && attack(elem)}>{elem['name']}</Button>)}
    </div>
  </div>
)

}

export default Character