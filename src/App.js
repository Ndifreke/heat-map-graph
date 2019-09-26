import React from 'react';
import { WeekComponent } from './components/WeekComponent';
import WeekDaysLabel from './components/WeekDaysLabel'
import dump from './transactions'
import { transactionData } from './helper/transactionHelper'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      firstYearDate: new Date()
    }
  }

  static buildYearGraph() {
    const transactions = transactionData(dump)
    return { transactions, firstYearDate: new Date(transactions[0].date) }
  }

  static getDerivedStateFromProps() {
    return App.buildYearGraph();
  }

  render() {
    const { transactions, firstYearDate } = this.state
    console.log(this.state)
    return (
      <div style={{ display: "flex" }}>
        <WeekDaysLabel firstYearDate={firstYearDate} />
        <WeekComponent transactions={transactions} />
      </div>

    );
  }

}


export default App;
