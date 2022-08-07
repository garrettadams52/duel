import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../buildmenu/characterbuild.css'

export default function BattleCard({set,character,show}) {
  return (
    <Card className={show} sx={{ maxWidth: 345 }}>
        <Typography gutterBottom variant="h5" component="div">
            {character['fields']['name']}
        </Typography>
      <CardMedia
        component="div"
        alt="character"
        className={`battle${character['fields']['type']} sprite${character['fields']['type']}`}
        style = {{'margin': '0 auto'}}
      />
      <CardContent>
        <ul style={{'list-style':'none'}}>
            <li>Type: {character['fields']['type']}</li>
            <li>Level: {character['fields']['level']}</li>
            <li>Experience: {character['fields']['experience']}</li>
        </ul>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="medium" onClick={set}>Select</Button>
      </CardActions>
    </Card>
  );
}