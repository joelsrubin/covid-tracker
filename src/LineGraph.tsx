import { ResponsiveLine } from '@nivo/line';

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const interval = Math.floor(data[0].data.length / 5);

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 40, bottom: 60, left: 70 }}
      xScale={{
        type: 'time',
        format: '%Y-%m-%d',
        useUTC: false,
        precision: 'day',
      }}
      xFormat='time:%Y-%m-%d'
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=' >-.2f'
      axisBottom={{
        format: '%b %d',
        tickValues: `every ${interval} days`,
        legend: 'date',
        legendPosition: 'middle',
        legendOffset: 50,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -60,
        legendPosition: 'middle',
      }}
      theme={{ textColor: 'oldlace', fontSize: 10 }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
    />
  );
};

export default LineGraph;
