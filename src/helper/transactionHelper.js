import { getDayOfYear } from 'date-fns';


export const transactionData = (transactionData) => {
    return transactionData.sort((a, b, c) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
}

export function filterTransactionByDay(day, transactions) {
    const details = { date: null, credit: 0, debit: 0, offset: 0 }
    for (const transaction of transactions) {
        if (getDayOfYear(new Date(transaction.date)) === day) {
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

