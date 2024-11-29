import { MappingProjectData } from "@/types/api-types";
import tokml from "geojson-to-kml";


const swapElement = (arr: number[], pos1: number, pos2: number) => {
  const temp = arr[pos1]
  arr[pos1] = arr[pos2]
  arr[pos2] = temp
  return arr
}
 // construct coordinates for polygon of type [][][] from {long: , lat:}[] form field
 const constructCordinates = (
  coordinates: { longitude: number; latitude: number }[]
) => {
  
  const finalCordinates: any[] = [];
  let selObject: any[] = [];
  for (const coordinate of coordinates) {
    selObject.push(swapElement(Object.values(coordinate), 0, 1));
  }
  finalCordinates.push(selObject);
  return finalCordinates;
};

export const downloadGeoJSON = (
  coordinates: { longitude: number; latitude: number }[],
  name: string
) => {
  const geoJsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: constructCordinates(coordinates),
        },
        properties: {
          name: name,
          // area: surfaceArea,
          // image: image
        },
      },
    ],
  };

  const blob = new Blob([JSON.stringify(geoJsonData)], {
    type: "application/geo+json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = (name + ".geojson").replaceAll(" ", ""); // removes white space ithin the string
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

//DOWNLOAD SINGLE KML FILE
export function downlaodSingleKml(
  name: string,
  coordinates: { latitude: number; longitude: number }[]
) {

  const geoJsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: constructCordinates(coordinates),
        },
        properties: {
          name: name,
          // area: surfaceArea,
          // image: image
        },
      },
    ],
  };
  const resKml = tokml(geoJsonData);
  console.log(resKml)
  return resKml
   
}

// DOWNLOAD ALL KML FILES AS A SINGLE KML FILE
export async function downloadAllAskml(mappingDatas: MappingProjectData[]) {
  let mergedGeoJson: { type: string; features: any[] } = {
    type: "FeatureCollection",
    features: [],
  };

  let globalGeoJson = mappingDatas.map((data) => ({
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: constructCordinates(data.coordinates),
    },
    properties: {
      name: data.farmer_name,
    },
  }));
  mergedGeoJson["features"] = globalGeoJson;
  return tokml(mergedGeoJson);
};