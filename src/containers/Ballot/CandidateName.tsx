import React from "react";

import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

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
interface ICandidateNameProps {
  name: string;
  placement: number;
  onClick: (...p: any[]) => any;
}
const CandidateName = ({ name, placement, onClick }: ICandidateNameProps) => {
  return (
    <div>
      <Chip
        avatar={<Avatar>{placement + firstSecondThird(placement)}</Avatar>}
        label={name}
        clickable
        onClick={onClick}
        color="primary"
        variant="outlined"
      />
    </div>
  );
};

export default CandidateName;
