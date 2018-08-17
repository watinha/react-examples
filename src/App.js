import React, { Component } from 'react';
import './App.css';
import Tooltip from './tooltip/Tooltip';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tooltip content="Super legal esse negócio de components" more="super legal" time={300}/>
      </div>
    );
  }
}

export default App;
