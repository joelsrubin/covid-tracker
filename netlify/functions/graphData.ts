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
  // retrieve rolling averages from NYT
  const response = await axios.get(
    'https://raw.githubusercontent.com/nytimes/covid-19-data/master/rolling-averages/us.csv'
  );

  const DEC_20 = 700;
  // slice from dec20th and split into separate arrays for each line
  const info = await response.data.split('\n').slice(DEC_20);
  // create an array with only the date and deaths from each line
  const data = info.map((day) => {
    const [date, , , , , deaths] = day.split(',');
    return {
      date,
      deaths,
    };
  });

  // format data into an array for nivo graph with appropriate x/y designation
  const graph: GraphData[] = [
    {
      id: 'deaths',
      data: data.map((day: ApiData, i: number) => {
        const [year, month, num] = String(day.date).split('-');
        const formatDate = `${year}-${month}-${num}`;

        return {
          x: formatDate,
          y: Number(day.deaths),
        };
      }),
    },
  ];

  // return the obj to react query
  return {
    statusCode: 200,
    body: JSON.stringify(graph),
  };
};
