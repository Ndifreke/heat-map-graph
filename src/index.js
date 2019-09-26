import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


We have a json dump (transaction-carter.json) containing financial transactions of several
individual companies – we will like to generate a heatmap which will give us a visual
representation as to when people transact the most throughout a year.
The heat map should look like the image below
The “redder” it is the higher the negative accumulated transaction value for that day and the
“greener” it is the higher the positive accumulated transaction for that day. Bearing in mind to
sum the debit and credit value to make up the net value for the day.
Task
-
-
-
Implement a component containing child components that render a heatmap such as
the image above
The component should be complete such as to represent each day of the entire year
Values for each day should be the sum of credits or debits for a given day of any year