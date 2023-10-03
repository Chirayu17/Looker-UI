import axios from "axios";
// TODO: Add Mocks for dev env
import mockResponse from "../mock/ChartResponse/S&PMeanVarianceResponse.json";
import { InterpretQueryResponse } from "../types/ApiResponse";

const apiEndpoint = "http://127.0.0.1:8000/";

const interpretQuery = async (
  query: string
): Promise<InterpretQueryResponse> => {
  const queryResponse = await axios.post(apiEndpoint + "final_response", {
    query,
  });
  console.log({ queryResponse });
  const queryResponseParsed = {
    ...queryResponse.data,
    resultData: JSON.parse(queryResponse.data["resultData"]),
  } as InterpretQueryResponse;
  return Promise.resolve(queryResponseParsed);
};
export default interpretQuery;


export const interpretQueryLooker = async (query: string) => {
  const response = await axios.post(apiEndpoint + "final_response", {
    query,
  });
  const lookerEmbedURL: string = response.data['embed_url'];
  return Promise.resolve(lookerEmbedURL);
};