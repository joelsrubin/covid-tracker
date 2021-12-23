import { Handler } from '@netlify/functions';
import axios from 'axios';

export const handler: Handler = async () => {
  const response = await axios.get(
    'https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us.csv'
  );

  const responseTwo = await axios.get(
    'https://raw.githubusercontent.com/nytimes/covid-19-data/master/rolling-averages/us.csv'
  );

  const [__, info] = await response.data.split('\n');
  const averages = await responseTwo.data.split('\n');
  const average = averages[averages.length - 1].split(',')[6];
  const [date, _, count] = info.split(',');

  return {
    statusCode: 200,
    body: JSON.stringify({ date, count, average }),
  };
};
