import React, { Component } from 'react';

export class App extends Component {
  render() {
    return (
      <>
        <div className="menu">
          <div className="menu-content">
            <h3>
              SCORE: <span className="accent">3</span>
            </h3>
          </div>
        </div>
        <div className="city-cards-container">
          <div className="city-card">
            <h2>Tbilisi</h2>
            <h2>Georgia</h2>
          </div>
          <div className="middle">
            <h3>OR</h3>
          </div>
          <div className="city-card">
            <h2>Tbilisi</h2>
            <h2>Georgia</h2>
            <span className="temperature">+15 C</span>
          </div>
        </div>
      </>
    );
  }
}

export default App;
