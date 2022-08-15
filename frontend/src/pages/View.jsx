import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import { useState,useEffect } from "react"
import InteractiveList from '../components/viewmenu/ListSelected';


const columns = [
  { field: 'type', headerName: 'Type', width: 70 },
  { field: 'name', headerName: 'Name', width: 70 },
  { field: 'level', headerName: 'Lvl', width: 45 },
  { field: 'exp', headerName: 'Exp', width: 100 },
  { field: 'strength', headerName: 'Str', width: 45 },
  { field: 'defense', headerName: 'Def', width: 45 },
  { field: 'accuracy', headerName: 'Acc', width: 45 },
  { field: 'evasion', headerName: 'Eva', width: 45 },
  { field: 'spirit', headerName: 'Spr', width: 45 },
  { field: 'wisdom', headerName: 'Wis', width: 45 },
  { field: 'moves', headerName: 'Moves', width: 300 },
  { field: 'pk', hide: true},
];

const getRows = (charData,moves) => {
    let rows = []
    if(charData){
        charData.forEach((elem, ind)=>{
            let moveNames = []
            moves[elem.fields.type].forEach((elem)=>{
                moveNames.push(elem.fields.name)
            })
            let obj = {pk:elem.pk, id:ind, type:elem.fields.type,name:elem.fields.name, accuracy:elem.fields.accuracy,defense:elem.fields.defense,evasion:elem.fields.evasion,exp:elem.fields.experience,level:elem.fields.level,spirit:elem.fields.spirit,strength:elem.fields.strength,wisdom:elem.fields.wisdom,moves:moveNames.join(", ")}
            rows.push(obj)
        })
    }
    return rows
}



export default function View({getSetCharandMoveData,moves,charData}) {
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        getSetCharandMoveData()
    }, [selected])

    const select = (event) => {
        setSelected(event.row)
    }

  return (
    <div className='row'>
        <div className='col-md-6' style={{ height:800}}>
            <DataGrid
                rows={getRows(charData,moves)}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableMultipleSelection={true}
                onRowClick={(event)=>select(event)}
            />
        </div>
        {selected && <div className='col-md-6'>
        <InteractiveList setSelected={setSelected} moves={moves} getSetCharandMoveData = {getSetCharandMoveData} selected={selected}/>
        </div>}
    </div>

  );
}
