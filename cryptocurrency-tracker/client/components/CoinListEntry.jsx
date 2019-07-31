import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';

const CoinListEntry = (props) => {
  return (
  <Grid.Row>
    <Grid.Column width={2}>
      <span>{props.asset.rank}</span>
    </Grid.Column>
    <Grid.Column width={3}>
      <span>{props.asset.id}</span>
    </Grid.Column>
    <Grid.Column width={10}>
      <span>{props.asset.priceUsd}</span>
    </Grid.Column>
    <Grid.Column width={3}>
      <span>{props.asset.marketCapUsd}</span>
    </Grid.Column>
    <Grid.Column width={3}>
      <span>{props.asset.supply}</span>
      </Grid.Column>
    <Grid.Column width={3}>
      <span>{props.asset.volumneUsd24Hr}</span>
      </Grid.Column>
    <Grid.Column width={3}>
      <span>{props.asset.changePercent24Hr}</span>
    </Grid.Column>
  </Grid.Row>
  );
}

export default CoinListEntry;