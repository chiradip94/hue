import * as React from 'react';
import PropTypes from 'prop-types';

('use strict');

const LikeButton = ({ version, isReal, children, onClick }) => {
  return (
    <button
      onClick={e => {
        onClick && onClick(e);
        console.info('LikeButton clicked');
      }}
    >
      {children ? children : 'Like me'}
    </button>
  );
};

LikeButton.propTypes = {
  version: PropTypes.string,
  age: PropTypes.number,
  stuff: PropTypes.object,
  isReal: PropTypes.bool
};

export default LikeButton;
