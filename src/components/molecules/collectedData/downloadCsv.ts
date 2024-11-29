import { InspectionDataPops, MappingProjectData } from "@/types/api-types";
import dayjs from "dayjs";
import xlsx, { IJsonSheet } from "json-as-xlsx";

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

// DOWNLOAD ALL INSPECTION DATA OF SINGLE PROJECT
export function downloadInspectionDataAsCsv(mappingDatas: any[], incomingData: InspectionDataPops[]) {

  /*
   we need to flatten the data and structure it appropriately. The data has multiple levels with different arrays (like nonConformityRecom, requirements, and metaData). We can create different sheets for each part of the data and structure them accordingly.

    We will create 4 sheets in the Excel file:
    1.Inspection Conclusions: Contains nextYearRecom, agent_signature, and farmer_signature.
    2. Metadata: Contains information about the farmer, inspector, and other related data.
    3. Non-Conformity Recommendations: Contains comment, deadline, and req_number.
    4. Requirements: Contains status, comment, and req_number.
  */

  // flatten data and structure it appropriately
  const formatedData: ExcellDataType[] = []

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

  console.log("formatedData", formatedData)

  /*

  // Create an array to hold the formatted rows for Excel
  const excelData: {
    nonConformity_comment?: string;
    nonConformity_deadline?: string;
    nonConformity_req_number?: string;
    farmer_name: any;
    farmer_contact: any;
    village: any;
    inspector_name: any;
    pesticide_used: any;
    weed_application: any;
    nextYearRecom: any;
    agent_signature: any;
    farmer_signature: any;
    inspection_date: any;
    requirement_status?: string;
    requirement_comment?: string;
    requirement_req_number?: string;
  }[] = [];

  // Loop through each person's record
  formatedData.forEach((person: ExcellDataType) => {
    // Extract metadata and inspection conclusions
    const { metaData, inspectionConclusions, nonConformityRecom, requirements } = person;

    // Create a base object with metadata and inspection conclusions
    const baseData = {
      farmer_name: metaData.farmer_name,
      farmer_contact: metaData.farmer_contact,
      village: metaData.village,
      inspector_name: metaData.inspector_name,
      pesticide_used: metaData.pesticide_used,
      weed_application: metaData.weed_application,
      nextYearRecom: inspectionConclusions.nextYearRecom,
      agent_signature: inspectionConclusions.agent_signature,
      farmer_signature: inspectionConclusions.farmer_signature,
      inspection_date: metaData.inspection_date
    };

    // Add non-conformity recommendations for this person
    nonConformityRecom.forEach((nc, index) => {
      // Add unique columns for each non-conformity (comment, deadline, req_number)
      const ncData = { ...baseData, nonConformity_comment: nc.comment, nonConformity_deadline: nc.deadline, nonConformity_req_number: nc.req_number || 'N/A' };
      excelData.push(ncData);
    });

    // Add requirements for this person
    requirements.forEach((req, index) => {
      // Add unique columns for each requirement (status, comment, req_number)
      const reqData = { ...baseData, requirement_status: req.status, requirement_comment: req.comment, requirement_req_number: req.req_number };
      excelData.push(reqData);
    });
  });

  // Convert the data into a worksheet
  const ws = XLSX.utils.json_to_sheet(excelData);

  // Create a new workbook and append the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Inspection Report");

  // Write the Excel file to disk
  XLSX.writeFile(wb, 'Inspection_Report.xlsx');

  */

  /*

  // Flattened data for the Inspection Conclusions sheet
  const inspectionConclusions = formatedData.map(item => ({
    nextYearRecom: item.inspectionConclusions.nextYearRecom,
    agent_signature: item.inspectionConclusions.agent_signature,
    farmer_signature: item.inspectionConclusions.farmer_signature
  }));

  // Flattened data for the Metadata sheet
  const metadata = formatedData.map(item => ({
    village: item.metaData.village,
    farmer_name: item.metaData.farmer_name,
    farmer_contact: item.metaData.farmer_contact,
    inspector_name: item.metaData.inspector_name,
    pesticide_used: item.metaData.pesticide_used,
    weed_application: item.metaData.weed_application,
    inspection_date: dayjs(item.metaData.inspection_date),
    inspector_contact: item.metaData.inspector_contact,
    certification_year: item.metaData.certification_year,
    farmer_ID_card_number: item.metaData.farmer_ID_card_number,
    farmer_photos: item.metaData.farmer_photos[0],
  }));

  // Flattened data for the Non-Conformity Recommendations sheet
  const nonConformityRecom = formatedData.flatMap(item => item.nonConformityRecom.map(nc => ({
    comment: nc.comment,
    deadline: nc.deadline,
    req_number: nc.req_number || 'N/A'
  })));

  // Flattened data for the Requirements sheet
  const requirements = formatedData.flatMap(item => item.requirements.map(req => ({
    status: req.status,
    comment: req.comment,
    req_number: req.req_number
  })));

  console.log({ inspectionConclusions, metadata, nonConformityRecom, requirements })

  // Create workbook
  const wb = XLSX.utils.book_new();

  // Add Inspection Conclusions sheet
  const inspectionConclusionsSheet = XLSX.utils.json_to_sheet(inspectionConclusions);
  XLSX.utils.book_append_sheet(wb, inspectionConclusionsSheet, "Inspection Conclusions");

  // Add Metadata sheet
  const metadataSheet = XLSX.utils.json_to_sheet(metadata);
  XLSX.utils.book_append_sheet(wb, metadataSheet, "Metadata");

  // Add Non-Conformity Recommendations sheet
  const nonConformityRecomSheet = XLSX.utils.json_to_sheet(nonConformityRecom);
  XLSX.utils.book_append_sheet(wb, nonConformityRecomSheet, "Non-Conformity Recommendations");

  // Add Requirements sheet
  const requirementsSheet = XLSX.utils.json_to_sheet(requirements);
  XLSX.utils.book_append_sheet(wb, requirementsSheet, "Requirements");

  // Write to a file
  XLSX.writeFile(wb, 'project_Inspection_Report.xlsx');

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