import React, { Component } from 'react';
import './App.css';
import Tooltip from './tooltip/Tooltip';
import Filtering from './filtering/Filtering';

class App extends Component {
  constructor(props) {
    super(props);
    this.options = [
        {name: 'Abobrinha'},
        {name: 'Abacate'},
        {name: 'Macaxeira'},
        {name: 'Melão'},
        {name: 'Uva'},
        {name: 'Pepino'},
        {name: 'Abacaxi'},
        {name: 'Chuchu'},
        {name: 'Banana'},
        {name: 'Maçã'},
    ];
  }

  render() {
    return (
      <div className="App">
        <Tooltip content="Super legal esse negócio de components" more="super legal" time={300}/>
        <Filtering options={this.options} />
      </div>
    );
  }
}

export default App;
