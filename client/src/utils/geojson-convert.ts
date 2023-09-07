import { read } from "shapefile";
import { GeoJSON } from "geojson";
import * as fs from 'fs';
import * as toGeoJSON from '@tmcw/togeojson';

/*
  * Exported function that with convert specified file types into a
  * GeoJSON object
  */
export async function geoJsonConvert(file: File): Promise<GeoJSON> {
  // contains characters after the '.' in a filename
  let fileSuffix = file.name.split('.').slice(-1)[0]; 

  switch(fileSuffix){
    // Handling json, shp, kml and zip file
    case "json":
      return await handleGeoJson(file);
    case "shp":
      return await handleShp(file);
    case "zip":
      return await handleZip(file);

    // Error cases
    case file.name:
      throw new Error("CANNOT HANDLE UNSPECIFIED FILETYPE");
    default:
      throw new Error("UNEXPECTED FILETYPE");
  }
}

/*
  * Case by Case handler functions
  */
async function handleGeoJson(file: File): Promise<GeoJSON> {
  return JSON.parse(await file.text()); //if already a geojson, handle itself
}

async function handleShp(file: File): Promise<GeoJSON> {
  return await read(await file.arrayBuffer()); // read is from the shapefile library
}

export async function readFileContent(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    // read the file as text
    reader.readAsText(file);

    reader.onload = (event) => {
      if (event.target) {
        const fileContent = event.target.result as string;
        // indicates that the asynch file reading is completed & provides fileContent as Promise result
        resolve(fileContent);
      }
    };
    
    // sets up handler when error while reading
    reader.onerror = (event) => {
      // reject Promise with error
      reject(new Error('Error reading file: ' + event.target?.error));
    };
    
  });
}

export async function handleKml(file: File): Promise<any> {
  try {
    // Read the KML file as text.
    let kmlText = await readFileContent(file);
    const parser = new DOMParser();
    const kmlData = parser.parseFromString(kmlText, 'text/xml');

    // Parse the KML data to GeoJSON using togeojson.
    const geoJSON = toGeoJSON.kml(kmlData);
    console.log(geoJSON)

    // Return the GeoJSON object.
    return geoJSON;
  } catch (error) {
    console.error('Error handling KML:', error);
    throw error;
  }
}

async function handleZip(file: File): Promise<GeoJSON> {
  console.log("ERROR: ZIP UNHANDLED/UNDELETED");
  console.log("ERROR: ZIP UNHANDLED/UNDELETED");
  console.log("ERROR: ZIP UNHANDLED/UNDELETED");
  console.log("ERROR: ZIP UNHANDLED/UNDELETED");
  throw new Error("ERROR: ZIP UNHANDLED/UNDELETED");
}
