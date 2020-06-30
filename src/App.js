import React from 'react';
import Calculator from './components/Calculator';
import Clarification from './components/Clarification';
import ProjectInformation from './components/ProjectInformation';
import './App.scss';

function App() {
  return (
    <div className="app ui container">
      <Calculator />
      <div className="information-card ui raised segment">
        <Clarification />
        <br></br>
        <ProjectInformation />
      </div>
    </div>
  );
}

export default App;
