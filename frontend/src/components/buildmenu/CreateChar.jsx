import {useState, useEffect, useRef} from 'react'
import  Slider  from '@mui/material/Slider'
import axios from 'axios'
import  Button from "@mui/material/Button"
import Input from '@mui/material/Input';
import { List, ListItemText, Typography } from '@mui/material';



function CreateChar(props){
    const [reload, setReload] = useState(1)
    const [nickName, setNickName] = useState(null)
    const [inputStat, setInputStat] = useState(props.selectChar['fields'])
    const [update, setUpdate] = useState(false)
    const statType = Object.keys(props.selectChar['fields'])
    statType.pop()
    const slideMin = 1
    const slideMax = 10
    const baseValsSum = Object.values(props.baseCharData[props.selectChar['pk']-1]['fields']).reduce((a,b)=>{
        if(typeof(b) == "number")
            return a+b
        return a+0
    })

    function changeStat(e, stat){

        let inputValsSum = Object.values(inputStat).reduce((a,b)=>{
            if(typeof(b) == "number")
                return a+b
            return a+0
        })
        
        if(((e.target.value-inputStat[stat])+inputValsSum)-baseValsSum<=10 || (e.movementX<=0 && (e.target.value<props.selectChar['fields'][stat]))){
            props.setAvailStat(10-(inputValsSum-baseValsSum))
            let temp = inputStat
            temp[stat] = e.target.value
            setInputStat(temp)
            update === false ? setUpdate(true) : setUpdate(false)
        }
    
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
        <Typography>Available Stat Points: {props.availStat}</Typography><Input type={'text'} onChange={(e)=>setNickName(e.target.value)} placeholder='Name'></Input><Button variant="outlined" disabled = {!nickName} onClick={(event)=>createChar(event,inputStat,nickName)}>Create Character</Button>
        <List>
            {statType.map((val, ind)=>{
                return <ListItemText key={ind}> {`${val.charAt(0).toUpperCase() + val.slice(1)}`}: {inputStat[val]} <Slider size={'small'} value={inputStat[val]} onChange={(e) => props.baseCharData[props.selectChar['pk']-1]['fields'][val]<= e.target.value && changeStat(e,val)} min={slideMin} max={slideMax} valueLabelDisplay="auto"/></ListItemText>
            })}
        </List>
    </div>
)
}

export default CreateChar