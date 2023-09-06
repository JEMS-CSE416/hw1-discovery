import React from "react";
import {GeoJSON} from "geojson";

interface DisplayMapProps {
    fileContent: GeoJSON;
}

const DisplayMap: React.FC<DisplayMapProps> = ({ fileContent }) => {
    const renderMap = () => {
        return (
            <h1>rendering map stuff</h1>
        )
    }

    return (
        <>
            {renderMap()}
        </>
    )
}

export default DisplayMap;
