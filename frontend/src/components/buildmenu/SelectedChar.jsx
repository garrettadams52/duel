import { List, ListItemText, Typography } from "@mui/material"

function SelectedChar({selectChar,baseCharData}){
  console.log("it worked")
    let desc = ''
    if(selectChar['fields']['type']=="Cleric")
      desc = 'Clerics are versatile figures, both capable in combat and skilled in the use of divine magic (thaumaturgy). Clerics are powerful healers due to the large number of healing and curative magics available to them. With divinely-granted abilities over life or death, they are also able to repel or control undead creatures.'
    else if(selectChar['fields']['type']=="Dwarf")
      desc = "Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal. Though they stand well under 5 feet tall, dwarves are so broad and compact that they can weigh as much as a human standing nearly two feet taller. Their courage and endurance are also easily a match for any of the larger folk."
    else if(selectChar['fields']['type']=="Fighter")
      desc = "Fighters learn the basics of all combat styles. Every fighter can swing an axe, fence with a rapier, wield a longsword or a greatsword, use a bow, and even trap foes in a net with some degree of skill. Likewise, a fighter is adept with shields and every form of armor. Beyond that basic degree of familiarity, each fighter specializes in a certain style of combat."
    else if(selectChar['fields']['type']=="Elf")
      desc = "Elves are a magical people of otherworldly grace, living in the world but not entirely part of it. They live in places of ethereal beauty, in the midst of ancient forests or in silvery spires glittering with faerie light, where soft music drifts through the air and gentle fragrances waft on the breeze. Elves love nature and magic, music and poetry, and the good things of the world."

    return (
    <div>

        <div className='row'>
            <div className='col-md-6 align-items-center align-self-center'>
                <div className={`disp${selectChar['fields']['type']} sprite${selectChar['fields']['type']}`}></div>
            </div>
            <div className='col-md-6'>
                <List>
                    <ListItemText>Type: {baseCharData[selectChar['pk']-1]['fields']['type']}</ListItemText>
                    <ListItemText>Base Strength: {baseCharData[selectChar['pk']-1]['fields']['strength']}</ListItemText>
                    <ListItemText>Base Defense: {baseCharData[selectChar['pk']-1]['fields']['defense']}</ListItemText>
                    <ListItemText>Base Evasion: {baseCharData[selectChar['pk']-1]['fields']['evasion']}</ListItemText>
                    <ListItemText>Base Spirit: {baseCharData[selectChar['pk']-1]['fields']['spirit']}</ListItemText>
                    <ListItemText>Base Wisdom: {baseCharData[selectChar['pk']-1]['fields']['wisdom']}</ListItemText>
                    <ListItemText>Base Accuracy: {baseCharData[selectChar['pk']-1]['fields']['accuracy']}</ListItemText>
                    <hr></hr>
                    <Typography>{desc}</Typography>
                </List>
            </div>
        </div>
        
    </div>)
}

export default SelectedChar