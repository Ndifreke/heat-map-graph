import React from 'react';
import MonthComponent from './components/MonthComponent';
import DayLabels from './components/DaysLabelComponent'

class App extends React.Component {

  buildYearGraph() {
    const months = []
    for (const month in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
      months.push(<MonthComponent month={month} />)
    }
    return months
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
