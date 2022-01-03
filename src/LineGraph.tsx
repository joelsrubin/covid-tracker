import { ResponsiveLine } from '@nivo/line';

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  // TODO: create dynamic dates array depending on size to display fewer dates
  // const dates = data[0].data.map((x, i) => {
  //   if (i % 2 === 0) {
  //     return '';
  //   }
  //   return x.x;
  // });

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 40, bottom: 60, left: 60 }}
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
        tickRotation: 45,
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
