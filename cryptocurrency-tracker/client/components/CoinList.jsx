import React from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';

class CoinList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      assets: {}
    };
  }

  componentDidMount() {}

  render() {}
}