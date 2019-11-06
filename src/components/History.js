import React from 'react';

import CityCard from './CityCard';
import Divider from './Divider';

const History = ({ questionsHistory, play, unit }) => (
  <div className="history-container">
    <h2>YOUR HISTORY</h2>
    <button onClick={play} className="btn-regular">
      PLAY
    </button>
    {questionsHistory.map((question, index) => (
      <div key={index} className="history-cards-wrapper">
        <CityCard
          city={question.cities[0]}
          status={question.status}
          unit={unit}
        />
        <Divider status={question.status} />
        <CityCard
          city={question.cities[1]}
          status={question.status}
          unit={unit}
        />
      </div>
    ))}
  </div>
);

export default History;
