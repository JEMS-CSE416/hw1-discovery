import React from "react";
import DisplayMap from "./DisplayMap";
import { GeoJSON } from "geojson";

interface CanvasProps {
    fileType: string;
    fileContent: string | undefined;
}

const Canvas: React.FC<CanvasProps> = ({ fileType, fileContent }) => {
    console.log(fileType);
    console.log(fileContent);

    return (
        <>
            {fileContent !== undefined // only display render displaymap if goejson exists
              ?<DisplayMap 
                fileType={fileType}
                fileContent={fileContent}/>
              :<></>
            }
        </>
    )
}

export default Canvas;
