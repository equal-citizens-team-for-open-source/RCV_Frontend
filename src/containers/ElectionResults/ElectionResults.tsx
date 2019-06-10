import React, { Component } from "react";
import mockDemPrimaryResults from "../../mockData/mockDemPrimaryResults.json";
import FinalOutcome from "./FinalOutcome";
import OriginalBallots from "./OriginalBallots";
import makeElectionTree, { electionTreeToArray } from "./makeElectionTree";
import LeafDisplay from "./LeafDisplay";
import { Typography } from "@material-ui/core";
import { stvBallot } from "../../types/index.js";
import VoteAssignments from "./VoteAssignments";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";

import "./ElectionResults.sass";

class ElectionResults extends Component {
  public results: any = mockDemPrimaryResults;
  public render() {
    const votesInTotal: number = this.results.votes.reduce(
      (count: number, vote: stvBallot) => count + vote[1],
      0
    );
    return (
      <div>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="h4" gutterBottom={true}>
            Final Results:
          </Typography>
          <FinalOutcome tally={this.results.tally} />
        </Paper>
        <Paper style={{ padding: "20px" }}>
          <div style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom={true}>
              Detailed Voting Data:
            </Typography>
          </div>
          {electionTreeToArray(makeElectionTree(this.results.votes)).map(
            (leaf: any) => (
              <LeafDisplay
                leaf={leaf}
                parentVotes={votesInTotal}
                votesInTotal={votesInTotal}
                chain={[]}
                key={JSON.stringify(leaf)}
              />
            )
          )}
        </Paper>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="original-ballots"
            id="original-ballots"
          >
            <Typography variant="h4" gutterBottom={true}>
              Review the original ballots:
            </Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <OriginalBallots ballots={this.results.ballots} />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="original-ballots"
            id="original-ballots"
          >
            <Typography variant="h4" gutterBottom={true}>
              How were the delegates assigned?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {" "}
            <VoteAssignments reports={this.results.reports} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default ElectionResults;
