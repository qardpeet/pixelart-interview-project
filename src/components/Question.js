import React from 'react';

import CityCard from './CityCard';
import Divider from './Divider';

const Question = ({ handleCardClick, question, unit }) => (
  <div className="game-container">
    <CityCard
      onClick={handleCardClick}
      city={question.cities[0]}
      index={0}
      status={question.status}
      unit={unit}
    />
    <Divider status={question.status} />
    <CityCard
      onClick={handleCardClick}
      city={question.cities[1]}
      index={1}
      status={question.status}
      unit={unit}
    />
  </div>
);

export default Question;
