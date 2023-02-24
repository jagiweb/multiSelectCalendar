import {createElement} from 'react'
import '../ui/MultiDateCalendarWidget.css'

export default function Legend({position}:any) {
  return (
    <div>
        <p className='legend-green'><span className='legend-green'>{position}</span>Booked</p>
        <p><span className='legend-gray'>ss</span></p>
        <p><span className='legend-red'></span></p>
    </div>
  )
}
