import React, { Component } from 'react';
import { connect, watch } from './bmx';
import './App.css';

import appState1 from './state';

@connect(appState1)
@watch(() => {
  return [
    appState1.state.firstName,
    appState1.state.lastName
  ];
})
class App extends Component {
  clicked(state) {
    appState1.changeState(state);
  }

  render() {
    return (
      <div className="App">
        <h5 className="h5">{appState1.state.state1}</h5>
        <h5 className="h5">{appState1.state.state2}</h5>
        <h5 className="h5">{appState1.state.firstName}</h5>
        <h5 className="h5">{appState1.state.lastName}</h5>
        <button onClick={this.clicked.bind(this, 'state1')}>state1</button>
        <button onClick={this.clicked.bind(this, 'state2')}>state2</button>
        <button onClick={this.clicked.bind(this, 'firstName')}>firstName</button>
        <button onClick={this.clicked.bind(this, 'lastName')}>lastName</button>
      </div>
    );
  }

  didStateUpdate() {
    console.log('state changed');
  }
}

export default App;
