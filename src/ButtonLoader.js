import React, { Component } from "react";

export default class ButtonLoader extends Component {
  state = {
    loading: false
  };

  fetchData = () => {
    this.setState({ loading: true });

    //Faking API call here
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);


  };

  render() {
    const { loading } = this.state;

    return (
        <button type="submit" onClick={this.fetchData} disabled={loading}>
          {loading && (
            <i
            />
          )}
          {loading && <span>Loading</span>}
          {!loading && <span>Search</span>}
        </button>
    );
  }
}
