import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios"

export default function FormDialog({selected,reload,setReload}) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateName = function(event,selected,input){
    event.preventDefault()
    axios.post('/updatename', {pk:selected['pk'], 'new_name':input}).then((response)=>{
        console.log('response from server: ', response)
        handleClose()
        reload === 1 ? setReload(2) : setReload(1)
     })
     
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Rename
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rename</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e)=>setInput(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(event)=>updateName(event, selected,input)}>Rename</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
