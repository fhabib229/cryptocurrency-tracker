import React from 'react';
import Chart from './components/Chart.jsx';
import CoinList from './components/CoinList.jsx';
import { Provider } from 'react-redux';
import store from './store';

//TODO:
//  Refactor code?
//  Deploy to Heroku
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <Chart />
          <CoinList />
        </div>
      </Provider>
    );
  }
}

export default App;

