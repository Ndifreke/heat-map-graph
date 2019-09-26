import React from 'react';
import MonthComponent from './components/MonthComponent';
import DayLabels from './components/DaysLabelComponent'
import transactions from './transactions'
import { monthNames, sortTransactionByMonth } from './helper/transactionHelper'

class App extends React.Component {

  buildYearGraph() {
    const monthGraph = []
    const transactionData = sortTransactionByMonth(transactions)
    for (const monthName in transactionData) {
      console.log(monthName)
      const monthData = transactionData[monthName]
      monthGraph.push(
        <MonthComponent
          monthTransaction={monthData}
          monthName={monthName}
          monthNumber={monthNames[monthName]}
          key={monthName}
        />
      )
      break
    }
    return monthGraph
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <DayLabels />
        {this.buildYearGraph()}
      </div>

    );
  }

}


export default App;
