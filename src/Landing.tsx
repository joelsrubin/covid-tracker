import covid from './covid.png';

type LandingProps = {
  renderInfo: () => React.ReactElement;
};

const Landing: React.FC<LandingProps> = ({ renderInfo }) => {
  return (
    <header className='App-header'>
      <h1>Official NYT Covid Tracker</h1>
      <h2>Deaths since December 21, 2021: {renderInfo()} </h2>
      <img src={covid} className='App-logo' />
    </header>
  );
};

export default Landing;
