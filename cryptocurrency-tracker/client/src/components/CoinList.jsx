import React from 'react';
import axios from 'axios';
import { Grid, Dimmer, Loader, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import CoinListEntry from './CoinListEntry.jsx';

//TODO:
//  Render chart of cryptocurrency selected by the user
//  Styling:
//
//

class CoinList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      assets: {},
      itemsToShow: 25,
      expanded: false
    };

    this.viewMore = this.viewMore.bind(this);
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

  viewMore() {
    this.state.itemsToShow === 25 ? (
      this.setState({
        itemsToShow: this.state.assets.data.length,
        expanded: true
      })) : (
        this.setState({ itemsToShow: 25, expanded: false })
      )
  }

  render() {
    const { assets, isLoaded, error, itemsToShow, expanded } = this.state;
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
        <div>
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
            {assets.data.slice(0, itemsToShow).map((coin, i) =>
              <CoinListEntry key={i} asset={coin} />
            )}
          </Grid>
          <Button onClick={this.viewMore}>
            {expanded ?
              (
                <span>View Less</span>
              ) : (
                <span>View More</span>
              )
            }
          </Button>
        </div>
      );
    }
  }
}

export default CoinList;