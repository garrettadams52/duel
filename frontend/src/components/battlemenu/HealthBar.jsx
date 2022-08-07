import './dueling.css'

export const Bar = ({ value, label }) => (
  <div className='main'>
    <div className='label'>{label}</div>
    <div className='max'>
      <div
        className='value'
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);