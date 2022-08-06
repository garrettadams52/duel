import {useState, useEffect, useRef} from 'react'
import  Slider  from '@mui/material/Slider'
import axios from 'axios'
import  Button from "@mui/material/Button"
import Input from '@mui/material/Input';



function CreateChar(props){
    const [availStat, setAvailStat] = useState(10)
    const [reload, setReload] = useState(1)
    const [nickName, setNickName] = useState(null)
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

    const createChar = function(event,stats,nickName){
        event.preventDefault()
        stats['nickname'] = nickName
        axios.post('/createcharacter', stats).then((response)=>{
           console.log('response from server: ', response)
           reload === 1 ? setReload(2) : setReload(1)
        })
        props.setSelectChar(null)
    }

  
return(
    <div>
        <div>Available Stat Points: {availStat}</div><Input type={'text'} onChange={(e)=>setNickName(e.target.value)} placeholder='Name'></Input><Button variant="outlined" disabled = {!nickName} onClick={(event)=>createChar(event,inputStat,nickName)}>Create Character</Button>
        <ul style={{'list-style':'none'}}>
            {statType.map((val, ind)=>{
                return <li key={ind}> {val}: {inputStat[val]} <Slider size={'small'} value={inputStat[val]} onChange={(e)=>changeStat(e,val)} min={slideMin} max={slideMax} valueLabelDisplay="auto"/></li>
            })}
        </ul>
    </div>
)
}

export default CreateChar