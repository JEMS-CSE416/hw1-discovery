import React from "react";
import { GeoJSON, MapContainer, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ReactLeafletKml from "react-leaflet-kml"; // react-leaflet-kml must be loaded AFTER react-leaflet
import { FileInfo } from "../utils/global_utils";
import { Feature, Geometry } from "geojson";

interface DisplayMapProps {
  fileInfo: FileInfo;
}

const DisplayMap: React.FC<DisplayMapProps> = ({ fileInfo }) => {
  if (fileInfo.fileType == "json") {
    if (fileInfo.fileContent) {
      console.log(JSON.parse(fileInfo.fileContent));
    }
  }

  const renderMap = () => {
    /* Render KML */
    if (fileInfo.fileType === "kml") {
      if (fileInfo.fileContent) {
        const kmlText = fileInfo.fileContent;
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, "text/xml");
        console.log("rendering KML....");
        return (
          // TO-DO:
          // - make center coordinates dynamic
          <MapContainer
            zoom={10}
            center={[39.7392, -104.9903]}
            style={{ width: "100vw", height: "900px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <ReactLeafletKml kml={kml} />
          </MapContainer>
        );
      }
    } else {
      /* Render GeoJSON */
      if (fileInfo.fileContent) {
        const geoJSON = JSON.parse(fileInfo.fileContent);

        // Retrieves country name of geoJSON clicked.
        // In the future more metadata can be added, but I think name suffices for this hw
        const createPopup = (feature: Feature<Geometry, any>) => {
          const countryName =
            typeof feature.properties.NAME_0 !== undefined
              ? feature.properties.NAME_0
              : feature.properties;
          return `<div><p>${countryName}</p></div>`;
        };

        return (
          <>
            <MapContainer
              center={[23.6978, 120.9605]}
              zoom={10}
              style={{ width: "100vw", height: "900px" }}
            >
              <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <GeoJSON
                data={geoJSON}
                onEachFeature={(feature, layer) => {
                  const popupContent = createPopup(feature);
                  layer.bindPopup(popupContent); // creates the ui popup
                }}
              />
            </MapContainer>
          </>
        );
      }
    }
  };

  return <>{renderMap()}</>;
};

export default DisplayMap;
