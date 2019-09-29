import React from "react"

class MonthComponent extends React.Component {

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