/***********************************
 * PropTypes                       *
 ***********************************/

type LandingProps = {
  renderInfo: () => React.ReactElement;
  projectedTotal: number;
};

type MessageProps = {
  sentHandler: () => void;
  sent: boolean;
};

/***********************************
 * DataTypes                       *
 ***********************************/

type Stats = {
  x: string;
  y: number;
};

type GraphData = {
  id: string;
  data: Stats[];
};

type ApiData = {
  date: Date;
  cases: string;
  deaths: string;
};

type Latest = {
  count: number;
  average: number;
};

type Page = 'Graphs' | 'Cash Out' | 'Home';
