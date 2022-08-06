import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import '../buildmenu/characterbuild.css'
import axios from "axios"
import { useState,useEffect } from "react"
import  Button from "@mui/material/Button"
import FormDialog from './NameChange';

function generate(selected,element) {
  let output = []
  let count = 0

  for (const item in selected) {
    count +=1
    if(item != 'pk')
      output.push(React.cloneElement(element, {
        key: count,
      },
      <ListItem>
        <ListItemIcon>
          <span class="material-symbols-outlined">swords</span>
        </ListItemIcon>
      <ListItemText
        primary= {`${item.charAt(0).toUpperCase() + item.slice(1)}: ${selected[item]}`}
      />
      </ListItem>))
  }
  
  return output

}


export default function InteractiveList({selected,getSetCharandMoveData,setSelected}) {
  const [reload, setReload] = useState(1)

  //Function to delete a char, called when button is pressed
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
        <div className='col-md-6'>
          <div className={`disp${selected['type']} sprite${selected['type']}`}></div>
        </div>
        <div className='col-md-6 my-auto' >
          <FormDialog selected={selected} reload = {reload} setReload = {setReload}/><Button variant="outlined" onClick={(event)=>deleteChar(event,selected)}> Delete Character</Button>
        </div>
      </div>
      <Grid container columns={{ xs: 6, sm: 6, md: 6 }} spacing={2}>
        <Grid item xs={6} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Stats
          </Typography>
            <List style={{ columns: 2}} dense={true}>
              {generate(selected,
                <ListItem>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary= "primary"
                    secondary='Secondary text'
                  />
                </ListItem>,
              )}
            </List>
        </Grid>
      </Grid>
     
    </Box>
  );
}
