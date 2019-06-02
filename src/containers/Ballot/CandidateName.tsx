import React from "react";

import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const firstSecondThird = (num: number): string => {
  if (num % 10 === 1 && num !== 11) {
    return "st";
  }
  if (num % 10 === 2 && num !== 12) {
    return "nd";
  }
  if (num % 10 === 3 && num !== 13) {
    return "rd";
  }
  return "th";
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
  if (selected) {
    return (
      <div>
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
    <div>
      <div onClick={onClick}>
        <div>
          <CheckBoxOutlineBlankIcon />
        </div>
        <div>{name}</div>
      </div>
    </div>
  );
};

export default CandidateName;
