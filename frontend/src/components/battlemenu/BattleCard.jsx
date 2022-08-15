import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../buildmenu/characterbuild.css'
import { List, ListItem, ListItemText } from '@mui/material';

export default function BattleCard({set,character,show}) {
  return (
    <Card className={show} sx={{ maxWidth: 345, bgcolor:'#020025',mt: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
            {character['fields']['name']}
        </Typography>
      <CardMedia
        component="div"
        alt="character"
        className={`battle${character['fields']['type']} sprite${character['fields']['type']}`}
        style = {{'margin': '0 auto', minHeight: 100,}}
      />
      <CardContent sx={{'padding': 0}}>
        <List style={{'list-style':'none'}}>
            <ListItemText>Type: {character['fields']['type']}</ListItemText>
            <ListItemText>Level: {character['fields']['level']}</ListItemText>
            <ListItemText>Experience: {character['fields']['experience']}</ListItemText>
        </List>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary" size="medium" onClick={set}>Select</Button>
      </CardActions>
    </Card>
  );
}