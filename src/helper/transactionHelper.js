
const months = {
    0: "january",
    1: "febuary",
    2: "march",
    3: "april",
    4: "may",
    5: "june",
    6: "july",
    7: "august",
    8: "september",
    9: "october",
    10: "november",
    11: "december"
}

const monthName = {
    "january": 0,
    "febuary": 1,
    "march": 2,
    "april": 3,
    "may": 4,
    "june": 5,
    "july": 6,
    "august": 7,
    "september": 8,
    "october": 9,
    "november": 10,
    "december": 11
}

const sortTransactionByMonth = (transactionData) => {
    const sortByMonth = {}
    transactionData.forEach(transaction => {
        const monthNumber = new Date(transaction.date).getMonth()
        const monthName = months[monthNumber]
        if (monthName in sortByMonth) {
            sortByMonth[monthName].push(transaction)
        } else {
            sortByMonth[monthName] = [transaction]
        }
    })
    return sortByMonth
}

exports.months = months
exports.monthNames = monthName
exports.sortTransactionByMonth = sortTransactionByMonth