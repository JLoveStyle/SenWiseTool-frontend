import { MappingProjectData } from "@/types/api-types";
import tokml from "geojson-to-kml";


 // construct coordinates for polygon of type [][][] from {long: , lat:}[] form field
 const constructCordinates = (
  coordinates: { longitude: number; latitude: number }[]
) => {
  const finalCordinates: any[] = [];
  let selObject: any[] = [];
  for (const coordinate of coordinates) {
    selObject.push(Object.values(coordinate));
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
  console.log("hello");

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
  return tokml(geoJsonData);
   
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
  console.log("globalGeoJson", globalGeoJson);
  mergedGeoJson["features"] = globalGeoJson;
  console.log("Merged geojson\n =>", mergedGeoJson);
  return tokml(mergedGeoJson);
};