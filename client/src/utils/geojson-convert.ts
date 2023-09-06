import {read} from "shapefile";
import {GeoJSON} from "geojson";

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
    case "kml":
      return await handleKml(file);
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
async function handleGeoJson(file: File): Promise<GeoJSON>{
  return JSON.parse(await file.text()); //if already a geojson, handle itself
}

async function handleShp(file: File): Promise<GeoJSON>{
  return await read(await file.arrayBuffer()); // read is from the shapefile library
}

async function handleKml(file: File): Promise<GeoJSON>{
  // TODO: Jendy add your stuff here if it converts from kml to geojson.
  // otherwise, please delete me!
  console.log("ERROR: KML UNHANDLED/UNDELETED");
  console.log("ERROR: KML UNHANDLED/UNDELETED");
  console.log("ERROR: KML UNHANDLED/UNDELETED");
  console.log("ERROR: KML UNHANDLED/UNDELETED");
  throw new Error("ERROR: KML UNHANDLED/UNDELETED");
}

async function handleZip(file: File): Promise<GeoJSON>{
  console.log("ERROR: ZIP UNHANDLED/UNDELETED");
  console.log("ERROR: ZIP UNHANDLED/UNDELETED");
  console.log("ERROR: ZIP UNHANDLED/UNDELETED");
  console.log("ERROR: ZIP UNHANDLED/UNDELETED");
  throw new Error("ERROR: ZIP UNHANDLED/UNDELETED");
}
