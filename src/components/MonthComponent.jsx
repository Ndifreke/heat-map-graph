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

    render() {
        const { weekTransaction, monthName } = this.props
        return (
            <div>
                <div style={{ display: "flex" }}>
                    {weekTransaction}
                </div>
                <div className="month-label">{monthName}</div>
            </div>
        )
    }
}

export default MonthComponent