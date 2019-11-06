import React from 'react';

import Pulse from 'react-reveal/Pulse';

const Menu = ({ score, changeUnit, unit }) => {
  return (
    <div className="menu">
      <div className="menu-content-left">
        <button onClick={changeUnit} className="btn-small">
          {unit === 'METRIC' ? 'USE IMPERIAL UNITS' : 'USE METRIC UNITS'}
        </button>
      </div>
      <div className="menu-content-right">
        <Pulse spy={score} duration={500}>
          <h3>
            SCORE: <span className="accent">{score}</span>
          </h3>
        </Pulse>
      </div>
    </div>
  );
};

export default Menu;
