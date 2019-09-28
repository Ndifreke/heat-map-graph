import React from "react"

class MonthComponent extends React.Component {

    dayAbbr(day) {
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

    monthName(monthId) {
       return  {
            0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May",
            5: "Jun", 6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct",
            10: "Nov", 11: "Dec"
        }[monthId]
    }

    render() {
        const { weekTransaction, monthId } = this.props
        return (
            <div>
                <div style={{ display: "flex" }}>
                    {weekTransaction}
                </div>
                <div className="month-label">{this.monthName(monthId)}</div>
            </div>
        )
    }
}

export default MonthComponent