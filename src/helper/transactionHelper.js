import moment from 'moment'


export const sortTransactionByDate = (transactionData) => {
    return transactionData.sort((a, b, c) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
}

/**
 * Map days to the accumulative transaction for the given day
 * @param {Object} transaction all transaction
 * @returns {Object} key value object of days and total transactions for each day 
 */
export const dailyTransactionSum = (transaction) => {
    return transaction.reduce((accum, nextTransac) => {
        if (nextTransac.date in accum) {
            accum[nextTransac.date] += nextTransac.amount
        } else {
            accum[nextTransac.date] = nextTransac.amount
        }
        return accum
    }, {})
}

export const highes= (dailyTransactionSum) => {
    let high = 0
    for (const dates in dailyTransactionSum) {
        high = dailyTransactionSum[dates] >= high ? dailyTransactionSum[dates] : high
    }
    return high
}


/**
 * Filter All transactions from the begining of the collection that falls in
 * the day of the year provided untill no matching day is found in the head of the 
 * collection. The transaction must be sorted first
 * @param {Number} day the day of the year used to match the transaction starting from the arrays head 
 * @param {Array} transactions Arrays of transaction
 * @returns {Array} returns a slice transaction Array not matching the day
 */
export const filterTransactionByDayOfYear = (day, transactions) => {
    const details = { date: null, credit: 0, debit: 0, offset: 0 }
    for (const transaction of transactions) {
        if (moment(new Date(transaction.date)).dayOfYear() === day) {
            if (transaction.transactionType === "credit") {
                details.credit += transaction.amount
            } else {
                details.debit += transaction.amount
            }
            details.offset++
            continue
        }
        break
    }
    const transactionOffset = transactions.slice(details.offset)
    details.transactions = transactionOffset
    details.date = new Date(transactions[0].date)
    return details;
}


