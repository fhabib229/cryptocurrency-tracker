import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { Dimmer, Loader } from 'semantic-ui-react';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      assets: {},
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
    axios.get('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1')
      .then(result => {
        this.setState({
          isLoaded: true,
          assets: result.data
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
    const { isLoaded, error, assets, options } = this.state;
    if (error) {
      return <div>Error....{error.message}</div>
    } else if (!isLoaded) {
      return (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      );
    } else {
      let cryptoData = assets.data.filter(element => element.time >= 1559347200000).sort((a, b) => a.time - b.time);
      const btcLabels = cryptoData.map(element => moment(element.date).format('MMMM DD YYYY'));
      const btcData = cryptoData.map(element => element.priceUsd);
      const chartData = {
        labels:
          btcLabels,
        datasets: [{
          label: 'Bitcoin Price(BTC)',
          backgroundColor: 'rgb(12, 115, 218)',
          borderColor: 'rgb(58, 59, 60)',
          data:
            btcData
        }]
      };
      return (
        <div>
          <Line
            data= {chartData}
            height={600}
            width={1000}
            options={options}
          />
        </div>
      );
    }
  }
}

export default Chart;