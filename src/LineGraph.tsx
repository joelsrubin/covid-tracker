import { ResponsiveLine } from '@nivo/line';

type Stats = {
  x: string;
  y: number | null;
};

type GraphData = {
  id: string;
  data: Stats[];
};

type LineGraphProps = {
  data: GraphData[];
};

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
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
