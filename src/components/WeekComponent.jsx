import React from 'react';
import DayComponent from './DayComponent'
import { getDaysInYear } from 'date-fns/esm';
import uuidv1 from 'uuid/v1'
import MonthComponent from './MonthComponent'
import  { filterTransactionByDay } from '../helper/transactionHelper'

const MAX_WEEK_DAYS = 7

class WeekComponent extends React.Component {

    addDaysToWeekGraph(dayList) {
        return (
            <ul style={{ listStyle: "none" }} key={uuidv1()}>
                {dayList}
            </ul >
        )
    }

    firstDate(transactions) {
        return new Date(transactions[0].date)
    }

    getMonth(date) {
        return date.getMonth()
    }

    buidWeekGraph(props) {
        let weekList = []
        let dayList = []
        const monthList = []
        let { transactions } = props
        const daysInYear = getDaysInYear(this.firstDate(transactions))
        let month = this.getMonth(this.firstDate(transactions))

        for (let day = 1; day < daysInYear && transactions.length > 0; day++) {
            const dayInformation = filterTransactionByDay(day, transactions)
            transactions = dayInformation.transactions
            const hasTransaction = dayInformation.date

            dayList.push(<DayComponent {...dayInformation} />)

            if (dayList.length === MAX_WEEK_DAYS) {
                weekList.push(this.addDaysToWeekGraph(dayList))
                dayList = []
            } if (hasTransaction && month !== this.getMonth(dayInformation.date)) {
                monthList.push(<MonthComponent weekTransaction={weekList} monthId={month} />)
                month = this.getMonth(dayInformation.date)
                weekList = []
            }
        }
        weekList.push(this.addDaysToWeekGraph(dayList))
        monthList.push(<MonthComponent weekTransaction={weekList} monthId={month} />)
        return monthList
    }

    render() {
        return this.buidWeekGraph(this.props)
    }
}

WeekComponent.MAX_WEEK_DAYS = MAX_WEEK_DAYS
export default WeekComponent  
