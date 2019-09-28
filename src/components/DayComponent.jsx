import React from "react"

export const COLOR_RANGE = {
    neutral: { style: { background: "rgb(235, 237, 240)" } },
    low: { style: { background: "#A52A2A" } },
    midLow: { style: { background: "#FA8072" } },
    midHigh: { style: { background: "rgb(198, 228, 139)" } },
    high: { style: { background: "#239a3b" } },
}

class DayComponent extends React.Component {

    calculateGraphColor(credit, debit = 0) {
        const average = (credit + debit) / 2
        let style = COLOR_RANGE.neutral
        if (debit < (average / 2)) {
            style = COLOR_RANGE.low
        } else if (debit <= average && debit > (average / 2)) {
            style = COLOR_RANGE.midLow
        } else if (credit >= average && (average / 2) + average >= credit) {
            style = COLOR_RANGE.midHigh
        } else if (credit > average && (average / 2) + average) {
            style = COLOR_RANGE.high
        }
        return style
    }

    render() {
        const { credit, debit, date, key } = this.props
        const { style } = this.calculateGraphColor(credit, debit)
        const title = `${date.toDateString()} $${(credit + debit).toFixed(2)}`
        return (
            <li key={key} title={title}>
                <span className="day-tile" style={style}></span>
            </li>
        )
    }
}


export default DayComponent