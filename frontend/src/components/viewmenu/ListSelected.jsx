import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import '../buildmenu/characterbuild.css'
import axios from "axios"
import { useState,useEffect } from "react"
import  Button from "@mui/material/Button"
import FormDialog from './NameChange';
import { Tooltip } from '@mui/material';

function generateStats(selected) {
  let output = []
  let dispStats = ['strength' , 'defense','accuracy', 'evasion','wisdom', 'spirit' ]

  for (const item in selected) {
    if(dispStats.includes(item))
      output.push(
      <ListItem>
        <ListItemIcon>
          <span class="material-symbols-outlined">swords</span>
        </ListItemIcon>
      <ListItemText
        primary= {`${item.charAt(0).toUpperCase() + item.slice(1)}: ${selected[item]}`}
      />
      </ListItem>)
  }
  return output
}

function generateMoves(moveData,type) {

  return moveData[type].map((elem)=>{ 
    return (      
      <ListItem>
        <ListItemIcon>
          <span class="material-symbols-outlined">swords</span>
        </ListItemIcon>
        <Tooltip title={`Power: ${elem['fields']['power']}, Accuracy: ${elem['fields']['accuracy']}, Magical: ${elem['fields']['magical']}`}>
          <ListItemText primary= {`${elem['fields']['name']}`}/> 
        </Tooltip>
        </ListItem>
        )
  })

}


export default function InteractiveList({selected,getSetCharandMoveData,setSelected,moves}) {
  const [reload, setReload] = useState(1)

  const deleteChar = function(event,selected){
    event.preventDefault()
    axios.delete('/deletecharacter', {headers:{'header':"header"},data:{'pk':selected['pk']}}).then((response)=>{
      console.log('response from server: ', response)
      setSelected(null)
      reload === 1 ? setReload(2) : setReload(1)
    })
  
  }

  useEffect(() => {
    getSetCharandMoveData()
  }, [reload])


  return (
    <Box sx={{ flexGrow: 1, height: '50%',  maxWidth: 752 }}>
    <div className='row'>
      <div className='col-md-12'>
        <Typography sx={{ mt: 2, mb: 1 }} variant="h2" component="div">
          {`${selected['name']} the ${selected['type']}, Level ${selected['level']}`}
        </Typography>
        <Typography sx={{ mt: 1, mb: 2 }} variant="h6" component="div">
          {`Experience: ${selected['exp']}`}
        </Typography>
      </div>
    </div>
      <div className='row'>
        <div className='col-md-6'>
          <div className={`disp${selected['type']} sprite${selected['type']}`}></div>
        </div>
        <div className='col-md-6 my-auto' >
          <FormDialog selected={selected} setSelected={setSelected} getSetCharandMoveData = {getSetCharandMoveData} reload = {reload} setReload = {setReload}/><Button variant="outlined" onClick={(event)=>deleteChar(event,selected)}> Delete Character</Button>
        </div>
      </div>
      <hr></hr>
      <Grid container columns={{ xs: 6, sm: 6, md: 6 }} spacing={2}>
        <Grid item xs={6} md={6}>
          <Typography sx={{ mt: 2, mb: 1 }} variant="h6" component="div">
            Moves
          </Typography>
          <List style={{ columns: 3}} dense={false}>
            {generateMoves(moves,selected['type'])}
          </List>
          <hr></hr>
          <Typography sx={{ mt: 2, mb: 1 }} variant="h6" component="div">
            Stats
          </Typography>
            <List style={{ columns: 2}} dense={false}>
              {generateStats(selected,
                <ListItem>
                  <ListItemText
                    primary= "primary"
                  />
                </ListItem>,
              )}
            </List>
        </Grid>
      </Grid>
     
    </Box>
  );
}
