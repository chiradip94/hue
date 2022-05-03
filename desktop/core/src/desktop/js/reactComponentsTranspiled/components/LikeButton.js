import * as React from 'react';
import PropTypes from 'prop-types';

'use strict';

var LikeButton = function LikeButton(_ref) {
  var version = _ref.version,
      isReal = _ref.isReal,
      children = _ref.children,
      _onClick = _ref.onClick;

  return React.createElement(
    'button',
    {
      onClick: function onClick(e) {
        _onClick && _onClick(e);
        console.info('LikeButton clicked');
      }
    },
    children ? children : 'Like me'
  );
};

LikeButton.propTypes = {
  version: PropTypes.string,
  age: PropTypes.number,
  stuff: PropTypes.object,
  isReal: PropTypes.bool
};

export default LikeButton;