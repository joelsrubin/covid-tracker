/***********************************
 * PropTypes                       *
 ***********************************/

type GraphProps = {
  INITIAL: number;
};

type LandingProps = {
  renderInfo: () => React.ReactElement;
  projectedTotal: number;
};

/***********************************
 * DataTypes                       *
 ***********************************/

type Stats = {
  x: Date;
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
  date: string;
  latest: number;
};
