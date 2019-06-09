import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#FFBB28", "#FF8042"];

interface IDisplayChart {
  totalVotes: number;
  parentVotes: number;
  votes: number;
  candidate: string;
  chain: string[];
}
const DisplayChart = ({
  totalVotes,
  parentVotes,
  votes,
  candidate,
  chain
}: IDisplayChart) => {
  const inner = [
    { name: candidate, value: votes },
    { name: "All Voters", value: totalVotes - votes }
  ];
  const outer = [
    { name: candidate, value: votes },
    { name: `${chain.join("/")} Voters`, value: parentVotes - votes }
  ];
  return (
    <div>
      <PieChart width={300} height={300}>
        <Pie
          data={inner}
          dataKey="value"
          cx={150}
          cy={150}
          outerRadius={chain.length ? 60 : 90}
          fill="#0a8476"
          label={!chain.length}
        >
          {inner.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        {chain.length ? (
          <Pie
            data={outer}
            dataKey="value"
            cx={150}
            cy={150}
            innerRadius={70}
            outerRadius={90}
            fill="#0a6384"
            label
          >
            {outer.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        ) : null}
      </PieChart>
    </div>
  );
};

export default DisplayChart;
