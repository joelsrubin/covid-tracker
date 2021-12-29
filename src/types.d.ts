/***********************************
 * PropTypes                       *
 ***********************************/

type LandingProps = {
  renderInfo: () => React.ReactElement;
  projectedTotal: number;
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
