import { IElectionTree, stvBallot } from "../../types";

const createLeaf = (
  parent: IElectionTree = {},
  [candidates, votes]: stvBallot,
  level: number = 0
): IElectionTree => {
  const head: string = candidates[0];
  const tail: string[] = candidates.slice(1);
  if (!parent[head]) {
    parent[head] = {
      candidate: head,
      votes,
      level
    };
  } else {
    parent[head].votes += votes;
  }
  if (tail.length > 0) {
    if (!parent[head].children) {
      parent[head].children = createLeaf({}, [tail, votes], level + 1);
    } else {
      parent[head].children = {
        ...parent[head].children,
        ...createLeaf(parent[head].children, [tail, votes], level + 1)
      };
    }
  }
  return parent;
};

const makeElectionTree = (ballots: stvBallot[]) =>
  ballots.reduce(
    (prevBallots: IElectionTree, currBallot: stvBallot) =>
      createLeaf(prevBallots, currBallot, 0),
    {}
  );

export const electionTreeToArray = (electionTree: IElectionTree): any[] => {
  return Object.values(electionTree).map((leaf: any) => {
    if (leaf.children) {
      return { ...leaf, children: electionTreeToArray(leaf.children) };
    }
    return leaf;
  });
};

export default makeElectionTree;
