import {useState, useEffect, useRef} from 'react'
import  Slider  from '@mui/material/Slider'
import axios from 'axios'


function CreateChar(props){
    const [availStat, setAvailStat] = useState(10)
    const [reload, setReload] = useState(1)
    const [inputStat, setInputStat] = useState(props.selectChar['fields'])
    const [update, setUpdate] = useState(false)
    const statType = Object.keys(props.selectChar['fields'])
    statType.pop()
    const slideMin = 0
    const slideMax = 10

    function changeStat(e, stat){
        let temp = inputStat
        temp[stat] = e.target.value
        setInputStat(temp)
        update === false ? setUpdate(true) : setUpdate(false)
    
    }

    useEffect(() => {
        setInputStat(props.selectChar['fields'])
    }, [()=>props.setSelectedChar])

    useEffect(() => {
        props.getSetCharandMoveData()
    }, [reload])

    const createChar = function(event,stats){
        event.preventDefault()
        axios.post('/createcharacter', stats).then((response)=>{
           console.log('response from server: ', response)
           reload === 1 ? setReload(2) : setReload(1)
        })
        
        
    }

  
return(
    <div>
        <div>Available Stat Points: {availStat}</div><button onClick={(event)=>createChar(event,inputStat)}>Create Character</button>
        <ul style={{'list-style':'none'}}>
            {statType.map((val, ind)=>{
                return <li key={ind}> {val}: {inputStat[val]} <Slider size={'small'} value={inputStat[val]} onChange={(e)=>changeStat(e,val)} min={slideMin} max={slideMax} valueLabelDisplay="auto"/></li>
            })}
        </ul>
    </div>
)
}

export default CreateChar