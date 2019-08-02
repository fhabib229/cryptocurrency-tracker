import React from 'react';
import axios from 'axios';
import { Grid, Dimmer, Loader, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import CoinListEntry from './CoinListEntry.jsx';

//TODO:
//  Render chart of cryptocurrency selected by the user
//  Styling:
//    Styled span for headers
//    Styled span for button
//    Styled div for entire table

const StyledButton = styled.div`
  text-align: center;
`;

const StyledGrid = styled.div`
  font-family: Monaco, Helvetica, Arial, sans-serif;
  font-size: 15px;
  color: white;
  text-align: left;
  padding: 1em;
`;

const StyledHeader = styled.span`
  font-size: 13px;
  font-weight: bold;
`;

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
        <StyledGrid>
          <Grid celled="internally">
            <Grid.Row>
              <Grid.Column width={1}>
              <StyledHeader>Rank</StyledHeader>
              </Grid.Column>
              <Grid.Column width={5}>
              <StyledHeader> Name</StyledHeader>
              </Grid.Column>
              <Grid.Column width={2}>
              <StyledHeader> Price</StyledHeader>
              </Grid.Column>
              <Grid.Column width={2}>
              <StyledHeader>Market Cap</StyledHeader>
              </Grid.Column>
              <Grid.Column width={2}>
              <StyledHeader>Supply</StyledHeader>
              </Grid.Column>
              <Grid.Column width={2}>
              <StyledHeader>Volume (24Hr)</StyledHeader>
              </Grid.Column>
              <Grid.Column width={2}>
              <StyledHeader>Change (24Hr)</StyledHeader>
              </Grid.Column>
            </Grid.Row>
            {assets.data.slice(0, itemsToShow).map((coin, i) =>
              <CoinListEntry key={i} asset={coin} />
            )}
          </Grid>
          <StyledButton>
            <Button onClick={this.viewMore}>
              {expanded ?
                (
                  <span>View Less</span>
                ) : (
                  <span>View More</span>
                )
              }
            </Button>
          </StyledButton>
        </StyledGrid>
      );
    }
  }
}

export default CoinList;