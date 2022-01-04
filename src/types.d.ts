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

type Query = 'landing' | 'graphs';

type PrefetchFunc = () => Promise<void>;

type PageRender = () => React.ReactElement;

type SetPageState = () => void;
