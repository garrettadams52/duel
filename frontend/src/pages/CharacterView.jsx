import { useEffect, useState } from 'react'
import {getChars} from '../api/GetChars'

const ViewCharacter = () => {

    const [charData, setCharData] = useState(null)

    const getSetCharData = async () => {
        const charData = await getChars();
        setCharData(charData.data)
    }

    useEffect(() => {
        getSetCharData()
    }, [])

    console.log(charData)
    return (
        <div>
            Data:
        </div>
    )
}

export default ViewCharacter;