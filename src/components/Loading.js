import React from 'react';

const Loading = () => (
  <div className="loading-container">
    <div className="loading-animation-wrapper">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
);

export default Loading;
