import { Handler } from '@netlify/functions';
import axios from 'axios';

export const handler: Handler = async () => {
  // first retrieve the live daily count
  const response = await axios.get(
    'https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us.csv'
  );
  // then retrieve the rolling averages
  const responseTwo = await axios.get(
    'https://raw.githubusercontent.com/nytimes/covid-19-data/master/rolling-averages/us.csv'
  );

  const INITIAL = 806336;
  // take the info from the first response
  const [, info] = await response.data.split('\n');
  // take the averages from the second response line by line
  const averages = await responseTwo.data.split('\n');
  // pop the 6th value out of the averages array (the actual average)
  const average = averages[averages.length - 1].split(',')[6];
  // pop the count off the end of the info array
  const [, , count] = info.split(',');

  // get the current total by subtracting the daily total from initial total (INITIAL)
  const total = Number(count) - INITIAL;
  // estimate the projected total by multiplying the average by 90 (days of winter)
  const projectedTotal = Number(average) * 90;

  // return the relevant information
  return {
    statusCode: 200,
    body: JSON.stringify({ total, projectedTotal, count, average }),
  };
};
