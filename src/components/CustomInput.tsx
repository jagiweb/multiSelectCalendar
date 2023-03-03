import {createElement, Fragment} from 'react'
import '../ui/MultiDateCalendarWidget.css'

function CustomInput(props:any) {
    const {openCalendar, value} = props
    value.sort()
  return (
    <Fragment>
        <div>
        <input className='input-margin' readOnly value='Click to select dates' onFocus={openCalendar}/>
        </div>
        
        
        <div className='daylist-container'>
            {value.map(date => {
                return <span className='selected-date-cl'>{date}</span>
            })}
        </div>
    </Fragment>
    
  )
}

export default CustomInput