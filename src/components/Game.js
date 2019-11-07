import React from 'react';

import Question from './Question';
import Lose from './Lose';
import History from './History';
import SplashScreen from './SplashScreen';

const Game = ({
  handleCardClick,
  question,
  questionsHistory,
  unit,
  status,
  prevScore,
  play,
  viewHistory,
}) => {
  switch (status) {
    case 'PLAYING':
      return (
        <Question
          handleCardClick={handleCardClick}
          question={question}
          unit={unit}
        />
      );
    case 'LOST':
      return (
        <Lose prevScore={prevScore} play={play} viewHistory={viewHistory} />
      );
    case 'HISTORY':
      return (
        <History questionsHistory={questionsHistory} play={play} unit={unit} />
      );
    default:
      return <SplashScreen play={play} />;
  }
};

export default Game;
