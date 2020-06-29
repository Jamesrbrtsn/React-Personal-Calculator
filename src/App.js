import React from 'react';
import './App.css';
import Calculator from './components/Calculator';
import Clarification from './components/Clarification';
import ProjectInformation from './components/ProjectInformation';

function App() {
  return (
    <div id="app">
      <Calculator />
      <Clarification />
      <ProjectInformation />
    </div>
  );
}

export default App;
