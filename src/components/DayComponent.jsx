import React from "react"

export const COLOR_RANGE = {
    neutral: { style: { background: "rgb(235, 237, 240)" } },
    low: { style: { background: "rgb(165, 42, 42)" } },
    midLow: { style: { background: "rgb(250, 128, 114)" } },
    midHigh: { style: { background: "rgb(198, 228, 139)" } },
    high: { style: { background: "rgb(35, 154, 59)" } },
}

class DayComponent extends React.Component {

    /**
     * Determine the color that will be appended to each day data
     * @param {Number} credit sum of credits for this day
     * @param {*} debit sum of debit for this day
     * @param {*} peakTransaction  the highest transaction for the year
     */
    calculateGraphColor(todaysTransact, peakTransaction) {
        const average = peakTransaction / 2
        let style = COLOR_RANGE.neutral
        if (todaysTransact < (average / 2)) {
            style = COLOR_RANGE.low
        } else if (todaysTransact <= average && todaysTransact > (average / 2)) {
            style = COLOR_RANGE.midLow
        } else if (todaysTransact >= average && (average / 2) + average >= todaysTransact) {
            style = COLOR_RANGE.midHigh
        } else if (todaysTransact > (average / 2) + average) {
            style = COLOR_RANGE.high
        }
        return style
    }

    render() {
        const { date, dailyAmounts, peakTransaction } = this.props
        const todaysTransaction = dailyAmounts[date]
        const { style } = this.calculateGraphColor(todaysTransaction, peakTransaction)
        const title = `${new Date(date).toDateString()} $${todaysTransaction.toFixed(2)}`
        return (
            <li title={title}>
                <span className="day-tile" style={style}></span>
            </li>
        )
    }
}


export default DayComponent