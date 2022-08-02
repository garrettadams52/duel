import { useEffect, useState } from 'react'
import DisplayChar from '../components/viewmenu/DisplayChar'

const ViewCharacter = (props) => {

    return (
        <div>
            <div>{props.moves!=null && props.charData!=null && <DisplayChar getSetCharandMoveData ={props.getSetCharandMoveData} moves={props.moves} charData={props.charData}/>}</div>
        </div>
    )
}
export default ViewCharacter;