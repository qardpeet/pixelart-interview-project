import React from 'react';

const SplashScreen = ({ play }) => (
  <div className="splash-screen">
    <h1>
      CAN YOU GUESS WHICH CITY IS <span className="accent">HOTTER?</span>
    </h1>
    <button onClick={play} className="btn-regular">
      PLAY
    </button>
  </div>
);

export default SplashScreen;
