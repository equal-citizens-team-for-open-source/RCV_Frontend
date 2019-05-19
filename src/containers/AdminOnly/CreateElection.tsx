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

const electionTypeOptions: ISelectOption[] = [
  {
    value: ElectionType.DemocraticPrimary,
    label: `Democratic Primary with 15% threshhold`
  },
  {
    value: ElectionType.InstantRunoff,
    label: `Single Winner / Instant Runoff`
  },
  {
    value: ElectionType.MultiSeat,
    label: `Multi-Member District / Single Transferable Vote`
  }
];

const resultsVisibilityOptions: ISelectOption[] = [
  {
    value: ElectionResultsVisibility.AFTER_CLOSE,
    label: `After polls have closed`
  },
  {
    value: ElectionResultsVisibility.LIVE,
    label: `Live, as votes come in`
  },
  {
    value: ElectionResultsVisibility.LIVE_FOR_VOTERS,
    label: `Live, but only if you have already voted`
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
    const { title, subtitle, electionType, resultsVisibility } = this.state;
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
        <div>Election Type</div>
        {electionTypeOptions.map((eType: ISelectOption) => (
          <div key={eType.value} className="radio-button">
            <label>
              <input
                type="radio"
                checked={eType.value === electionType}
                value={eType.value}
                onChange={this.handleSelect("electionType")}
              />
              {eType.label}
            </label>
          </div>
        ))}
        <hr />
        <div>When can users see the results?</div>
        {resultsVisibilityOptions.map((rvOption: ISelectOption) => (
          <div key={rvOption.value} className="radio-button">
            <label>
              <input
                type="radio"
                checked={rvOption.value === resultsVisibility}
                value={rvOption.value}
                onChange={this.handleSelect("resultsVisibility")}
              />
              {rvOption.label}
            </label>
          </div>
        ))}

        <h2>state</h2>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <h2>props</h2>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}

export default CreateElection;
