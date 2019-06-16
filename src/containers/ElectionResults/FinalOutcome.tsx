import React from "react";
import sortBy from "lodash/sortBy";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

interface ICandidateResult {
  seatsAllocated: number;
  votes: number;
}
type tallyTuple = [string, ICandidateResult];

const FinalOutcome = ({ tally }: { [key: string]: ICandidateResult }) => {
  const winners: tallyTuple[] = sortBy(Object.entries(tally), [
    ([_name, result]: tallyTuple) => result.seatsAllocated,
    ([_name, result]: tallyTuple) => result.votes
  ]).reverse() as tallyTuple[];
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Candidate</TableCell>
            <TableCell align="right">Votes</TableCell>
            <TableCell align="right">Delegates Awarded</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {winners.map(([name, result]: tallyTuple) => (
            <TableRow key={name}>
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <TableCell align="right">{result.votes}</TableCell>
              <TableCell align="right">{result.seatsAllocated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default FinalOutcome;
