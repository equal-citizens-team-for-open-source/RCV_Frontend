import React from "react";
import VoteBarChart from "./VoteBarChart";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import get from "lodash/get";

interface IOutcome {
  candidate: string;
  action: string;
  seats: number;
  round: number;
  votesTransferred: number;
  changes: { [key: string]: number };
}
interface IEliminationReport {
  round: number;
  results: { [key: string]: { votes: number; seatsAwarded: number } };
  outcome: IOutcome[];
}

const EliminationTable = ({
  results,
  changed
}: {
  results: { [key: string]: any };
  changed: { [key: string]: number };
}) => {
  if (Object.values(results)[0].hasOwnProperty("seatsAllocated")) {
    return null;
  }
  return (
    <div style={{ width: "450px" }}>
      <Paper style={{ margin: "20px" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Candidate</TableCell>
              <TableCell align="right">Votes</TableCell>
              <TableCell align="right">Change For Next Round</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(results).map((candidate: string) => {
              const lost: boolean = changed[candidate] === undefined;
              const votes = results[candidate];
              const changeNumber: number = get(changed, [candidate], 0);
              let change: string = changeNumber.toString();
              if (changeNumber > 0) {
                change = `+${change}`;
              }
              return (
                <TableRow key={candidate}>
                  <TableCell
                    style={
                      lost
                        ? {
                            color: "red",
                            textDecoration: "line-through"
                          }
                        : {}
                    }
                  >
                    {candidate}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={
                      lost
                        ? {
                            color: "red"
                          }
                        : {}
                    }
                  >
                    {votes}
                    {lost ? "->" : ""}
                  </TableCell>
                  <TableCell
                    style={changeNumber > 0 ? { color: "#0b930e" } : {}}
                    align="right"
                  >
                    {lost ? "Eliminated" : change}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

const makeReportText = (outcome: any) => {
  switch (outcome.action) {
    case "ELIMINATED - FEWEST VOTES":
      return (
        <div key={JSON.stringify(outcome)}>
          <div>
            <div style={{ paddingBottom: "10px" }}>
              <Typography>
                Candidate {outcome.candidate} was eliminated, as they had the
                fewest votes this round, and all votes for {outcome.candidate}{" "}
                were transferred to the voters next preferences.
              </Typography>
            </div>
            <ul>
              {Object.entries(outcome.changes).map(
                ([transferCandidate, transferred]) => {
                  if (transferred === 0) {
                    return null;
                  }
                  return (
                    <li key={JSON.stringify([transferCandidate, transferred])}>
                      <Typography>
                        {transferred} votes were transferred to{" "}
                        {transferCandidate}
                      </Typography>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>
      );
    default:
      return null;
  }
};
const EliminationReport = ({ report }: { report: IEliminationReport }) => (
  <Paper elevation={12} style={{ padding: "20px" }}>
    <div>
      <Typography>Round #{report.round}</Typography>
      <div style={{ display: "flex" }}>
        <EliminationTable
          results={report.results}
          changed={report.outcome[0].changes}
        />
        <div>{report.outcome.map(outcome => makeReportText(outcome))}</div>
      </div>
    </div>
    <div />
  </Paper>
);

const DelegateAssignmentTable = ({
  results,
  outcome,
  effectiveVotesForThisRound
}: any) => {
  return (
    <div style={{ width: "600px" }}>
      <Paper style={{ margin: "20px" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Candidate</TableCell>
              <TableCell align="right">Total Votes</TableCell>
              <TableCell align="right">
                Effective Votes for This Round
              </TableCell>
              <TableCell align="right">Delegates Awarded</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(results).map((candidate: string) => {
              return (
                <TableRow key={candidate}>
                  <TableCell>{candidate}</TableCell>
                  <TableCell>{results[candidate].votes}</TableCell>
                  <TableCell>
                    {effectiveVotesForThisRound[candidate].toFixed(0)}
                  </TableCell>
                  <TableCell>{results[candidate].seatsAllocated}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

const makeDelegateAssignmentText = (
  outcome: any,
  report: any,
  index: number
) => {
  const candidate: string = outcome.candidate;
  const seatsAllocated: number = report.results[candidate].seatsAllocated;
  const totalVotes: number = report.results[candidate].votes;
  const effectiveVotes: number = totalVotes / (seatsAllocated + 1);
  return (
    <div key={candidate + index.toString()}>
      <div style={{ paddingBottom: "10px" }}>
        <Typography>
          Candidate {candidate} had the most votes, and was awarded a delegate
          this round.
        </Typography>
      </div>
      <div style={{ paddingBottom: "10px" }}>
        <Typography>
          We apply the Jefferson method of proportional representation, so in
          the next round, {candidate} will have their total votes, {totalVotes},
          divided by the number of seats they have so far, {seatsAllocated},
          plus 1.
        </Typography>
      </div>
      <div style={{ paddingBottom: "10px" }}>
        <Typography>
          It works out to {totalVotes} / {seatsAllocated + 1} ={" "}
          {effectiveVotes.toFixed(0)} effective votes for the next round.
        </Typography>
      </div>
      {outcome.remainingDelegates ? (
        <div style={{ paddingBottom: "10px" }}>
          <Typography>
            There are {outcome.remainingDelegates} delegates left to assign.
          </Typography>
        </div>
      ) : null}
    </div>
  );
};
const DelegateAssignmentReport = ({ report }: any) => (
  <Paper elevation={12} style={{ padding: "20px" }}>
    <div>
      <Typography>Round #{report.round}</Typography>
      <div style={{ display: "flex" }}>
        <DelegateAssignmentTable
          results={report.results}
          outcome={report.outcome[0]}
          effectiveVotesForThisRound={report.effectiveVotesForThisRound}
        />
        <div>
          {report.outcome.map((outcome: any, index: number) =>
            makeDelegateAssignmentText(outcome, report, index)
          )}
        </div>
      </div>
    </div>
    <div />
  </Paper>
);

const VoteAssignment = ({ reports }: { reports: IEliminationReport[] }) => (
  <div>
    {reports.map(report =>
      report.hasOwnProperty("effectiveVotesForThisRound") ? (
        <DelegateAssignmentReport
          key={JSON.stringify(report)}
          report={report}
        />
      ) : (
        <EliminationReport key={JSON.stringify(report)} report={report} />
      )
    )}
  </div>
);
export default VoteAssignment;
