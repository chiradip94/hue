import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

('use strict');

const DislikeButton = ({ version }) => {
  const [liked, setLiked] = useState(false);
  return liked ? (
    'disliked'
  ) : (
    <button onClick={() => setLiked(true)}>{`Dislike version: ${version}`}</button>
  );
};

DislikeButton.propTypes = {
  version: PropTypes.string,
  age: PropTypes.number,
  stuff: PropTypes.object,
  isReal: PropTypes.bool
};

export default DislikeButton;
