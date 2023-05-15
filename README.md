## MultiDateCalendarWidget
A calendar to multi pick different dates at once. This widget was created to add an additional feature to Office Capacity in Mendix. 
## Features

General Tab
    - List of selected days: Source to take the selected dates from the widget. The selected dates are being sent back to the app in a JSON, and then in a microflow dividing each string date to create a singular object. You can read more information about this in the next section.
    - Disable weekends: The option to disable/enable weekends
    - Mobile version: The option to disable/enable mobile version which blocks the user to click outside of the calendar
    - Number of months: The amount of months shown in the calendar. Example you could add April and May to show in the calendar, instead of only April.
    - First selectable day: You could choose if you want the user to be able to select old dates, current day or days ahead.
    - Last selectable day: Max amount of selectable days. Example 30 days will not let the user to select any date after 30 days in the calendar.
Optional Tab
    - Requested Dates: Source to send the Requested dates back to the widget, this is being sent as a JSON and inside of the widget it's separating the string of dates and creating a date object and then finding the date in the calendar to be blocked for user with a green circle surrounding the date.
    - Unselectable Dates: Source to send the Requested dates back to the widget, this is being sent as a JSON and inside of the widget it's separating the string of dates and creating a date object and then finding the date in the calendar to be blocked for user with a red circle surrounding the date. Additionally it expecting another attribute called "Reason" which can be used to show a tooltip of why this date is unselectable.
Custom colors Tab
    - Selected date color: Property to select a different color for those selected dates. Default is blue
    - Calendar background color

## Usage
This widget was created to accomplish a new functionality for an App built in Mendix. Once you add this widget to your Mendix project you need to create a multiple things to make the widget fully work.
Step 1: 
Select the attribute that its handleiding the selected dates from the calendar. The widget is sending a JSON which it has an attribute with all the selected dates as a string with the format of DD/MM/YYYY. Here you will have to create a mapping to import that data inside of Mendix, then a microflow to divide each selected date and then create the object as you wish with each date.


## Demo project
[link to sandbox]

## Issues, suggestions and feature requests
[link to GitHub issues]

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
1. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

[specify contribution]
