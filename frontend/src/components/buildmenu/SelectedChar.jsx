function SelectedChar({selectChar}){

    return (
    <div>

        <div className='row'>
            <div className='col-md-6'>
                <div className={`disp${selectChar['fields']['type']} sprite${selectChar['fields']['type']}`}></div>
            </div>
            <div className='col-md-6'>
                <ul style={{'list-style':'none'}}>
                    <li>Type: {selectChar['fields']['type']}</li>
                    <li>Strength: {selectChar['fields']['strength']}</li>
                    <li>Defense: {selectChar['fields']['defense']}</li>
                    <li>Evasion: {selectChar['fields']['evasion']}</li>
                    <li>Spirit: {selectChar['fields']['spirit']}</li>
                    <li>Wisdom: {selectChar['fields']['wisdom']}</li>
                    <li>Accuracy: {selectChar['fields']['accuracy']}</li>
                </ul>
            </div>
        </div>
        
    </div>)
}

export default SelectedChar