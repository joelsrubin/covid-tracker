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

type PrefetchFunc = (query: string, endpoint: string) => Promise<void>;

type PageRender = () => React.ReactElement;

type SetPageState = () => void;
