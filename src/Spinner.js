import React from 'react';
import { Spinner } from 'reactstrap';

export default class SpinnerComponent extends React.Component {
  render() {
    return (
      <div>
        <Spinner color="secondary" />
        {/* <Spinner color="success" />
        <Spinner color="danger" />
        <Spinner color="warning" />
        <Spinner color="info" />
        <Spinner color="light" />
        <Spinner color="dark" /> */}
      </div>
    );
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
}