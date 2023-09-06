import React from "react";
import {GeoJSON} from "geojson";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import ReactLeafletKml from 'react-leaflet-kml'; // react-leaflet-kml must be loaded AFTER react-leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

interface DisplayMapProps {
    fileType: string;
    fileContent: string;
}

const DisplayMap: React.FC<DisplayMapProps> = ({ fileType, fileContent }) => {
    //JSON.parse(fileContent)["geometries"]
    console.log(fileContent);
    
    const renderMap = () => {
        if(fileType === "kml"){
            const kmlText = fileContent;
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmlText, 'text/xml');
            console.log("rendering KML....")
            return (
                // TO-DO:
                // - make center coordinates dynamic
                <MapContainer zoom={10} center={[39.7392, -104.9903]} style={{width:'100vw',height:'900px'}}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <ReactLeafletKml kml={kml} />
                </MapContainer>
            )
        }else{
            return (
                <>
                <MapContainer center={[51.505, -0.09]} zoom={10} style={{width:'100vw',height:'900px'}}>
                    <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
                </MapContainer>
                </>
            )
        }
    }

    return (
        <>
            {renderMap()}
        </>
    )
}

export default DisplayMap;
