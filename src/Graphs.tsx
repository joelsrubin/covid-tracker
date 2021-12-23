import { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';

const Graphs = () => {
  const [graphData, setGraphData] = useState([]);

  const fetchGraphData = async () => {
    const res = await fetch('/.netlify/functions/graphData');
    const info = await res.json();
    setGraphData(info);
  };

  const dataHandler = () => {
    const data: GraphData[] = [
      {
        id: 'deaths',
        data: graphData.map((day: ApiData) => {
          return {
            x: day.date,
            y: Number(day.deaths),
          };
        }),
      },
    ];

    return data;
  };

  useEffect(() => {
    dataHandler();
  }, [graphData]);

  useEffect(() => {
    fetchGraphData();
  }, []);

  return (
    <header className='App-header'>
      <h1>Line Chart</h1>
      <div className='container-chart'>
        <ResponsiveLine
          data={dataHandler() || []}
          margin={{ top: 50, right: 40, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          yFormat=' >-.2f'
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'date',
            legendOffset: 40,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -50,
            legendPosition: 'middle',
          }}
          theme={{ textColor: 'oldlace' }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
        />
      </div>
    </header>
  );
};

export default Graphs;
