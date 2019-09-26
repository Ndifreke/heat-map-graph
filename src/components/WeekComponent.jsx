import React from 'react';
import DayComponent from './DayComponent'

function filterDayTransaction(day, weekData) {
    return weekData.filter(data => {
        return new Date(data.date).getDay() === day
    })
}

function getTileColor(totalDayTransaction) {
    const high = 10;
    const low = 0
    const colors = 3
}

function calculateValue(dayData) {
    return dayData.reduce((accum, next) => {
        switch (next.transactionType) {
            case "debit": accum.debit++
            case "credit": accum.credit++
        }
        return accum
    }, { credit: 0, debit: 0 })
}

function WeekComponent(props) {
    const weekList = []
    const { weekData, weekID } = props //{week1:[],week2:[]}
    // console.log(weekData)
    for (const day in [1, 2, 3, 4, 5, 6, 7]) {
        console.log(filterDayTransaction(day + 1, weekData))
        weekList.push(
            <li key={day}>
                <DayComponent />
            </li>
        )
    }
    return (<ul style={{ listStyle: "none" }}>{weekList}</ul>)
}

export default WeekComponent