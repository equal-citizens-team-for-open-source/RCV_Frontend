import React, { Component } from "react";
import mockDemPrimaryResults from "../../mockData/mockDemPrimaryResults.json";
import FinalOutcome from "./FinalOutcome";
import OriginalBallots from "./OriginalBallots";
import makeElectionTree, { electionTreeToArray } from "./makeElectionTree";
import LeafDisplay from "./LeafDisplay";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { stvBallot } from "../../types/index.js";
import VoteAssignments from "./VoteAssignments";

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
        <FinalOutcome tally={this.results.tally} />
        <Paper elevation={12} className="results__details">
          <Typography variant="h4" gutterBottom={true}>
            How did people vote?
          </Typography>
          <Typography>There were {votesInTotal} votes in total</Typography>
          {electionTreeToArray(makeElectionTree(this.results.votes)).map(
            (leaf: any) => (
              <LeafDisplay
                leaf={leaf}
                parentVotes={votesInTotal}
                votesInTotal={votesInTotal}
                chain={[]}
              />
            )
          )}
        </Paper>
        <Paper elevation={12} className="results__details">
          <Typography variant="h4" gutterBottom={true}>
            How were the delegates assigned?
          </Typography>
          <VoteAssignments reports={this.results.reports} />
        </Paper>
      </div>
    );
  }
}

export default ElectionResults;
