import React from 'react';
import axios from 'axios';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import CoinListEntry from './CoinListEntry.jsx';

//TODO:
//  Render chart of cryptocurrency selected by the user

class CoinList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      assets: {}
    };
  }

  componentDidMount() {
    axios.get('https://api.coincap.io/v2/assets')
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
    const { assets, isLoaded, error } = this.state;
    if (error) {
      return <div>Error....{error.message}</div>
    } else if (!isLoaded) {
      return (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      );
    } else {
      return (
        <Grid celled="internally">
          <Grid.Row>
            <Grid.Column width={1}>
              Rank
            </Grid.Column>
            <Grid.Column width={5}>
              Name
            </Grid.Column>
            <Grid.Column width={2}>
              Price
            </Grid.Column>
            <Grid.Column width={2}>
              Market Cap
            </Grid.Column>
            <Grid.Column width={2}>
              Supply
            </Grid.Column>
            <Grid.Column width={2}>
              Volume (24Hr)
            </Grid.Column>
            <Grid.Column width={2}>
              Change (24Hr)
            </Grid.Column>
          </Grid.Row>
          {assets.data.map(coin =>
            <CoinListEntry key={coin.rank} asset={coin} />
          )}
        </Grid>
      );
    }
  }
}

export default CoinList;