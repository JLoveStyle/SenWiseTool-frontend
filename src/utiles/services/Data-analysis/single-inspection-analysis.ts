import { InspectionDataPops, InspectionDataType } from "@/types/api-types";
import { LOCAL_STORAGE } from "../storage";

export const handleAnalysis = (
  datas: {
    req_number: string;
    status: string;
    comment: string;
  }[]
) => {
  let resultTable = [];

  let result: InspectionDataType = {
    total_A: datas.length,
    chapter1: {
      C: 0,
      NC: 0,
      NA: 0,
      TA: 0
    },
    chapter2: {
      C: 0,
      NC: 0,
      NA: 0,
      TA: 0
    },
    chapter3: {
      C: 0,
      NC: 0,
      NA: 0,
      TA: 0
    },
    chapter4: {
      C: 0,
      NC: 0,
      NA: 0,
      TA: 0
    },
    chapter5: {
      C: 0,
      NC: 0,
      NA: 0,
      TA: 0
    },
    chapter6: {
      C: 0,
      NC: 0,
      NA: 0,
      TA: 0
    },
  };

  for (const data of datas) {
    if (data.req_number.slice(0, 1) === "1") {
      result['chapter1'].TA += 1
      if (data.status === "C") result["chapter1"].C++;
      else if (data.status === "NC") result["chapter1"].NC++;
      else if (data.status === "NA") result["chapter1"].NA++;
    }
    if (data.req_number.slice(0, 1) === "2") {
      result['chapter2'].TA += 1
      if (data.status === "C") result["chapter2"].C++;
      else if (data.status === "NC") result["chapter2"].NC++;
      else if (data.status === "NA") result["chapter2"].NA++;
    }
    if (data.req_number.slice(0, 1) === "3") {
      result['chapter3'].TA += 1
      if (data.status === "C") result["chapter3"].C++;
      else if (data.status === "NC") result["chapter3"].NC++;
      else if (data.status === "NA") result["chapter3"].NA++;
    }
    if (data.req_number.slice(0, 1) === "4") {
      result['chapter4'].TA += 1
      if (data.status === "C") result["chapter4"].C++;
      else if (data.status === "NC") result["chapter4"].NC++;
      else if (data.status === "NA") result["chapter4"].NA++;
    }
    if (data.req_number.slice(0, 1) === "5") {
      result['chapter5'].TA += 1
      if (data.status === "C") result["chapter5"].C++;
      else if (data.status === "NC") result["chapter5"].NC++;
      else if (data.status === "NA") result["chapter5"].NA++;
    }
    if (data.req_number.slice(0, 1) === "6") {
      result['chapter6'].TA += 1
      if (data.status === "C") result["chapter6"].C++;
      else if (data.status === "NC") result["chapter6"].NC++;
      else if (data.status === "NA") result["chapter6"].NA++;
    }
  }


  LOCAL_STORAGE.save("insection-data", result);
  let returnedValue = { ...result };

  // reset result at the end of the operation
  result = {
    total_A: datas.length,
    chapter1: {
      C: 0,
      NC: 0,
      NA: 0,
      TA: 0
    },
    chapter2: {
      C: 0,
      NC: 0,
      NA: 0,
      TA: 0
    },
    chapter3: {
      C: 0,
      NC: 0,
      NA: 0,
      TA: 0
    },
    chapter4: {
      C: 0,
      NC: 0,
      NA: 0,
      TA: 0
    },
    chapter5: {
      C: 0,
      NC: 0,
      NA: 0,
      TA: 0
    },
    chapter6: {
      C: 0,
      NC: 0,
      NA: 0,
      TA: 0
    },
  };
  return returnedValue;
};

export const overallStatistics = (data: InspectionDataPops[]) => {

  let overAllResults: InspectionDataType[] = []
  let total: InspectionDataType = {
    chapter1: { C: 0, NC: 0, NA: 0, TA: 0 },
    chapter2: { C: 0, NC: 0, NA: 0, TA: 0 },
    chapter3: { C: 0, NC: 0, NA: 0,TA: 0 },
    chapter4: { C: 0, NC: 0, NA: 0, TA: 0 },
    chapter5: { C: 0, NC: 0, NA: 0, TA: 0 },
    chapter6: { C: 0, NC: 0, NA: 0, TA: 0 },
    total_A: 0
  }

  for (const item of data) {
    overAllResults.push(
      handleAnalysis(item.project_data.project_data.requirements)
    );
  }

  for (const item of overAllResults) {
    total['chapter1'].C += item.chapter1.C
    total['chapter1'].NC += item.chapter1.NC
    total['chapter1'].NA += item.chapter1.NA
    total['chapter1'].TA += item.chapter1.TA
    total['chapter2'].C += item.chapter2.C
    total['chapter2'].NC += item.chapter2.NC
    total['chapter2'].NA += item.chapter2.NA
    total['chapter2'].TA += item.chapter2.TA
    total['chapter3'].C += item.chapter3.C
    total['chapter3'].NC += item.chapter3.NC
    total['chapter3'].NA += item.chapter3.NA
    total['chapter3'].TA += item.chapter3.TA
    total['chapter4'].C += item.chapter4.C
    total['chapter4'].NC += item.chapter4.NC
    total['chapter4'].NA += item.chapter4.NA
    total['chapter4'].TA += item.chapter4.TA
    total['chapter5'].C += item.chapter5.C
    total['chapter5'].NC += item.chapter5.NC
    total['chapter5'].NA += item.chapter5.NA
    total['chapter5'].TA += item.chapter5.TA
    total['chapter6'].C += item.chapter6.C
    total['chapter6'].NC += item.chapter6.NC
    total['chapter6'].NA += item.chapter6.NA
    total['chapter6'].TA += item.chapter6.TA
  }
  if (overAllResults.length) total['total_A'] = overAllResults[0].total_A
  else total['total_A'] = 1
  return total
};