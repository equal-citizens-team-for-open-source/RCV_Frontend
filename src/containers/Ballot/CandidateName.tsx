import React from "react";

import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import Paper from "@material-ui/core/Paper";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { firstSecondThird } from "./index";

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
  if (selected) {
    return (
      <div className="candidate__selected">
        <Chip
          icon={<DoneIcon />}
          color="primary"
          variant="outlined"
          label={`${placement + firstSecondThird(placement)} CHOICE`}
        />
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
      </div>
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
