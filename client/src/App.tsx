import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import Header from "./components/Header";

function App() {
  const [fileType, setFileType] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>();

  // useEffect(() => {
  //   console.log("fileContent: \n" + JSON.stringify(fileContent));
  // }, [fileContent, fileType]);

  const handleFileUpload = (file: string, content: string) => {
    setFileType(file)
    setFileContent(content);
  };

  return (
    <div className="App">
      <Header onFileUpload={handleFileUpload} />
      <Canvas 
        fileType={fileType}
        fileContent={fileContent} />
    </div>
  );
}

export default App;
