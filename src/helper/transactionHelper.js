

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

export default { sortTransactionByMonth, months }