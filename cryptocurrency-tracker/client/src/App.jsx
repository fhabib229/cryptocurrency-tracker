import React from 'react';
import styled from 'styled-components';
import Chart from './components/Chart.jsx';
import CoinList from './components/CoinList.jsx';

//TODO:
//  Refactor code?
//  Deploy to Heroku

const StyledBackground= styled.div`
  background: linear-gradient(#000000, #190033);
`;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    return (
      <StyledBackground>
        <Chart />
        <CoinList />
      </StyledBackground>
    );
  }
}

export default App;

