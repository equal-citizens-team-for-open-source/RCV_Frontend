import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";

import CandidateName from "./CandidateName";
import "./Ballot.sass";

export const firstSecondThird = (num: number): string => {
  if (num % 10 === 1 && num !== 11) {
    return "st";
  }
  if (num % 10 === 2 && num !== 12) {
    return "nd";
  }
  if (num % 10 === 3 && num !== 13) {
    return "rd";
  }
  return "th";
};

class Ballot extends Component<any> {
  public state: any = {
    choices: []
  };
  public render() {
    const { choices } = this.state;
    return (
      <Paper elevation={24} className="ballot">
        <div className="ballot__heading">Ballot</div>
        <div className="ballot__container">
          <div className="ballot__container__choices__heading">
            <div className="ballot__container__choices__info">
              <div className="ballot__container__choices__info__paragraph">
                List the candidates in order by touching or clicking on their
                names or the button next to their name, starting with the
                candidate you would most prefer to win the election. You can
                choose as many (or as few) candidates as you like.
              </div>
            </div>
            {this.remainingCandidates().length > 0
              ? `Select your ${choices.length + 1}${firstSecondThird(
                  choices.length + 1
                )} preference.`
              : null}
          </div>
          <div className="ballot__container__choices__list">
            {this.remainingCandidates().map((cand: string) => (
              <CandidateName
                onClick={this.addPreference(cand)}
                key={cand}
                name={cand}
                selected={false}
                placement={choices.length + 1}
              />
            ))}
          </div>
          <div className="ballot__container__selections__heading">
            Selections
          </div>
          <div className="ballot__container__selections__list">
            {choices.map((cand: string, index: number) => (
              <CandidateName
                isFirst={index === 0}
                isLast={index === choices.length - 1}
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
      </Paper>
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
