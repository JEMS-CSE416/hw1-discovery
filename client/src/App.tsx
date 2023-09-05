import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import Header from "./components/Header";

function App() {
  const [fileContent, setFileContent] = useState<string | any>("");

  useEffect(() => {
    console.log("fileContent: \n" + JSON.stringify(fileContent));
  }, [fileContent]);

  const handleFileUpload = (content: string | any) => {
    setFileContent(content);
  };

  return (
    <div className="App">
      <Header onFileUpload={handleFileUpload} />
      <Canvas fileContent={fileContent} />
    </div>
  );
}

export default App;
