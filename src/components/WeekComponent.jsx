import React from 'react';
import DayComponent from './DayComponent'
import { getDaysInYear } from 'date-fns/esm';
import { getDayOfYear, isSameDay } from 'date-fns';
import uuid from 'uuid'
import MonthComponent from './MonthComponent'

const MAX_WEEK_DAYS = 7

function filterTransactionByDay(day, weekData) {
    const result = { dayTransactions: [] }
    for (const transaction of weekData) {
        if (getDayOfYear(new Date(transaction.date)) == day) {
            result.dayTransactions.push(transaction)
            continue
        }
        break
    }
    const offset = weekData.slice(result.dayTransactions.length)
    result.transactions = offset
    return result;
}

function algol(highest, transaction = 0, day) {
    const pivot = highest / 2
    const details = {
        date: day.toDateString(),
        transaction
    }
    if (transaction < (pivot / 2)) {
        console.log("Transaction is low for " + transaction)
        details.style = { background: "red" }
    } else if (transaction < pivot && transaction > (pivot / 2)) {
        console.log("transaction is midLow for " + transaction)
        details.style = { background: "red" }
    } else if (transaction > pivot && (pivot / 2) + pivot > transaction) {
        console.log("transaction is midHigh for " + transaction)
        details.style = { background: "rgb(154,205,50)" }
    } else if (transaction > pivot && (pivot / 2) + pivot) {
        details.style = { background: "rgb(0,255,0)" }
    }
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

function firstDate(transactions) {
    return new Date(transactions[0].date)
}

function getMonth(date) {
    return date.getMonth()
}

function createMonthTransaction(weekData, monthId) {
    const monthAbr = {
        0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May",
        5: "Jun", 6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct",
        10: "Nov", 11: "Dec"
    }[monthId]
    return <MonthComponent weekTransaction={weekData} monthName={monthAbr} />
}

function WeekComponent(props) {
    let weekList = []
    let dayList = []
    const monthList = []
    let { transactions } = props
    let dayData
    const daysInYear = getDaysInYear(firstDate(transactions))
    let month = getMonth(firstDate(transactions))
    for (let day = 1, weekDay = 1; day < daysInYear; day++ , weekDay++) {
        const sameDayFilter = filterTransactionByDay(day, transactions)
        transactions = sameDayFilter.transactions
        const value = calculateDayTransaction(sameDayFilter.dayTransactions)
        const isTransaction = sameDayFilter.dayTransactions[0]
        if (isTransaction) {
            dayData = addDay(value, firstDate(sameDayFilter.dayTransactions).toDateString())
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

        if (isTransaction && month != getMonth(new Date(isTransaction.date))) {
            console.log(month)
            monthList.push(createMonthTransaction(weekList, month))
            month = getMonth(new Date(isTransaction.date))
            weekList = []
        }
    }
    monthList.push(createMonthTransaction(weekList, month))
    return monthList
}

export { MAX_WEEK_DAYS, WeekComponent } 