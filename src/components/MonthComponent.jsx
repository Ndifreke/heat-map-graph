import React from "react"
import WeekComponent from './WeekComponent'

class MonthComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    buildMonths(month) {
        const monthData = []
        for (const week in [1, 2, 3, 4, 5]) {
            monthData.push(<WeekComponent key={week} />)
        }
        return monthData
    }

    monthName(id) {
        return {
            0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May",
            5: "Jun", 6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct",
            10: "Nov", 11: "Dec"
        }[id]
    }

    render() {
        const { month } = this.props
        return (
            <div>
                <div style={{ display: "flex" }}>
                    {this.buildMonths()}
                </div>

                <div className="month-label">{this.monthName(month)}</div>
            </div>
        )
    }
}

export default MonthComponent