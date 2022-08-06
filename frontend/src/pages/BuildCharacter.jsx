import {getBaseChars} from '../api/GetBaseChars'
import { useState, useEffect } from 'react'
import BaseChar from '../components/buildmenu/BaseChar'
import SelectedChar from '../components/buildmenu/SelectedChar'
import CreateChar from '../components/buildmenu/CreateChar'

const BuildCharacter = (props) => {

    const [baseCharData, setBaseCharData] = useState(null)
    const [selectChar, setSelectChar] = useState(null)

    const getSetBaseCharData = async () => {
        const baseCharData = await getBaseChars();
        setBaseCharData(baseCharData.data)
    }

    useEffect(() => {
        getSetBaseCharData()
    }, [selectChar])


    return (
    <div className='row'>
        {baseCharData && <BaseChar moves={props.moves} baseCharData={baseCharData} setSelectChar={setSelectChar}/>}
        <div className='col-md-6'>{(selectChar != null) && <SelectedChar selectChar={selectChar}/>}</div>
        <div className='col-md-6'>{(selectChar != null) && <CreateChar getSetCharandMoveData = {props.getSetCharandMoveData} setSelectChar={setSelectChar} selectChar={selectChar}/>}</div>
    </div>
    )
}

export default BuildCharacter;