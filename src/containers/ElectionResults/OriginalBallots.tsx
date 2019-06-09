import React from "react";
import sortBy from "lodash/sortBy";

type stvBallot = [string[], number];

const listFirstChoices = (ballots: stvBallot[]) => {
  const firsties: Set<string> = new Set();
  ballots.forEach(([list, _votes]: stvBallot) => {
    firsties.add(list[0]);
  });
  const keys = Array.from(firsties).sort();
  console.log(keys);
  return keys;
};

const OriginalBallots = ({ ballots }: any) => (
  <div>
    <div>{JSON.stringify(ballots)}</div>
    <hr />
    <div>{JSON.stringify(listFirstChoices(ballots))}</div>
  </div>
);

export default OriginalBallots;
