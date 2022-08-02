import '../buildmenu/characterbuild.css'
import './healthbar.css'
function Character(props){
let turn = "false"

let moveArr = []
props.moves[props.selChar['fields']['type']].forEach(elem => {
    moveArr.push(elem['fields']['name'])
});
props.turn === "Player One" ? turn = "color" : turn = "false"
return (
  <div>
    <h1>Player One</h1>
    <div class="health-bar">
      <div class="health-bar-glass">
          <div class="health-bar-fluid anim-width"></div>
      </div>
    </div>
    <img className={`icon color flip sprite${props.selChar['fields']['type']}`}></img>
    <button onClick={()=>props.setTurn("Player Two")}>End Turn</button>
    <div>{moveArr.join(', ')}</div>
  </div>
)

}

export default Character