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
import Big from "big.js";
import moment from "moment";
import "./ui/MultiDateCalendarWidget.css";
import Legend from "./components/Legend";
import { MultiDateCalendarWidgetContainerProps } from "../typings/MultiDateCalendarWidgetProps";



export default function MultiDateCalendarWidget(props: MultiDateCalendarWidgetContainerProps){
    const {daysArray, numberOfDays, numberOfMonths, multiSelection, weekendDisabled, selectedColor, bgColor, reservedDates, day} = props
    let tomorrow = new Date()
    let dayAfterTomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    dayAfterTomorrow.setDate(tomorrow.getDate() + 1)
    const [value, setValue] = useState([]);
    const [bookedDates, setBookedDates] = useState([]);
    // format='MM DD YYYY' 
    console.log(daysArray)
    console.log(numberOfDays)
    console.log(reservedDates)
    useEffect(() => {
      if(daysArray.status === "available") {
        daysArray.setValue(value.toString());
      }
    }, [value])
    
    if(numberOfDays.status === "available") {
      numberOfDays.setValue(Big(value.length));
    }
  
    useEffect(() =>{
    if(reservedDates?.status === "available"){
      let array:any = []
      reservedDates.items && reservedDates?.items.map( item => {
        if(day && item !== undefined){
          let dayValue = day.get(item).value;
          dayValue = dayValue.replace("," , "")
          let dayNewFormat = moment(dayValue, 'DD/MM/YYYY').format('MM DD YYYY')
          // console.log(dayNewFormat)
          dayValue = new DateObject(new Date(Date.parse(dayNewFormat)))
          array.push(dayValue.day)
        }
      })
      setBookedDates(array)
    }}, [reservedDates])
  
      return (
        <Fragment>
  
          <DatePicker 
          value={value} 
          onChange={setValue} 
          multiple={multiSelection} 
          format='DD/MM/YYYY' 
          minDate={tomorrow}
          numberOfMonths={numberOfMonths} 
  
          mapDays={({ date }) => { 
            if (weekendDisabled){
              let isWeekend = [0, 6].includes(date.weekDay.index)
              if (isWeekend) return {
                disabled: weekendDisabled,
                style: { color: "#7d7c7c" }
              }
            }
  
            let booked = bookedDates.includes(date.dayOfYear)
            // console.log(booked)
            console.log(bookedDates)
            if (booked) return {
              disabled: true, 
              style: { color: "green" },
            }
          }}
  
          className={selectedColor + " bg-" + bgColor}
          plugins={[
            <DatePanel />,
            <DatePickerHeader 
            position="top" 
            size="medium" 
          />,
            <Legend />
           ]}
          />
        </Fragment>
      )
}
