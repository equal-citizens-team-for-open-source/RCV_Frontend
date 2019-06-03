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

const noop = () => null;

const useStyles = (placement: number) => {
  const candidateAvatar: {
    border: string;
    backgroundColor?: string;
    color?: string;
  } = {
    border: "2px solid #333333"
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
      candidateAvatar,
      upvote: {
        padding: "10px",
        margin: "2px",
        borderRadius: "10px",
        border: "1px solid #2acc4b",
        color: "#2acc4b",
        "&:hover": {
          color: "#FFFFFF",
          backgroundColor: "#2acc4b"
        }
      },
      downvote: {
        padding: "10px",
        margin: "2px",
        borderRadius: "10px",
        border: "1px solid #ce3f2f",
        color: "#ce3f2f",
        "&:hover": {
          color: "#FFFFFF",
          backgroundColor: "#ce3f2f"
        }
      }
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
        <div className="candidate__display">
          <Avatar
            className={`${classes.candidateAvatar} candidate__display__avatar`}
          >
            {placement + firstSecondThird(placement)}
          </Avatar>
          <div className="candidate__display__name">{name}</div>
        </div>
        <div className="candidate__alter">
          <div className="candidate__alter__vote">
            <ArrowUpwardIcon
              className={isFirst ? "vote__hidden" : classes.upvote}
              onClick={isFirst ? noop : increment}
            />
            <ArrowDownwardIcon
              className={isLast ? "vote__hidden" : classes.downvote}
              onClick={isLast ? noop : decrement}
            />
          </div>
          <div className="candidate__alter__delete">
            <RemoveButton onClick={onClick} />
          </div>
        </div>
      </Paper>
    );
  }
  return (
    <Paper className="candidate" onClick={onClick}>
      <div className="candidate__icon">
        <div className="iconlike">
          <span className={placement === 0 ? "hidden" : ""}>{placement}</span>
        </div>
      </div>
      <div className="candidate__name">{name}</div>
    </Paper>
  );
};

export default CandidateName;
