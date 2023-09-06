import React from "react";
import DisplayMap from "./DisplayMap";
import { GeoJSON } from "geojson";

interface CanvasProps {
    fileContent: GeoJSON | undefined;
}

const Canvas: React.FC<CanvasProps> = ({ fileContent }) => {
    return (
        <>
            {fileContent !== undefined // only display render displaymap if goejson exists
              ?<DisplayMap fileContent={fileContent}/>
              :<></>
            }
        </>
    )
}

export default Canvas;
