import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './characterbuild.css'

export default function CardDisplay({character,moveArr,set}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="div"
        alt="character"
        className={`icon sprite${character['fields']['type']}`}
        style = {{'margin': '0 auto'}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {character['fields']['type']}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
        <ul style={{'list-style':'none'}}>
            <li>Strength: {character['fields']['strength']}</li>
            <li>Defense: {character['fields']['defense']}</li>
            <li>Evasion: {character['fields']['evasion']}</li>
            <li>Spirit: {character['fields']['spirit']}</li>
            <li>Wisdom: {character['fields']['wisdom']}</li>
            <li>Accuracy: {character['fields']['accuracy']}</li>
            <li>Moves: {moveArr.join(', ')}</li>
        </ul>
      </CardContent>
      <CardActions>
        <Button onClick={set} size="medium">Choose</Button>
      </CardActions>
    </Card>
  );
}
