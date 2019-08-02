import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { Dimmer, Loader } from 'semantic-ui-react';
import styled from 'styled-components';

//TODO:
//  Render chart of selected cryptocurrency from coin list
//  Styling: background color for chart

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      assets: {},
      options: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Bitcoin Price (BTC)',
          fontColor: '#FFFFFF'
        },
        legend: {
          labels: {
            fontColor: '#FFFFFF'
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              source: 'data',
              autoSkip: true,
              fontColor: '#FFFFFF'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'BTC Price ($USD)',
              fontColor: '#FFFFFF'
            },
            ticks: {
              fontColor: '#FFFFFF'
            },
            gridLines: {
              display: true,
              color: '#FFFFFF'
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
          label: '3M',
          borderColor: '#9915FF',
          data:
            btcData
        }]
      };
      return (
        <div>
          <Line
            data= {chartData}
            height={500}
            width={500}
            options={options}
          />
        </div>
      );
    }
  }
}

export default Chart;