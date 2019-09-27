import React from "react"

function dayComponent(transaction) {
    const { style } = transaction.style
    return (
        <span className="day-tile" style={style}>
        </span>
    )
}

export default dayComponent