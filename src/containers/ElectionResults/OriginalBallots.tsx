import React, { Component } from "react";
import sortBy from "lodash/sortBy";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import TableSortLabel from "@material-ui/core/TableSortLabel";

type stvBallot = [string[], number];

const listFirstChoices = (ballots: stvBallot[]) => {
  const firsties: Set<string> = new Set();
  ballots.forEach(([list, _votes]: stvBallot) => {
    firsties.add(list[0]);
  });
  const keys = Array.from(firsties).sort();
  return keys;
};

class OriginalBallots extends Component<any> {
  public state = {
    order: true,
    field: "votes"
  };

  public render() {
    const { order, field } = this.state;
    return (
      <Paper>
        <Typography>Here are the original ballots as cast: </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={field === "name"}
                  direction={this.direction(order)}
                  onClick={this.handleSort("name")}
                >
                  Preference List:
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={field === "votes"}
                  direction={this.direction(order)}
                  onClick={this.handleSort("votes")}
                >
                  Votes
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.getBallots().map(([candidateList, votes]: stvBallot) => (
              <TableRow key={JSON.stringify(candidateList)}>
                <TableCell>{candidateList.join(", then ")}</TableCell>
                <TableCell align="right">{votes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
  private direction = (bool: boolean) => (bool ? "asc" : "desc");
  private handleSort = (key: string) => () => {
    const { order, field } = this.state;
    if (key === field) {
      this.setState({
        order: !order
      });
    } else {
      this.setState({
        order: true,
        field: key
      });
    }
  };
  private getBallots = () => {
    const { order, field } = this.state;
    let ballotList = this.props.ballots.slice();
    if (field === "votes") {
      ballotList = sortBy(ballotList, ([_list, votes]) => votes);
    } else {
      ballotList = sortBy(ballotList, ([list, _votes]) => JSON.stringify(list));
    }
    if (!order) {
      ballotList = ballotList.reverse();
    }
    return ballotList;
  };
}

export default OriginalBallots;
