import { createElement, Fragment, useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
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
import moment from "moment";
import "./ui/MultiDateCalendarWidget.css";
import { MultiDateCalendarWidgetContainerProps } from "../typings/MultiDateCalendarWidgetProps";
import { Alert } from "./components/Alert";
import CustomInput from "./components/CustomInput";



export default function MultiDateCalendarWidget(props: MultiDateCalendarWidgetContainerProps){
    const {lastDay, startingDay, daysArray, numberOfMonths, multiSelection, weekendDisabled, selectedColor, bgColor, reservedDates, mobileVersion, closeDay} = props
    const validationFeedback = props.daysArray.validation;
    let firstSelectableDate = new Date()
    let lastestDay = 0
    let classString:string = ''
    firstSelectableDate.setDate(firstSelectableDate.getDate() + startingDay)
    
    const [value, setValue] = useState([]);
    const [bookedDates, setBookedDates] = useState([]);
    const [closedDates, setClosedDates] = useState([]);

    if (lastDay > 0){
      lastestDay = new Date()
      lastestDay.setDate(lastestDay.getDate() + lastDay)
    }
      
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
    ////////////////   Booked days list /////////////
    useEffect(() =>{
    if(reservedDates?.status === "available"){
      // creating an array and reseting the value of bookedDates
      let listOfBookedDays = []
      setBookedDates(listOfBookedDays)
      // console.log(Array.from(reservedDates.value))
      if (reservedDates.value !== undefined && reservedDates.value.includes("[") && reservedDates.value.includes("]")){
        let requestedList:any =  JSON.parse(reservedDates.value);
        // As we are receiving an string of jsons inside of an array, if the value is empty we will still see "[]", in that case we replace it and check if the string is empty or not.
        if (requestedList.length > 0){
          // if the string is not empty then we convert it into an array of string of "JSON's"
          requestedList.map( item => {
            
              // As each item is an string of a JSON, we must convert it into an actual JSON or Object
              let dayValue = item.date
              // // the format of the date is not a valid format for javascript, library "moment" helps to convert from one format to another
              let dayNewFormat = moment(dayValue, 'DD/MM/YYYY').format('YYYY-MM-DDThh:mm:ss.sZ')
              // // Here we make sure that the value can be converted into a real date.
              console.log(dayNewFormat)
              dayValue = new DateObject(new Date(dayNewFormat))
              console.log(dayValue.toString())
              listOfBookedDays.push({"date": `${dayValue.day}/${dayValue.month}/${dayValue.year}`, "reason": `${item.reason}`})
          })
        }
      }
    }}, [reservedDates])
    ////////////////   Close days list /////////////
    useEffect(() =>{
      if(closeDay?.status === "available"){
        // creating an array and reseting the value of closedDays
        let listOfClosedDays = []
        setClosedDates(listOfClosedDays)
        if (closeDay.value !== undefined && closeDay.value.includes("[") && closeDay.value.includes("]")){
          let closedDaysListofJson:any = JSON.parse(closeDay.value);
          // As we are receiving an string of jsons inside of an array, if the value is empty we will still see "[]", in that case we replace it and check if the string is empty or not.
          if (closedDaysListofJson.length > 0){
            // if the string is not empty then we convert it into an array of string of "JSON's"
            closedDaysListofJson.map( item => {
              // As each item is an string of a JSON, we must convert it into an actual JSON or Object
                let dayValue = item.date
                // // the format of the date is not a valid format for javascript, library "moment" helps to convert from one format to another
                let dayNewFormat = moment(dayValue, 'DD/MM/YYYY').format('YYYY-MM-DDThh:mm:ss.sZ')
                // // Here we make sure that the value can be converted into a real date.
                dayValue = new DateObject(new Date(dayNewFormat))
                // // we push the dates as an string so we can compare this dates with the date of the calendar
                listOfClosedDays.push({"date": `${dayValue.day}/${dayValue.month}/${dayValue.year}`, "reason": `${item.reason}`})
            })
          }
        }
      }}, [closeDay])

    if (mobileVersion){
      classString = `${selectedColor} bg-${bgColor} rmdp-mobile`
    }else{
      classString = `${selectedColor} bg-${bgColor}`
    }

      return (
        <Fragment>
          <DatePicker 
          render={<CustomInput />}
          weekStartDayIndex={1}
          value={value} 
          onChange={setValue} 
          multiple={multiSelection} 
          format='DD/MM/YYYY' 
          minDate={firstSelectableDate}
          maxDate={lastestDay}
          numberOfMonths={numberOfMonths}  
          mobileLabels={{
            "OK": "Confirm",
            "CANCEL": "Close",
          }}       
          mapDays={({ date }) => { 
            let calendarDate = `${date.day}/${date.month}/${date.year}`
            let closedReason = ''
            let bookedReason = ''
            let booked = bookedDates.find(key =>{ if (key.date === calendarDate){
              bookedReason = key.reason 
              return true
            }})
            let closed = closedDates.find(key =>{ if (key.date === calendarDate){
              closedReason = key.reason 
              return true
            }})
            

            if (weekendDisabled){
              let isWeekend = [0, 6].includes(date.weekDay.index)
              if (isWeekend) return {
                disabled: weekendDisabled,
                style: { color: "#7d7c7c" }
              }
            }
            // bookedDays list represented in the calendar as the style below
            if (booked){
            console.log('booked days all '+ booked)
            return {
              disabled: true, 
              title: bookedReason,
              class: "booked-days"
            }}
            // closedDays list represented in the calendar as the style below
            if (closed && closedReason !== ''){
            console.log('closed days all '+ closed)
            return {
              disabled: true, 
              title: closedReason,
              class: "office-closed"
            }} 


          }}
          className = {classString}
          plugins={[
            <DatePanel 
              className="black-remove"
              sort="date"
            />,            
           ]}
          />
          <Alert>{validationFeedback}</Alert>
          
        </Fragment>
      )
}
