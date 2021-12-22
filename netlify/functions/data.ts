import { Handler } from '@netlify/functions';
import axios from 'axios';

export const handler: Handler = async () => {
  const response = await axios.get(
    'https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us.csv'
  );

  const [header, info] = await response.data.split('\n');
  const [_a, _b, latest] = info.split(',');

  return {
    statusCode: 200,
    body: JSON.stringify(latest),
  };
};
