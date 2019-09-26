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

export const peakTransaction = (dailyTransactionSum) => {
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
    const details = { date: transactions[0].date }
    let offset = 0
    for (const transaction of transactions) {
        if (moment(new Date(transaction.date)).dayOfYear() === day) {
            offset++
            continue
        }
        break
    }
    details.transactions = transactions.slice(offset)
    return details;
}
