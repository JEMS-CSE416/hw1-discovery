import {read} from "shapefile";
import {GeoJSON} from "geojson";

/*
  * Exported function that with convert specified file types into a
  * GeoJSON object
  */
export function geoJsonConvert(file: File){
  // contains characters after the '.' in a filename
  let fileSuffix = file.name.split('.').slice(-1)[0]; 

  // initialize fileInfo dict
  let fileInfo = {
    fileType : "",
    fileContent : ""
  }

  // Handling json, shp, kml and zip file
  if(fileSuffix === "json"){
    fileInfo.fileType = "json";
    fileInfo.fileContent = JSON.stringify(handleGeoJson(file));
  }else if(fileSuffix === "shp"){
    fileInfo.fileType = "shp";
    fileInfo.fileContent = JSON.stringify(handleShp(file));
  }else if(fileSuffix === "shp"){
    fileInfo.fileType = "shp";
    fileInfo.fileContent = JSON.stringify(handleZip(file));
  }else{
    throw new Error("CANNOT HANDLE UNEXPECTED FILETYPE");
  }
  
  return fileInfo;
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

async function handleZip(file: File): Promise<GeoJSON>{
  console.log("ERROR: ZIP UNHANDLED/UNDELETED");
  console.log("ERROR: ZIP UNHANDLED/UNDELETED");
  console.log("ERROR: ZIP UNHANDLED/UNDELETED");
  console.log("ERROR: ZIP UNHANDLED/UNDELETED");
  throw new Error("ERROR: ZIP UNHANDLED/UNDELETED");
}
