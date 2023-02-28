import { createElement, Fragment, useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import "react-multi-date-picker/styles/colors/green.css"
import "react-multi-date-picker/styles/colors/red.css"
import "react-multi-date-picker/styles/colors/yellow.css"
import "react-multi-date-picker/styles/colors/purple.css"
import "react-multi-date-picker/styles/colors/teal.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import "react-multi-date-picker/styles/backgrounds/bg-gray.css"
import "react-multi-date-picker/styles/backgrounds/bg-brown.css"
import "react-multi-date-picker/styles/layouts/mobile.css"
import Big from "big.js";
import moment from "moment";
import "./ui/MultiDateCalendarWidget.css";
import Legend from "./components/Legend";
import { MultiDateCalendarWidgetContainerProps } from "../typings/MultiDateCalendarWidgetProps";
import { Alert } from "./components/Alert";



export default function MultiDateCalendarWidget(props: MultiDateCalendarWidgetContainerProps){
    const {daysArray, numberOfDays, numberOfMonths, multiSelection, weekendDisabled, selectedColor, bgColor, reservedDates, day, mobileVersion, closeDay} = props
    const validationFeedback = props.daysArray.validation;
    let tomorrow = new Date()
    let lastDay = new Date()
    let classString:string = ''
    let dayAfterTomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    lastDay.setDate(lastDay.getDate() + 30)
    dayAfterTomorrow.setDate(tomorrow.getDate() + 1)
    const [value, setValue] = useState([tomorrow]);
    const [bookedDates, setBookedDates] = useState([]);
    const [closedDates, setClosedDates] = useState([]);
    // format='MM DD YYYY' 

    const convertDateToJson = (dates) => {
      let array = []
      dates.map( date => {
        date = date.toString()
        array.push(`{"date": "${moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY')}"}`)
      })
      let datesJson = `[${array}]`
      return datesJson
    }

    useEffect(() => {
      if(daysArray.status === "available") {
        daysArray.setValue(convertDateToJson(value));
      }
    }, [value])

    // useEffect(() => {
    //   if(reservedDates.status === "available") {
    //     console.log(reservedDates)
    //   }
    // }, [reservedDates])
    
    // if(numberOfDays.status === "available") {
    //   numberOfDays.setValue(Big(value.length));
    // }
  
    useEffect(() =>{
    if(reservedDates?.status === "available"){
      let requestedList:any = []
      // let closedDaysListclosedDaysList:any = []
      console.log(closeDay)
      reservedDates.items && reservedDates?.items.map( item => {
        if(day && item && closeDay !== undefined){
          let dayValue:any = day.get(item).value;
          let closeValue:any = closeDay.get(item).value;
          
          let dayNewFormat = moment(dayValue, 'MM DD YYYY').format('MM DD YYYY')
          dayValue = new DateObject(new Date(Date.parse(dayNewFormat)))
          if (closeValue){
            closedDates.push(`${dayValue.day}/${dayValue.month}/${dayValue.year}`)
          }else{
            requestedList.push(dayValue)
            bookedDates.push(`${dayValue.day}/${dayValue.month}/${dayValue.year}`)
          }
          
        }
      })
    }}, [reservedDates])

    // useEffect(() =>{
    // if(closeDates?.status === "available"){
    //   let array:any = []
    //   closeDates.items && closeDates?.items.map( item => {
    //     if(closeDay && item !== undefined){
    //       let dayValue:any = day.get(item).value;
    //       dayValue = dayValue.replace("," , "")
    //       let dayNewFormat = moment(dayValue, 'DD/MM/YYYY').format('MM DD YYYY')
    //       dayValue = new DateObject(new Date(Date.parse(dayNewFormat)))
    //       array.push(dayValue)
    //       closedDates.push(`${dayValue.day}/${dayValue.month}/${dayValue.year}`)
    //     }
    //   })
    // }}, [closeDates])

    if (mobileVersion){
      classString = `${selectedColor} bg-${bgColor} rmdp-mobile`
    }else{
      classString = `${selectedColor} bg-${bgColor}`
    }

      return (
        <Fragment>
  
          <DatePicker 
          weekStartDayIndex={1}
          value={value} 
          onChange={setValue} 
          multiple={multiSelection} 
          format='DD/MM/YYYY' 
          minDate={tomorrow}
          maxDate={lastDay}
          numberOfMonths={numberOfMonths}         
          formatWeekDay={(day: string) => day.substring(0,3)}
          mapDays={({ date }) => { 
            let calendarDate = `${date.day}/${date.month}/${date.year}`
            let booked = bookedDates.includes(calendarDate)
            let closed = closedDates.includes(calendarDate)

            if (weekendDisabled){
              let isWeekend = [0, 6].includes(date.weekDay.index)
              if (isWeekend) return {
                disabled: weekendDisabled,
                style: { color: "#7d7c7c" }
              }
            }

            if (booked) return {
              disabled: true, 
              style: { color: "green", fontWeight: "bold" },
            }

            if (closed) return {
              disabled: true, 
              style: { color: "red", fontWeight: "bold"  },
            }


          }}
          
          className = {classString}
          
          
          plugins={[
            <DatePanel />,            
            // <DatePickerHeader 
            // position="top" 
            // size="small" />,
            // <Legend position="left" />
           ]}
          />
          <Alert>{validationFeedback}</Alert>
          
        </Fragment>
      )
}
