import React from 'react';
import DayComponent from './DayComponent'

function WeekComponent(week) {
    const weekList = []

    for (const day in [1, 2, 3, 4, 5, 6, 7]) {
        weekList.push(
            <li key={day}>
                <DayComponent />
            </li>
        )
    }
    console.log(weekList)
    return (<ul style={{ listStyle: "none" }}>{weekList}</ul>)

}

export default WeekComponent