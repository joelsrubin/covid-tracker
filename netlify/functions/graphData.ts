import { Handler } from '@netlify/functions';
import axios from 'axios';

export const handler: Handler = async () => {
  const response = await axios.get(
    'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv'
  );
  const dec21 = 701;

  const info = await response.data.split('\n').slice(dec21);

  const data = info.map((day) => {
    const [date, cases, deaths] = day.split(',');

    return {
      date,
      cases,
      deaths,
    };
  });

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
