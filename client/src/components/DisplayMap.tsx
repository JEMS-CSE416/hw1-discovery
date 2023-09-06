import React from "react";
import {GeoJSON} from "geojson";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"

interface DisplayMapProps {
    fileContent: GeoJSON;
}

const DisplayMap: React.FC<DisplayMapProps> = ({ fileContent }) => {

    console.log(JSON.parse(JSON.stringify(fileContent))["geometries"]);
    
    const renderMap = () => {
        
        return (
            <>
            <MapContainer center={[51.505, -0.09]} zoom={10} style={{width:'100vw',height:'900px'}}>
                <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' subdomains={}/>
            </MapContainer>
            </>
        )
    }

    return (
        <>
            {renderMap()}
        </>
    )
}

export default DisplayMap;
