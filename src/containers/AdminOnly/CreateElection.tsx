import React, { Component, Fragment } from "react";
import moment, { Moment } from "moment";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";

import Button from "@material-ui/core/Button";
import { MuiPickersUtilsProvider, DateTimePicker } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";

import { postCreateNewElection } from "../../api/admin";

import "./CreateElection.sass";

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

interface IElectionState extends IElection {
  pollsOpen: Moment;
  pollsClose: Moment;
  candidates: string[];
}
class CreateElection extends Component {
  public state: IElectionState & {
    tempUserId: string;
    backFromServer?: any;
  } = {
    title: "",
    subtitle: "",
    pollsOpen: moment(),
    pollsClose: moment().add({ hours: 24 }),
    electionID: undefined,
    resultsVisibility: ElectionResultsVisibility.AFTER_CLOSE,
    electionStatus: ElectionStatus.DRAFT,
    electionType: ElectionType.DemocraticPrimary,
    tempUserId: Math.random().toString(),
    candidates: [""]
  };

  public render() {
    const {
      title,
      subtitle,
      electionType,
      resultsVisibility,
      pollsOpen,
      pollsClose,
      tempUserId,
      candidates
    } = this.state;
    return (
      <Fragment>
        <main className="create-election__layout">
          <Paper className="create-election__paper">
            <Typography component="h1" variant="h4" align="center">
              Create New Election
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="tempUserId"
                  id="tempUserId"
                  label="Test User ID"
                  type="text"
                  placeholder="Temporary user id"
                  value={tempUserId}
                  fullWidth
                  required
                  onChange={this.handleTextInputChange("tempUserId")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  id="title"
                  label="Election Title"
                  type="text"
                  placeholder="Please mention date and venue in title"
                  value={title}
                  fullWidth
                  required
                  onChange={this.handleTextInputChange("title")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="subtitle"
                  id="subtitle"
                  type="text"
                  label="Subtitle"
                  placeholder="Enter subtitle"
                  value={subtitle}
                  onChange={this.handleTextInputChange("subtitle")}
                  required={false}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className="create-election__formControl">
                  <FormLabel>What type of election?</FormLabel>
                  <RadioGroup
                    aria-label="Election Type"
                    name="electionType"
                    className="create-election__group"
                    value={electionType}
                    onChange={this.handleSelect("electionType")}
                  >
                    {electionTypeOptions.map(
                      (electionTypeOption: ISelectOption) => (
                        <FormControlLabel
                          key={electionTypeOption.value}
                          value={electionTypeOption.value}
                          label={electionTypeOption.label}
                          control={<Radio />}
                        />
                      )
                    )}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className="create-election__formControl">
                  <FormLabel>When can users see the results?</FormLabel>
                  <RadioGroup
                    aria-label="Results Visibility"
                    name="resultsVisibility"
                    className="create-election__group"
                    value={resultsVisibility}
                    onChange={this.handleSelect("resultsVisibility")}
                  >
                    {resultsVisibilityOptions.map((rvOption: ISelectOption) => (
                      <FormControlLabel
                        key={rvOption.value}
                        value={rvOption.value}
                        label={rvOption.label}
                        control={<Radio />}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>

              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    value={pollsOpen.toDate()}
                    onChange={this.handleDateTimeChange("pollsOpen")}
                    minutesStep={5}
                    label="Polls Open At:"
                    disablePast
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    value={pollsClose.toDate()}
                    onChange={this.handleDateTimeChange("pollsClose")}
                    minutesStep={5}
                    label="Polls Close At:"
                    disablePast
                    minDate={pollsOpen.toDate()}
                    minDateMessage="Polls cannot close before they open"
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <Grid item xs={12}>
                <Typography component="h6" variant="h6" align="left">
                  Candidates
                </Typography>
              </Grid>
              {candidates.map((candidate: string, index: number) => (
                <Fragment key={`candidate-${index}`}>
                  <Grid item xs={9} sm={9}>
                    <TextField
                      name={`Candidate ${index}`}
                      id={`Candidate ${index}`}
                      type="text"
                      label="Candidate Name"
                      placeholder="WASHINGTON, George"
                      value={candidate}
                      onChange={this.handleCandidateChange(index)}
                      required={false}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3} sm={3}>
                    <Button
                      onClick={this.handleRemoveCandidate(index)}
                      variant="text"
                      color="secondary"
                    >
                      <DeleteIcon className="create-election__buttons__icon" />
                      Delete
                    </Button>
                  </Grid>
                </Fragment>
              ))}
            </Grid>
            <Grid item xs={12}>
              <div className="create-election__buttons__add-candidate">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.addCandidateField}
                >
                  <AddCircleOutline className="create-election__buttons__icon" />
                  Add Candidate Field
                </Button>
              </div>
            </Grid>
            <div className="create-election__buttons">
              <Button
                variant="contained"
                color="primary"
                className="create-election__buttons__button"
                onClick={this.submitData}
              >
                Create Election
              </Button>
            </div>
          </Paper>

          <h2>state</h2>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          <h2>props</h2>
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        </main>
      </Fragment>
    );
  }
  private addCandidateField = () =>
    this.setState({ candidates: this.state.candidates.concat("") });
  private handleRemoveCandidate = (index: number) => () => {
    this.setState(
      {
        candidates: this.state.candidates
          .slice(0, index)
          .concat(this.state.candidates.slice(index + 1))
      },
      () => {
        if (this.state.candidates.length === 0) {
          this.setState({ candidates: [""] });
        }
      }
    );
  };

  private handleCandidateChange = (index: number) => (event: any) => {
    const name: string = event.target.value || "";
    const candidateCopy = this.state.candidates.slice();
    candidateCopy[index] = name;
    this.setState({ candidates: candidateCopy });
  };
  private handleTextInputChange = (key: string) => (event: any) => {
    const value: string = event.target.value || "";
    this.setState({ [key]: value });
  };
  private handleSelect = (key: string) => (event: any) => {
    const value: string = event.target.value || "";
    this.setState({ [key]: value });
  };
  private handleDateTimeChange = (key: string) => (time: string) => {
    this.setState({ [key]: moment(time) });
  };
  private submitData = async () => {
    const data: any = await postCreateNewElection(
      this.state,
      this.state.tempUserId
    );
    console.log(data);
    this.setState({ backFromServer: data });
  };
}

export default CreateElection;
