import '../buildmenu/characterbuild.css'
import './dueling.css'


function Character(props){

return (
  <div className = {"row align-items-center justify-content-center"} style={{'width':"300px", 'height': "300px"}}>
    <div className={`icon ${props.turn} flip sprite${props.selChar['fields']['type']}`} ></div>
  </div>
)

}

export default Character