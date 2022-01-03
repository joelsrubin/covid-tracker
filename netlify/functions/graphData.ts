import { Handler } from '@netlify/functions';
import axios from 'axios';

type Stats = {
  x: string;
  y: number | null;
};

type GraphData = {
  id: string;
  data: Stats[];
};

type ApiData = {
  date: Date;
  deaths: string;
};

export const handler: Handler = async () => {
  const response = await axios.get(
    'https://raw.githubusercontent.com/nytimes/covid-19-data/master/rolling-averages/us.csv'
  );
  const DEC_20 = 700;

  const info = await response.data.split('\n').slice(DEC_20);
  const data = info.map((day) => {
    const [date, , , , , deaths] = day.split(',');

    return {
      date,
      deaths,
    };
  });

  const graph: GraphData[] = [
    {
      id: 'deaths',
      data: data.map((day: ApiData) => {
        const [, month, num] = String(day.date).split('-');
        const formatDate = `${month}-${num}`;

        return {
          x: formatDate,
          y: Number(day.deaths),
        };
      }),
    },
  ];

  return {
    statusCode: 200,
    body: JSON.stringify(graph),
  };
};
