import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import firstSecondThird from "../../util/firstSecondThird";
import get from "lodash/get";
import DisplayChart from "./DisplayChart";

const darknessLevel = (level: number): string => {
  return `rgba(26, 74, 153, ${Math.min(0.3, (level + 1) * 0.07)})`;
};

const LeafDisplay = ({
  leaf,
  chain,
  votesInTotal,
  parentVotes
}: {
  leaf: any;
  chain: string[];
  votesInTotal: number;
  parentVotes: number;
}) => (
  <div>
    <ExpansionPanel style={{ backgroundColor: darknessLevel(chain.length) }}>
      <ExpansionPanelSummary
        expandIcon={
          get(leaf, "children", []).length > 0 ? <ExpandMoreIcon /> : null
        }
        aria-controls="leaf-content"
        id="leaf-header"
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <Typography>
              {leaf.candidate} was the {leaf.level + 1}
              {firstSecondThird(leaf.level + 1)} choice for {leaf.votes} voters{" "}
            </Typography>

            {chain.length > 0 ? (
              <div>
                <Typography>
                  ...who preferred {chain.join(", then ")}
                </Typography>
              </div>
            ) : null}
            <div>
              <Typography>
                {((leaf.votes / votesInTotal) * 100).toFixed(2)}% of all voters
                voted this way
              </Typography>
              {chain.length > 0 ? (
                <div>
                  <Typography>
                    and of those who preferred {chain.join(", then ")},{" "}
                    {((leaf.votes / parentVotes) * 100).toFixed(2)}% made{" "}
                    {leaf.candidate} their next choice
                  </Typography>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </ExpansionPanelSummary>

      {get(leaf, "children", []).length > 0 ? (
        <ExpansionPanelDetails style={{ display: "block" }}>
          {leaf.children.map((child: any) => (
            <div
              style={{ display: "flex", flexDirection: "column" }}
              key={JSON.stringify(child)}
            >
              <LeafDisplay
                leaf={child}
                votesInTotal={votesInTotal}
                parentVotes={leaf.votes}
                chain={chain.concat(leaf.candidate)}
                key={JSON.stringify(child)}
              />
            </div>
          ))}
        </ExpansionPanelDetails>
      ) : null}
    </ExpansionPanel>
  </div>
);

export default LeafDisplay;
