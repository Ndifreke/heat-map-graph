import React from "react"
import WeekComponent from './WeekComponent'
import { months } from '../helper/transactionHelper'
import getWeek from 'date-fns/getWeekOfMonth'

class MonthComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    sortMonthDataByWeek(monthData) {
        //  return monthData.sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate())
        const daysByWeek = {}
        monthData.forEach(element => {
            const week = getWeek(new Date(element.date))
            if (week+"week" in daysByWeek) {
                const w = daysByWeek[week +"week"]
                w.push(element)
                daysByWeek[week +"week"] = w
            } else {
                daysByWeek[week+"week"] = [element]
            }
        });
        return daysByWeek
    }

    buildMonths(month) {
        const weekData = this.sortMonthDataByWeek(month)
        const monthData = []
       for (const week in [1, 2, 3, 4,5]) { 
           const weekID = (Number(week)+1)+"week" 
         //  console.log(weekData)
            monthData.push(<WeekComponent  weekData={weekData[weekID]} week={weekID} key={week} />)
       }
        return monthData
    }

    monthAbr(id) { 
        return {
            0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May",
            5: "Jun", 6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct",
            10: "Nov", 11: "Dec"
        }[id]
    }

    render() {
        const { monthTransaction, monthName, monthNumber } = this.props
       // console.log(monthName)
        return (
            <div>
                <div style={{ display: "flex" }}>
                    {this.buildMonths(monthTransaction)}
                </div>
                <div className="month-label">{this.monthAbr(monthNumber)}</div>
            </div>
        )
    }
}

export default MonthComponent