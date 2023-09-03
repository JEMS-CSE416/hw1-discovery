import React from "react";
import DisplayMap from "./DisplayMap";

interface CanvasProps {
    fileContent: string;
}

const Canvas: React.FC<CanvasProps> = ({ fileContent }) => {
    return (
        <>
            <DisplayMap fileContent={fileContent}/>
        </>
    )
}

export default Canvas;