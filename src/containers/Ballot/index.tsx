import React, { Component, Fragment } from "react";
import CandidateName from "./CandidateName";

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
          return (
            <CandidateName
              onClick={this.addPreference(cand)}
              key={cand}
              name={cand}
              placement={this.state.choices.length + 1}
            />
          );
        })}
        {this.state.choices.length > 0 ? (
          <Fragment>
            <h3>Selections</h3>
            {this.state.choices.map((cand: string, index: number) => {
              return (
                <CandidateName
                  onClick={this.removePreference(cand)}
                  key={cand}
                  name={cand}
                  placement={index + 1}
                />
              );
            })}
          </Fragment>
        ) : (
          <Fragment>
            <h3>Selections</h3>
            <div>Please choose your first-choice candidate</div>
          </Fragment>
        )}
        <pre>
          {JSON.stringify({ props: this.props, state: this.state }, null, 2)}
        </pre>
      </div>
    );
  }
  private addPreference = (cand: string) => () =>
    this.setState({ choices: this.state.choices.concat(cand) });
  private removePreference = (cand: string) => () =>
    this.setState({
      choices: this.state.choices.filter((choice: string) => cand !== choice)
    });
  private remainingCandidates = () =>
    this.props.candidateList.filter(
      (cand: string) => !this.state.choices.includes(cand)
    );
}

export default Ballot;
