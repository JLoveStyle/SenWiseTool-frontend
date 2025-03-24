import { InspectionDataPops, MappingProjectData } from "@/types/api-types";
import dayjs from "dayjs";
import xlsx, { IJsonSheet } from "json-as-xlsx";
import { stringify } from "querystring";

// import XLSX from "xlsx"
const XLSX = require('xlsx');



interface ExcellDataType {
  inspectionConclusions: any,
  metaData: any,
  nonConformityRecom: { comment: string, deadline: string, req_number: string }[], requirements: { status: string, comment: string, req_number: string }[]
}

// Download excel sheet (All inspection data)

// Download excell sheet (mapping data)
export const mappingCsvDownload = (mappingData: any[], coordinates: any[]) => {
  // COLUMNS FOR EXCELL SHEET
  const columns: IJsonSheet[] = [
    {
      sheet: "Données_Mapping",
      columns: [
        {
          label: "Nom du producteur",
          value: "farmer_name",
        },
        {
          label: "Contact du planteur",
          value: "farmer_contact",
        },

        {
          label: "statut du producteur",
          value: "farmer_status",
        },
        {
          label: "N° CNI",
          value: "farmer_ID_card_number",
        },
        {
          label: "Date de creation de la plantation",
          value: "plantation_creation_date",
        },
        {
          label: "Village",
          value: "village",
        },
        {
          label: "Nom du mappeur",
          value: "collector_name",
        },
        {
          label: "Date",
          value: "date",
        },
        {
          label: "Superficie estimé",
          value: "estimated_area",
        },
        {
          label: "Photo de la plantation",
          value: "plantation_photos[0]",
        },
        {
          label: "Photo planteur",
          value: "farmer_photos[0]",
        },
        {
          label: "Coordonées",
          value: "coordinates",
        },
      ],
      content: mappingData as any[],
    },
  ];

  const cordinateColumns: IJsonSheet[] = [
    {
      sheet: "Farm_cordinates",
      columns: [
        {
          label: "Longitude",
          value: "longitude",
        },
        {
          label: "Latitude",
          value: "latitude",
        },
      ],
      content: coordinates.flat(),
    },
  ];

  const settings = {
    fileName: "Mapping_data", // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
  };

  xlsx(columns, settings);
  xlsx(cordinateColumns, {
    fileName: "Mapping_coordinates",
    extraLength: 3,
    writeMode: "writeFile",
  });
};


type NestedObject = { [key: string]: any }
// FLATTEN COMPLEX AND NESTED OBJECT
function flattenObject(obj: NestedObject, parentKey: string = '', result: NestedObject = {}): NestedObject {
  // Iterate over each key in the object
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key; // Construct new key

      // If the value is an object (but not an array), recurse into it
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
        flattenObject(obj[key], newKey, result);
      }
      // If the value is an array, handle each element
      else if (Array.isArray(obj[key])) {
        obj[key].forEach((item, index) => {
          // If the item is an object, recurse into it and add the index to the key
          if (typeof item === 'object' && item !== null) {
            flattenObject(item, `${newKey}[${index}]`, result);
          } else {
            // If it's not an object, directly assign it to the result with the index
            result[`${newKey}[${index}]`] = item;
          }
        });
      }
      // If the value is a primitive type, just add it to the result object
      else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}

const generateExcel = (data: ExcellDataType[]): void => {
  const sheetData: any[] = [];

  let requirementHead: string[] = []
  for (const item of data[0].requirements) {
    requirementHead.push(Object.keys(item) as unknown as string)
  }

  const flat = data[0].requirements.map((item: { status: string, req_number: string, comment: string }) => Object.values(item))

  // Adding headers to the sheet
  const headers = [
    'Farmer Name',
    'Farmer ID',
    'Farmer Contact',
    'Inspection Date',
    'Inspector Contact',
    'Inspector Name',
    'Farmer Photos',
    'Certification Year',
    'Pesticide Quantity (kg/ha)',
    'Pesticide Used',
    'Village',
    'Weed Application',
    'Weed Application Quantity',
    'Agent Signature',
    'Farmer Signature',
    'Next Year Recommendations',
    'Non-Conformity Comments',
    'Non-Conformity Deadlines',
    'Non-Conformity Requirement Numbers',
    // 'Requirement Comments',
    // 'Requirement Status',
    // 'Requirement Numbers',
  ];

  let finalHeader = headers.concat(requirementHead.flat())

  // Add data rows
  data.forEach((item) => {
    const row: any[] = [
      item.metaData.farmer_name,
      item.metaData.farmer_ID_card_number,
      item.metaData.farmer_contact,
      item.metaData.inspection_date,
      item.metaData.inspector_contact,
      item.metaData.inspector_name,
      item.metaData.farmer_photos.join(', '), // Concatenate multiple photos
      item.metaData.certification_year,
      item.metaData.pesticide_quantity,
      item.metaData.pesticide_used,
      item.metaData.village,
      item.metaData.weed_application,
      item.metaData.weed_application_quantity,
      item.inspectionConclusions.agent_signature,
      item.inspectionConclusions.farmer_signature,
      item.inspectionConclusions.nextYearRecom,
      item.nonConformityRecom.map((nc: { comment: string; }) => nc.comment).join(', '), // Concatenate comments
      item.nonConformityRecom.map((nc: { deadline: string }) => nc.deadline).join(', '), // Concatenate deadlines
      item.nonConformityRecom.map((nc: { req_number: string }) => nc.req_number).join(', '), // Concatenate requirement numbers
      item.requirements.map((item: { status: string, req_number: string, comment: string }) => Object.values(item)).flat().map((req) => req)

      // item.requirements.map((req: { comment: string; }) => req.comment).join(', '), // Concatenate comments
      // item.requirements.map((req: { status: string; }) => req.status).join(', '), // Concatenate statuses
      // item.requirements.map((req: { req_number: string; }) => req.req_number).join(', ') // Concatenate requirement numbers
    ];

    sheetData.push(row);
  });

  // Create worksheet from data
  const ws = XLSX.utils.aoa_to_sheet([finalHeader, ...sheetData]);

  // Create workbook from worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Inspection Data');

  // Write Excel file and trigger download
  XLSX.writeFile(wb, 'Inspection_Data.xlsx');
};

