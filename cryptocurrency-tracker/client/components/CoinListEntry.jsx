import React from 'react';
import { Grid } from 'semantic-ui-react';

const CoinListEntry = (props) => {
  return (
    <Grid.Row>
      <Grid.Column width={1}>
        {props.asset.rank}
      </Grid.Column>
      <Grid.Column width={1}>
        {props.asset.id}
      </Grid.Column>
      <Grid.Column width={2}>
        {Number(props.asset.priceUsd).toFixed(2)}
      </Grid.Column>
      <Grid.Column width={2}>
        {Number(props.asset.marketCapUsd).toFixed(2)}
      </Grid.Column>
      <Grid.Column width={2}>
        {Number(props.asset.supply).toFixed(2)}
        </Grid.Column>
      <Grid.Column width={2}>
        {Number(props.asset.volumeUsd24Hr).toFixed(2)}
      </Grid.Column>
      <Grid.Column width={2}>
        {Number(props.asset.changePercent24Hr).toFixed(2)}
      </Grid.Column>
    </Grid.Row>
  );
}

export default CoinListEntry;