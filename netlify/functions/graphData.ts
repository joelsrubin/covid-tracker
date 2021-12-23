import { Handler } from '@netlify/functions';
import axios from 'axios';

export const handler: Handler = async () => {
  const response = await axios.get(
    'https://raw.githubusercontent.com/nytimes/covid-19-data/master/rolling-averages/us.csv'
  );
  const DEC_20 = 700;

  const info = await response.data.split('\n').slice(DEC_20);
  const data = info.map((day) => {
    const [date, _a, _b, _c, _d, deaths] = day.split(',');

    return {
      date,
      deaths,
    };
  });

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
