import React from 'react';
import WeekComponent from './components/WeekComponent';
import WeekDaysLabel from './components/WeekDaysLabel'
import dump from './transactions'
import { sortTransactionByDate, dailyTransactionSum } from './helper/transactionHelper'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      firstYearDate: new Date(),
      dailyAmounts: {}
    }
  }

  /**
   * Prepare the transaction date by sorting it so children component
   * will not have to do aditional work
   * @returns {Object} transacion and the first day of transaction
   */
  static buildGraph() {
    const transactions = sortTransactionByDate(dump)
    return { transactions, firstYearDate: new Date(transactions[0].date) }
  }



  static getDerivedStateFromProps() {
    const { transactions, firstYearDate } = App.buildGraph()
    const dailyAmounts = dailyTransactionSum(transactions)
    return { transactions, firstYearDate, dailyAmounts };
  }

  render() {
    const { transactions, firstYearDate, dailyAmounts } = this.state
    return (
      <div className="graph-container">
        <WeekDaysLabel firstYearDate={firstYearDate} />
        <WeekComponent transactions={transactions} dailyAmounts={dailyAmounts} />
      </div>

    );
  }

}


export default App;
