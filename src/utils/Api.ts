import { InterpretQueryResponse } from "../types/ApiResponse";

export function getDatasets(responseData: InterpretQueryResponse) {
  // TODO: Change type from any to type which Chart.js requires, (either define it, or take from their type file)

  const datasets: Array<any> = [];
  if (responseData.attributes.groupby) {
    const groupBy = responseData.attributes.groupby;

    // Get all diffrent groupby values
    const groupSet = new Set();
    responseData.resultData.forEach((data) => groupSet.add(data[groupBy]));
    const groupList = Array.from(groupSet);

    // Make dataset for each group
    groupList.forEach((groupName) => {
      const dataForGroup = responseData.resultData.filter(
        (data) => data[groupBy] === groupName
      );
      datasets.push({
        label: groupName,
        data: dataForGroup,
      });
    });
  } else
    datasets.push({
      label: "",
      data: responseData.resultData,
    });
  return datasets;
}
