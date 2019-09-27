import React from 'react';
import DayComponent from './DayComponent'
import { getDaysInYear } from 'date-fns/esm';
import { getDayOfYear } from 'date-fns';
import uuidv1 from 'uuid/v1'
import MonthComponent from './MonthComponent'

const MAX_WEEK_DAYS = 7

class WeekComponent extends React.Component {

    filterTransactionByDay(day, weekData) {
        const details = { date: null, credit: 0, debit: 0, offset: 0 }
        for (const transaction of weekData) {
            if (day == 282 || day == 281) {
                console.log(transaction.date, getDayOfYear(new Date(transaction.date), day))
            }
            if (getDayOfYear(new Date(transaction.date)) === day) {
                if (transaction.transactionType === "credit") {
                    details.credit += transaction.amount
                } else {
                    details.debit += transaction.amount
                }
                details.offset++
                continue
            }
            break
        }

        const transactionOffset = weekData.slice(details.offset)
        details.transactions = transactionOffset
        details.date = new Date(weekData[0].date)
        return details;
    }

    algol(credit, debit = 0) {
        const average = (credit + debit) / 2
        const style = {}
        if (debit < (average / 2)) {
            style.style = { background: "#A52A2A" }
        } else if (debit < average && debit > (average / 2)) {
            style.style = { background: "#FA8072" }
        } else if (debit > average && (average / 2) + average > debit) {
            style.style = { background: "rgb(198, 228, 139)" }
        } else if (debit > average && (average / 2) + average) {
            style.style = { background: "#239a3b" }
        }
        return style
    }

    addtoDayTransaction(data, day) {
        const { credit, debit, date } = data
        const title = `${date.toDateString()} $${(credit + debit).toFixed(2)}`
        return (
            <li key={uuidv1()} title={title}>
                <DayComponent style={this.algol(credit, debit)} />
            </li>
        )
    }

    addToWeekTransaction(weekList, dayList) {
        weekList.push(
            <ul style={{ listStyle: "none" }} key={uuidv1()}>
                {dayList}
            </ul >
        )
        return weekList
    }

    firstDate(transactions) {
        return new Date(transactions[0].date)
    }

    getMonth(date) {
        return date.getMonth()
    }

    createMonthTransaction(weekData, monthId) {
        const monthAbr = {
            0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May",
            5: "Jun", 6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct",
            10: "Nov", 11: "Dec"
        }[monthId]
        return <MonthComponent weekTransaction={weekData} monthName={monthAbr} />
    }

    WeekComponents(props) {
        let weekList = []
        let dayList = []
        const monthList = []
        let { transactions } = props
        let dayData
        const daysInYear = getDaysInYear(this.firstDate(transactions))
        let month = this.getMonth(this.firstDate(transactions))

        for (let day = 1; day < daysInYear && transactions.length > 0; day++) {
            const dayInformation = this.filterTransactionByDay(day, transactions)
            transactions = dayInformation.transactions
            const hasTransaction = dayInformation.date

            dayData = this.addtoDayTransaction(dayInformation, day)
            dayList.push(dayData)

            if (dayList.length === MAX_WEEK_DAYS) {

                if (day == 281 || day == 282) {
                    console.log(day + " B")
                }
                weekList = this.addToWeekTransaction(weekList, dayList)
                dayList = []
                //    weekDay = 0
            } if (hasTransaction && month !== this.getMonth(dayInformation.date)) {
                monthList.push(this.createMonthTransaction(weekList, month))
                month = this.getMonth(dayInformation.date)
                weekList = []
            }
        }
        weekList = this.addToWeekTransaction(weekList, dayList)
        monthList.push(this.createMonthTransaction(weekList, month))
        return monthList
    }

    render() {
        return this.WeekComponents(this.props)
    }
}

WeekComponent.MAX_WEEK_DAYS = MAX_WEEK_DAYS
export default WeekComponent  
