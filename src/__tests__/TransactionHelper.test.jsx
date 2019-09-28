import { sortTransactionByDate, filterTransactionByDayOfYear } from '../helper/transactionHelper'
const moment = require("moment")

const testTransaction = [
    { "transactionType": "credit", "date": "2019-03-31", "amount": 299.99 },
    { "transactionType": "debit", "date": "2019-03-31", "amount": 299.99 },
    { "transactionType": "debit", "date": "2019-09-12", "amount": 599.99 },
    { "transactionType": "debit", "date": "2019-03-31", "amount": 299.99 },
    { "transactionType": "debit", "date": "2019-01-31", "amount": 299.99 }
]


describe("Transaction helper", () => {
    const afterSortOrder = ["2019-01-31", "2019-03-31", "2019-03-31","2019-03-31", "2019-09-12"]

    it("should sort transactions by day", () => {
        const sorted = sortTransactionByDate(Object.assign([], testTransaction)) 
        sorted.forEach((transac, index) => expect(transac.date).toBe(afterSortOrder[index]))
    })

    it("should filter transaction by similar date", () => {
        const date = new Date("2019-03-31")
        const day90 = moment(date).dayOfYear()
        const filtered = filterTransactionByDayOfYear(day90, testTransaction)
        expect(new Date(filtered.date).toDateString()).toBe(date.toDateString()) 

    })

})