import React from 'react';

import CityCard from './CityCard';
import Divider from './Divider';

const Game = ({ cards, unit, status, onCardClick, score }) => {
  if (status !== 'PLAYING') return null;

  return (
    <div className="city-cards-container">
      <CityCard
        onClick={onCardClick}
        city={cards.cities[0]}
        index={0}
        status={cards.status}
        unit={unit}
      />
      <Divider status={cards.status} />
      <CityCard
        onClick={onCardClick}
        city={cards.cities[1]}
        index={1}
        status={cards.status}
        unit={unit}
      />
    </div>
  );
};

export default Game;
