import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import moment, { Moment } from "moment";

interface IElectionSummary {
  title: string;
  subtitle: string;
  pollsClose: Moment;
  pollsOpen: Moment;
  ballotsCast: number;
}
const celebrityOfYear: IElectionSummary = {
  title: "Most Beloved Celebrity, 2019",
  subtitle: "We may as well just give this award to Tom Hanks.",
  pollsClose: moment().add({ minutes: 15 }),
  pollsOpen: moment().subtract({ minutes: 60 }),
  ballotsCast: 0
};

const instantiateCeleb = () => celebrityOfYear;

class ElectionCard extends Component<IElectionSummary> {
  public state = {
    timeLeft: "",
    nextTimePoint: ""
  };
  public componentDidMount() {
    this.countdown();
  }
  public render() {
    const { title, subtitle } = this.props;
    const { timeLeft, nextTimePoint } = this.state;
    return (
      <Card className="dashboard-election__card">
        <CardContent>
          <Typography
            color="textSecondary"
            gutterBottom
            className="dashboard-election__card__title"
          >
            {title}
          </Typography>
          <Typography
            className="dashboard-election__card__subtitle"
            color="textSecondary"
          >
            {subtitle}
          </Typography>
          <Typography variant="body2" component="p">
            {nextTimePoint}: {timeLeft}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Vote</Button>
        </CardActions>
      </Card>
    );
  }
  private countdown = () => {
    const { pollsOpen, pollsClose } = this.props;
    if (moment().isBefore(pollsOpen)) {
      this.setState({
        timeLeft: moment().to(pollsOpen),
        nextTimePoint: "Polls open"
      });
    } else if (moment().isBefore(pollsClose)) {
      this.setState({
        timeLeft: moment().to(pollsClose),
        nextTimePoint: "Polls close"
      });
    } else {
      this.setState({
        timeLeft: moment().from(pollsClose, true),
        nextTimePoint: "Polls have been closed"
      });
    }
  };
}

const CurrentElections = (props: any) => {
  return (
    <Paper>
      <Typography variant="h3" component="h3" gutterBottom>
        Current Elections
      </Typography>
      <hr />
      <ElectionCard {...instantiateCeleb()} />
      <ElectionCard
        {...{ ...instantiateCeleb(), pollsOpen: moment().add({ minutes: 3 }) }}
      />
      <ElectionCard
        {...{
          ...instantiateCeleb(),
          pollsClose: moment().subtract({ minutes: 7 })
        }}
      />
    </Paper>
  );
};

export default CurrentElections;
