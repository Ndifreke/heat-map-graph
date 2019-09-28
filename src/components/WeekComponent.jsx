import React from 'react';
import DayComponent from './DayComponent'
import uuidv1 from 'uuid/v1'
import MonthComponent from './MonthComponent'
import { filterTransactionByDayOfYear } from '../helper/transactionHelper'

const MAX_WEEK_DAYS = 7

class WeekComponent extends React.Component {

    /**
     * Create a week data by adding all days of that week into
     * weeks container
     * @param {Array} dayList Array containing seven days of the the week
     * @returns {Unudered List} containing the weeks transactions
     */
    addDaysToWeekGraph(dayList) {
        return (
            <ul style={{ listStyle: "none" }} key={uuidv1()}>
                {dayList}
            </ul >
        )
    }

    /**
     * Get the first date that that appears in transaction
     * @param {Object} transactions sorted transactions
     * @returns Date first day in transaction
     */
    firstDate(transactions) {
        return new Date(transactions[0].date)
    }

    getMonth(date) {
        return date.getMonth()
    }

    /**
     * Build a graph from the transaction data in the props
     * @param {Object} props property passed from the Application entry point
     * @returns {Object} A graph of all the months contained in the transaction
     */
    buidWeekGraph(props) {
        let weekList = []
        let dayList = []
        const monthList = []
        let { transactions, dailyAmount } = props

        let month = this.getMonth(this.firstDate(transactions))

        for (let day = 1; transactions.length > 0; day++) {
            const dayInformation = filterTransactionByDayOfYear(day, transactions)
            transactions = dayInformation.transactions
            const hasTransaction = dayInformation.date

            dayList.push(<DayComponent {...dayInformation} key={uuidv1()} />)

            if (dayList.length === MAX_WEEK_DAYS) {
                weekList.push(this.addDaysToWeekGraph(dayList))
                dayList = []
            } if (hasTransaction && month !== this.getMonth(dayInformation.date)) {
                monthList.push(<MonthComponent weekTransaction={weekList} monthId={month} key={uuidv1()} />)
                month = this.getMonth(dayInformation.date)
                weekList = []
            }
        }
        weekList.push(this.addDaysToWeekGraph(dayList))
        monthList.push(<MonthComponent weekTransaction={weekList} monthId={month} key={uuidv1()} />)
        return monthList
    }

    render() {
        return this.buidWeekGraph(this.props)
    }
}

WeekComponent.MAX_WEEK_DAYS = MAX_WEEK_DAYS
export default WeekComponent 