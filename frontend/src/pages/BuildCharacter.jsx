import {getBaseChars} from '../api/GetBaseChars'
import { useState, useEffect } from 'react'
import BaseChar from '../components/buildmenu/BaseChar'
import SelectedChar from '../components/buildmenu/SelectedChar'
import CreateChar from '../components/buildmenu/CreateChar'
import '../components/buildmenu/characterbuild.css'

const BuildCharacter = (props) => {

    const [baseCharData, setBaseCharData] = useState(null)
    const [selectChar, setSelectChar] = useState(null)
    const [availStat, setAvailStat] = useState(10)


    const getSetBaseCharData = async () => {
        const baseCharData = await getBaseChars();
        setBaseCharData(baseCharData.data)
    }

    useEffect(() => {
        getSetBaseCharData()
        setAvailStat(10)
    }, [selectChar])


    return (
    <div className='row'>
        {baseCharData && <BaseChar moves={props.moves} baseCharData={baseCharData} setSelectChar={setSelectChar}/>}
        <div className='col-md-6 bottom'>{selectChar && <SelectedChar selectChar={selectChar} baseCharData={baseCharData}/>}</div>
        <div className='col-md-6 bottom'>{selectChar && <CreateChar availStat = {availStat} getSetCharandMoveData = {props.getSetCharandMoveData} setAvailStat={setAvailStat} setSelectChar={setSelectChar} baseCharData={baseCharData} selectChar={selectChar}/>}</div>
    </div>
    )
}

export default BuildCharacter;