import React from 'react';
import DayComponent from './DayComponent'
import { getDaysInYear } from 'date-fns/esm';
import { getDayOfYear, isSameDay } from 'date-fns';
import uuid from 'uuid'

const MAX_WEEK_DAYS = 7

function filterTransactionByDay(day, weekData) {
    const result = { samedays: [] }
    for (const transaction of weekData) {
        if (getDayOfYear(new Date(transaction.date)) == day) {
            result.samedays.push(transaction)
            continue
        }
        break
    }
    const offset = weekData.slice(result.samedays.length)
    result.transactions = offset
    return result;
}

function getTileColor(totalDayTransaction) {
    const high = 10;
    const low = 0
    const colors = 3
}

function calculateDayTransaction(dayData) {
    return dayData.reduce((accum, next) => {
        switch (next.transactionType) {
            case "debit": accum.debit++
            case "credit": accum.credit++
        }
        return accum
    }, { credit: 0, debit: 0 })
}

function addDay(dayData, title) {
    return (
        <li key={uuid()} title={title}>
            <DayComponent data={dayData} />
        </li>
    )
}

function getMonth(day) {

}

function WeekComponent(props) {
    const weekList = ["", ""]
    let dayList = []
    let { transactions } = props
    let dayData
    const daysInYear = getDaysInYear(new Date(transactions[0].date))
    for (let day = 1, weekDay = 1; day < daysInYear; day++ , weekDay++) {
        const dayFilter = filterTransactionByDay(day, transactions)
        transactions = dayFilter.transactions
        const value = calculateDayTransaction(dayFilter.samedays)
        if (dayFilter.samedays[0]) {
            dayData = addDay(value, new Date(dayFilter.samedays[0].date).toDateString())
        } else {
            dayData = addDay({ credit: 0, debit: 0 }, "No imformation")
        }
        dayList.push(dayData)
        if (weekDay == MAX_WEEK_DAYS) {
            weekList.push(
                <ul style={{ listStyle: "none" }} key={Date.now()}>
                    {dayList}
                </ul >
            )
            dayList = []
            weekDay = 0
        }
    }
    return weekList
}

export { MAX_WEEK_DAYS, WeekComponent } 