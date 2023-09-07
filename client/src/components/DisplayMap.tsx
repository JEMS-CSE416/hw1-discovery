import React from "react";
import { GeoJSON, MapContainer, TileLayer, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import ReactLeafletKml from 'react-leaflet-kml'; // react-leaflet-kml must be loaded AFTER react-leaflet
import { FileInfo } from "../utils/global_utils";

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
                const kml = parser.parseFromString(kmlText, 'text/xml');
                console.log("rendering KML....")
                return (
                    // TO-DO:
                    // - make center coordinates dynamic
                    <MapContainer zoom={10} center={[39.7392, -104.9903]} style={{ width: '100vw', height: '900px' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        <ReactLeafletKml kml={kml} />
                    </MapContainer>
                )
            }

        }
        /* Render GeoJSON */
        else {
            if (fileInfo.fileContent) {
                const geoJSON = JSON.parse(fileInfo.fileContent);
                let features = geoJSON["features"];
                return (
                    // TODO: add one popup for the entire outline for the name of the country/data; @sammi theres a prop called onEachFeature for geoJSON. you can look into that.
                    <>
                        <MapContainer center={[23.6978, 120.9605]} zoom={10} style={{ width: '100vw', height: '900px' }}>
                            <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                            <GeoJSON data={geoJSON}/>
                        </MapContainer>
                    </>
                )
            }
        }
    }

    return (
        <>
            {renderMap()}
        </>
    )
}

export default DisplayMap;
