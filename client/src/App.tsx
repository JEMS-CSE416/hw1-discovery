import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Canvas from './components/Canvas';
import Header from './components/Header';

function App() {
  const [fileContent, setFileContent] = useState<string>('');

  const handleFileUpload = (content: string) => {
    setFileContent(content)
  }

  return (
    <div className="App">
      <Header onFileUpload={handleFileUpload}/>
      <Canvas fileContent={fileContent}/>
    </div>
  );
}

export default App;
