import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import LikeButton from './LikeButton';

('use strict');

const ComplexComponent = ({ version }) => {
  const [likedCount, setLikedCount] = useState(0);

  const handleLikeButtonClick = () => {
    setLikedCount(prev => prev + 1);
  };

  return (
    <div style={{ backgroundColor: 'yellow' }}>
      <h2>I am a complex react component</h2>
      <p>Liked button clicks: {likedCount}</p>
      <LikeButton onClick={handleLikeButtonClick} version={version}>
        A sub component like button
      </LikeButton>
    </div>
  );
};

ComplexComponent.propTypes = {
  version: PropTypes.string
};

export default ComplexComponent;
