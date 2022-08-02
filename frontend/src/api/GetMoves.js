import axios from 'axios';

export const getMoves = async () =>{
    let newMoveData = {"Elf":[],"Fighter":[],"Cleric":[],"Dwarf":[]}
    await axios.get('/moves').then(response=>{
        response.data.forEach((elem)=>{
            if(elem['fields']['character'][0] === 1)
                newMoveData["Elf"].push(elem)
            else if(elem['fields']['character'][0] === 2)
                newMoveData["Fighter"].push(elem)
            else if(elem['fields']['character'][0] === 3)
                newMoveData["Cleric"].push(elem)
            else
                newMoveData["Dwarf"].push(elem)
        })
})
    return newMoveData
}
