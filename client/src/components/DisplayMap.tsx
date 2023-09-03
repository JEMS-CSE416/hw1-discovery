import React from "react";

interface DisplayMapProps {
    fileContent: string;
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