import React, { Component } from "react";
import moment from "moment";
import {
  ElectionType,
  ElectionStatus,
  ElectionResultsVisibility,
  IElection
} from "../../types";

interface ISelectOption {
  value: string;
  label: string;
}

const electionTypes: ISelectOption[] = [
  {
    value: ElectionType.DemocraticPrimary,
    label: `Ranked Choice Voting - Democratic Primary`
  },
  {
    value: ElectionType.InstantRunoff,
    label: `Ranked Choice Voting (Instant Runoff)`
  },
  {
    value: ElectionType.MultiSeat,
    label: `Ranked Choice Voting (Multi-Seat District)`
  }
];

class CreateElection extends Component {
  public state: IElection = {
    title: "",
    subtitle: "",
    pollsOpen: moment().toISOString(),
    pollsClose: moment()
      .add({ hours: 24 })
      .toISOString(),
    electionID: undefined,
    resultsVisibility: ElectionResultsVisibility.AFTER_CLOSE,
    electionStatus: ElectionStatus.DRAFT,
    electionType: ElectionType.DemocraticPrimary
  };
  private handleTextInputChange = (key: string) => (event: any) => {
    const value: string = event.target.value || "";
    this.setState({ [key]: value });
  };
  private handleSelect = (key: string) => (event: any) => {
    const value: string = event.target.value || "";
    this.setState({ [key]: value });
  };
  public render() {
    const { title, subtitle, electionType } = this.state;
    return (
      <div>
        <div>Election Title:</div>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={this.handleTextInputChange("title")}
        />
        <div>Please include the data and venue in the title</div>
        <hr />
        <div>Subtitle:</div>
        <input
          type="text"
          placeholder="Enter subtitle"
          value={subtitle}
          onChange={this.handleTextInputChange("subtitle")}
        />
        <div>Optional</div>
        <hr />
        <select
          onChange={this.handleSelect("electionType")}
          value={electionType}
        >
          {electionTypes.map((eType: ISelectOption) => (
            <option key={eType.value} value={eType.value}>
              {eType.label}
            </option>
          ))}
        </select>
        <h2>state</h2>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <h2>props</h2>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}

export default CreateElection;
