import React, { Component } from "react";
import CandidateName from "./CandidateName";
import "./Ballot.sass";

class Ballot extends Component<any> {
  public state: any = {
    choices: []
  };
  public render() {
    return (
      <div className="ballot">
        <div className="ballot__heading">Ballot</div>
        <div className="ballot__container">
          <div className="ballot__container__left">
            <div>Choices</div>
            <div>
              {this.remainingCandidates().map((cand: string) => (
                <CandidateName
                  onClick={this.addPreference(cand)}
                  key={cand}
                  name={cand}
                  selected={false}
                  placement={this.state.choices.length + 1}
                />
              ))}
            </div>
          </div>
          <div className="ballot__container__right">
            <div>Selections</div>
            <div>
              {this.state.choices.map((cand: string, index: number) => (
                <CandidateName
                  isFirst={index === 0}
                  isLast={index === this.state.choices.length - 1}
                  increment={this.incrementCandidate(cand)}
                  decrement={this.decrementCandidate(cand)}
                  onClick={this.removePreference(cand)}
                  key={cand}
                  name={cand}
                  selected={true}
                  placement={index + 1}
                />
              ))}
            </div>
          </div>
        </div>

        <pre>
          {JSON.stringify({ props: this.props, state: this.state }, null, 2)}
        </pre>
      </div>
    );
  }
  private incrementCandidate = (cand: string) => () => {
    const { choices } = this.state;
    const index: number = choices.indexOf(cand);
    if (index === 0) {
      return;
    }
    this.setState({
      choices: choices
        .slice(0, index - 1)
        .concat(choices.slice(index - 1, index + 1).reverse())
        .concat(choices.slice(index + 1))
    });
  };
  private decrementCandidate = (cand: string) => () => {
    const { choices } = this.state;
    const index: number = choices.indexOf(cand);
    if (index === choices.length - 1) {
      return;
    }
    this.setState({
      choices: choices
        .slice(0, index)
        .concat(choices.slice(index, index + 2).reverse())
        .concat(choices.slice(index + 2))
    });
  };
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
