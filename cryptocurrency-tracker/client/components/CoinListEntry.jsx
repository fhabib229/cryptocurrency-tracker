import React from 'react';
import { Grid } from 'semantic-ui-react';
import { moneyFormat, capitalize } from '../helper.js';

//TODO:
//  Color positive changes green and negative changes in red
//  Limit rendering to 10 currencies, w/ option to expand (Show More)
//  Style the entries (background color, special font, etc)

const CoinListEntry = (props) => {
  return (
    <Grid.Row>
      <Grid.Column width={1}>
        {props.asset.rank}
      </Grid.Column>
      <Grid.Column width={5}>
        {capitalize(props.asset.id) + ' (' + props.asset.symbol + ') '}
      </Grid.Column>
      <Grid.Column width={2}>
        ${Number(props.asset.priceUsd).toFixed(2)}
      </Grid.Column>
      <Grid.Column width={2}>
        ${moneyFormat(props.asset.marketCapUsd)}
      </Grid.Column>
      <Grid.Column width={2}>
        ${moneyFormat(props.asset.supply)}
        </Grid.Column>
      <Grid.Column width={2}>
        ${moneyFormat(props.asset.volumeUsd24Hr)}
      </Grid.Column>
      <Grid.Column width={2}>
        {Number(props.asset.changePercent24Hr).toFixed(2)}%
      </Grid.Column>
    </Grid.Row>
  );
}

export default CoinListEntry;