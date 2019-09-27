import React from "react"
import WeekComponent from './WeekComponent'

function dayAbbr(day) {
    return {
        0: "Mon",
        1: "Tue",
        2: "Wed",
        3: "Thu",
        4: "Fri",
        5: "Sat",
        6: "Sun"
    }[day]
}

/**
 * Dynamically Generate weeks Label such that if the years 
 * in data set is changed, the graph will adapt to the change
 * @param {*} props properties passed to component
 */
function getWeeksLabel(props) {
    const { firstYearDate } = props
    const dayLabel = []
    for (let dayInWeek = firstYearDate.getDay() - 1, totalDays = 0; totalDays < 7; dayInWeek++ , totalDays++) {
        if (dayInWeek === WeekComponent.MAX_WEEK_DAYS) {
            dayInWeek = 0
           // console.log(dayAbbr(dayInWeek))
            dayLabel.push(<li key={dayInWeek}>{dayAbbr(dayInWeek)}</li>)
        } else {
            dayLabel.push(<li key={dayInWeek}>{dayAbbr(dayInWeek)}</li>)
           // console.log(dayAbbr(dayInWeek))
        }
    }
    return (
        <div>
            <ul className="day-label" style={{ listStyle: "none" }}>
                {dayLabel}
            </ul>
        </div>
    )
}

export default getWeeksLabel