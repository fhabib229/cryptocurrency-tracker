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
    return <div>Testing </div>
  }
}

export default CoinList;