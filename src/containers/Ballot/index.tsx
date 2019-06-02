import React, { Component } from "react";

class Ballot extends Component<any> {
  public state: any = {
    choices: []
  };
  public render() {
    return (
      <div>
        <h1>Ballot</h1>
        <h3>Choices</h3>
        {this.remainingCandidates().map((cand: string) => {
          return <div onClick={this.addPreference(cand)}>{cand}</div>;
        })}
        <h3>Selections</h3>
        {this.state.choices.map((cand: string, index: number) => {
          return (
            <div>
              {index + 1}. {cand}
            </div>
          );
        })}
        <pre>
          {JSON.stringify({ props: this.props, state: this.state }, null, 2)}
        </pre>
      </div>
    );
  }
  private addPreference = (cand: string) => () => {
    this.setState({ choices: this.state.choices.concat(cand) });
  };
  private remainingCandidates = () =>
    this.props.candidateList.filter(
      (cand: string) => !this.state.choices.includes(cand)
    );
}

export default Ballot;
