import { Handler } from '@netlify/functions';
import axios from 'axios';

export const handler: Handler = async () => {
  const response = await axios.get(
    'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv'
  );

  const info = await response.data.split('\n');
  const latest = info[info.length - 1].split(',');

  return {
    statusCode: 200,
    body: JSON.stringify(latest),
  };
};
