import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

interface IOutcome {
  candidate: string;
  action: string;
  seats: number;
  round: number;
  votesTransferred: number;
  changes: { [key: string]: number };
}
interface IRoundReport {
  round: number;
  results: { [key: string]: number };
  outcome: IOutcome[];
}
const VoteBarChart = ({ report }: { report: IRoundReport }) => {
  return (
    <BarChart
      width={500}
      height={300}
      data={[]}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" stackId="a" fill="#8884d8" />
      <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
    </BarChart>
  );
};

export default VoteBarChart;
