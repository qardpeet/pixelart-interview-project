import React from 'react';
import Fade from 'react-reveal/Fade';
import round from 'lodash/round';

const CityCard = ({ city, onClick, index, status, unit }) => {
  const fromMetric = (temp, unit) =>
    unit === 'IMPERIAL' ? round(temp * (9 / 5) + 32, 2) : temp;

  return (
    <div
      className="city-card"
      onClick={onClick ? () => onClick(index) : undefined}
    >
      <h2>{city.name}</h2>
      <h3>{city.country}</h3>
      {status !== 'PENDING' && (
        <Fade duration={700} up>
          <span className="temperature">
            {fromMetric(city.temp, unit)} {unit === 'METRIC' ? 'C' : 'F'}
          </span>
        </Fade>
      )}
    </div>
  );
};

export default CityCard;