// DOWNLOAD ALL INSPECTION DATA OF SINGLE PROJECT
export function downloadInspectionDataAsCsv(mappingDatas: any[], incomingData: InspectionDataPops[]) {

  // FIRST CSV
  // flatten data and structure it appropriately
  let formatedData: ExcellDataType[] = [] 

  let record: ExcellDataType = {
    inspectionConclusions: {},
    metaData: {},
    nonConformityRecom: [],
    requirements: []
  }

  for (const item of incomingData) {
    record["inspectionConclusions"] = item.project_data.project_data.inspectionConclusions.metadata
    record["metaData"] = item.project_data.project_data.metaData
    record["nonConformityRecom"] = item.project_data.project_data.inspectionConclusions.nonConformityRecom
    record["requirements"] = item.project_data.project_data.requirements

    formatedData.push(record)

    record = {
      inspectionConclusions: {},
      metaData: {},
      nonConformityRecom: [],
      requirements: []
    }
  }

  // Trigger Excel file generation
  generateExcel(formatedData);



  let data = []
  for (const item of incomingData) {
    data.push(flattenObject(item))
  }

  /*
   we need to flatten the data and structure it appropriately. The data has multiple levels with different arrays (like nonConformityRecom, requirements, and metaData). We can create different sheets for each part of the data and structure them accordingly.

    We will create 4 sheets in the Excel file:
    1.Inspection Conclusions: Contains nextYearRecom, agent_signature, and farmer_signature.
    2. Metadata: Contains information about the farmer, inspector, and other related data.
    3. Non-Conformity Recommendations: Contains comment, deadline, and req_number.
    4. Requirements: Contains status, comment, and req_number.
  */

  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Function to format and create a worksheet for each record
  formatedData.forEach((record, index) => {
    // Create a worksheet for the current record
    const ws_data = [];

    // Add Metadata (Farmer info, etc.)
    ws_data.push(["Metadata"]);
    ws_data.push(["Farmer Name", record.metaData.farmer_name]);
    ws_data.push(["Farmer Contact", record.metaData.farmer_contact]);
    ws_data.push(["Farmer ID card", record.metaData.farmer_ID_card_number]);
    ws_data.push(["Farmer picture", record.metaData.farmer_photos[0]]);
    ws_data.push(["Certification year", record.metaData.certification_year]);
    ws_data.push(["Village", record.metaData.village]);
    ws_data.push(["Certification year", record.metaData.certification_year]);
    ws_data.push(["Inspector Name", record.metaData.inspector_name]);
    ws_data.push(["Pesticide Quantity (kg/ha)", record.metaData.pesticide_quantity]);
    ws_data.push(["Pesticide Used", record.metaData.pesticide_used]);
    ws_data.push(["Weed Application", record.metaData.weed_application]);
    ws_data.push(["Weed Application Quantity (kg/ha)", record.metaData.weed_application_quantity]);
    ws_data.push([""]);

    // Add Inspection Recommendations (Next year recommendation, signatures, etc.)
    ws_data.push(["Inspection Recommendations"]);
    ws_data.push(["Next Year Recommendation", record.inspectionConclusions.nextYearRecom]);
    ws_data.push(["Agent Signature", record.inspectionConclusions.agent_signature]);
    ws_data.push(["Farmer Signature", record.inspectionConclusions.farmer_signature]);
    ws_data.push([""]);

    // Add Non-Conformity Recommendations
    ws_data.push(["Non-Conformity Recommendations"]);
    record.nonConformityRecom.forEach((item, i) => {
      ws_data.push([`Item ${i + 1}`, item.comment, item.deadline, item.req_number || "N/A"]);
    });
    ws_data.push([""]);

    // Add Requirements (Status, Comment, Req Number)
    ws_data.push(["Requirements"]);
    record.requirements.forEach((item, i) => {
      ws_data.push([item.req_number, item.status, item.comment]);
    });

    // Skip a row before the next record
    ws_data.push([""]);

    // Create the worksheet
    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, `Record ${index + 1}`);
  });

  // Write the workbook to a file
  XLSX.writeFile(wb, "output.xlsx");

}