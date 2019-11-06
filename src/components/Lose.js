import React from 'react';

const Lose = ({ score, play, viewHistory }) => (
  <div className="losing-screen">
    <h1>
      YOU LOST
      <span role="img" aria-label="emoji">
        😅
      </span>
    </h1>
    <h2>
      SCORE: <span className="accent">{score}</span>
    </h2>
    <button onClick={play} className="btn-regular">
      PLAY AGAIN
    </button>
    <div className="btn-regular pink" onClick={viewHistory}>
      VIEW HISTORY
    </div>
  </div>
);

export default Lose;
