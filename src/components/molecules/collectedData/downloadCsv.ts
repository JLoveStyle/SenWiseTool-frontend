import { InspectionDataPops, MappingProjectData } from "@/types/api-types";
import xlsx, { IJsonSheet } from "json-as-xlsx";


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
export function downloadInspectionDataAsCsv (mappingDatas: any[], incomingData: InspectionDataPops[]) {
  console.log(incomingData)

  const allData: any[] = []

  for (const item of incomingData) {
    allData.push(item.project_data.project_data.metaData)
  }
  
  const columns: IJsonSheet[] = [
    {
      sheet: "Inspection data",
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
      content: mappingDatas as any[]
    }
  ]

  // xlsx(columns, {
  //   fileName: "Inspection_data_of_single_project",
  //   extraLength: 3,
  //   writeMode: "writeFile"
  // })
}