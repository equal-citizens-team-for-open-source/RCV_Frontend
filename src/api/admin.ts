import axios from "axios";
import { IElection } from "../types";
const SERVER_TEMP = "http://localhost:4000";
export const postCreateNewElection = async (
  electionData: IElection,
  electionCreator: string
) => {
  console.log({ electionData, electionCreator });
  const data: any = await axios({
    method: "post",
    url: `${SERVER_TEMP}/api/v1/elections/create`,
    data: { ...electionData, electionCreator }
  }).catch(console.warn);
  return data;
};
