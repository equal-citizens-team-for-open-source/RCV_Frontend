import React from "react";

import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { firstSecondThird } from "./index";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = (placement: number) => {
  const candidateAvatar: {
    border: string;
    backgroundColor?: string;
    color?: string;
  } = {
    border: "2px solid black"
  };
  if (placement === 1) {
    candidateAvatar.backgroundColor = "#75B0FF";
    candidateAvatar.color = "#FFFFFF";
  } else if (placement === 2) {
    candidateAvatar.backgroundColor = "#ff877a";
    candidateAvatar.color = "#FFFFFF";
  } else if (placement === 3) {
    candidateAvatar.backgroundColor = "#ffffff";
    candidateAvatar.color = "#222222";
  } else {
    candidateAvatar.backgroundColor = "#888888";
    candidateAvatar.color = "#FFFFFF";
  }
  return makeStyles(
    createStyles({
      candidateAvatar
    })
  );
};

const RemoveButton = ({ onClick }: { onClick: (...p: any[]) => any }) => {
  return (
    <Button onClick={onClick} variant="contained" color="secondary">
      Remove
      <RemoveCircleOutlineIcon />
    </Button>
  );
};

interface ICandidateNameProps {
  name: string;
  placement: number;
  selected: boolean;
  onClick: (...p: any[]) => any;
  isFirst?: boolean;
  isLast?: boolean;
  increment?: (...p: any[]) => any;
  decrement?: (...p: any[]) => any;
}

const CandidateName = ({
  name,
  placement,
  onClick,
  selected,
  increment,
  decrement,
  isFirst,
  isLast
}: ICandidateNameProps) => {
  const classes = useStyles(placement)();
  if (selected) {
    return (
      <Paper className="candidate__selected">
        <Avatar className={classes.candidateAvatar}>
          {placement + firstSecondThird(placement)}
        </Avatar>
        <Button
          disabled={isFirst}
          onClick={increment}
          variant="contained"
          color="primary"
        >
          <ArrowUpwardIcon />
        </Button>
        <Button
          disabled={isLast}
          onClick={decrement}
          variant="contained"
          color="primary"
        >
          <ArrowDownwardIcon />
        </Button>
        <div>{name}</div>
        <RemoveButton onClick={onClick} />
      </Paper>
    );
  }
  return (
    <Paper className="candidate" onClick={onClick}>
      <div className="candidate__icon">
        <CheckBoxOutlineBlankIcon />
      </div>
      <div className="candidate__name">{name}</div>
    </Paper>
  );
};

export default CandidateName;
