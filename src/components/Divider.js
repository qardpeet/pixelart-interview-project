import React from 'react';

import { Check, X } from 'react-feather';
import Fade from 'react-reveal/Fade';
import HeadShake from 'react-reveal/HeadShake';

const Divider = ({ status }) => {
  let content = (
    <Fade duration={300}>
      <h3>OR</h3>
    </Fade>
  );

  if (status === 'CORRECT') {
    content = (
      <Fade duration={300}>
        <Check size={32} color="#43a047" strokeWidth="3px" />
      </Fade>
    );
  }

  if (status === 'INCORRECT') {
    content = (
      <HeadShake duration={700}>
        <X size={32} color="#e53935" strokeWidth="3px" />
      </HeadShake>
    );
  }

  return <div className="divider">{content}</div>;
};

export default Divider;
