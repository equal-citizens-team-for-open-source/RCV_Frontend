import React, { Component } from "react";
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
import { MuiPickersUtilsProvider, DateTimePicker } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";

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
}
class CreateElection extends Component {
  public state: IElectionState = {
    title: "",
    subtitle: "",
    pollsOpen: moment(),
    pollsClose: moment().add({ hours: 24 }),
    electionID: undefined,
    resultsVisibility: ElectionResultsVisibility.AFTER_CLOSE,
    electionStatus: ElectionStatus.DRAFT,
    electionType: ElectionType.DemocraticPrimary
  };
  private handleTextinputChange = (key: string) => (event: any) => {
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
  public render() {
    const {
      title,
      subtitle,
      electionType,
      resultsVisibility,
      pollsOpen,
      pollsClose
    } = this.state;
    return (
      <React.Fragment>
        <main className="create-election__layout">
          <Paper className="create-election__paper">
            <Typography component="h1" variant="h4" align="center">
              Create New Election
            </Typography>
            <Grid container spacing={24}>
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
                  onChange={this.handleTextinputChange("title")}
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
                  onChange={this.handleTextinputChange("subtitle")}
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
                    value={pollsOpen}
                    onChange={this.handleDateTimeChange("pollsOpen")}
                    minutesStep={5}
                    label="Polls Open At:"
                    disablePast
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    value={pollsClose}
                    onChange={this.handleDateTimeChange("pollsClose")}
                    minutesStep={5}
                    label="Polls Close At:"
                    disablePast
                    minDate={pollsOpen}
                    minDateMessage="Polls cannot close before they open"
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          </Paper>

          <h2>state</h2>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          <h2>props</h2>
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        </main>
      </React.Fragment>
    );
  }
}

export default CreateElection;
