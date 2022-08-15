import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './characterbuild.css'
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';


export default function CardDisplay({character,moveArr,set}) {
 
  return (
    <Card sx={{ maxWidth: 345, bgcolor:'#020025', mt: 2 }}>
      <div className='row'>
        <div className='col-md-6'>
          <CardMedia
            component="div"
            alt="character"
            className={`icon sprite${character['fields']['type']}`}
            style = {{'margin': '0 auto'}}
          />
        </div>
        <div className='col-md-6 align-self-center'>
          <Typography gutterBottom variant="h5" component="div">
            {character['fields']['type']}
          </Typography>
          <CardActions>
            <Button onClick={set} variant="contained" color="secondary" size="medium">Choose</Button>
          </CardActions>
        </div>
      </div>
      
      <CardContent sx={{ py:0 }}>
      <hr></hr>
        <List>
            <ListItemText>Strength: {character['fields']['strength']}</ListItemText>
            <ListItemText>Defense: {character['fields']['defense']}</ListItemText>
            <ListItemText>Accuracy: {character['fields']['accuracy']}</ListItemText>
            <ListItemText>Evasion: {character['fields']['evasion']}</ListItemText>
            <ListItemText>Wisdom: {character['fields']['wisdom']}</ListItemText>
            <ListItemText>Spirit: {character['fields']['spirit']}</ListItemText>
            <hr></hr>
            <ListItemText>Moves: {moveArr.join(', ')}</ListItemText>
        </List>
      </CardContent>
    </Card>
  );
}
