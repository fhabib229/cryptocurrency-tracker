import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Chart from 'chart.js';
import moment from 'moment';
import { Line } from 'react-chartjs-2';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      data: {},
      options: {
        scales: {
          xAxes: [{
            ticks: {
              source: 'data',
              autoSkip: true
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'BTC Price ($USD)'
            }
          }]
        }
      }
    }
  }

  componentDidMount() {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-01&end=2019-01-01')
      .then(result => {
        this.setState({
          isLoaded: true,
          data: result.data
        });
      }, (err) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { isLoaded, error, data, options } = this.state;
    if (error) {
      return <div>Error....{error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      const btcLabels = Object.keys(data.bpi).map(date => moment(date).format('MMMM DD YYYY'));
      const btcData = Object.values(data.bpi);
      const chartData = {
        labels:
          btcLabels,
        datasets: [{
          label: 'Bitcoin Price(BTC)',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data:
            btcData
        }]
      };
      return (
        <div>
          <Line
            data= {chartData}
            height={600}
            width={2000}
            options={options}
          />
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('price-data'));

