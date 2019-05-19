import React, { Component } from "react";

class Election extends Component {
  public render() {
    return (
      <div>
        <h1>Hello World</h1>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}

export default Election;
