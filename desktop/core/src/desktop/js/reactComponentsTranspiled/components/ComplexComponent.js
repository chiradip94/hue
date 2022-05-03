var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import LikeButton from './LikeButton';

'use strict';

var ComplexComponent = function ComplexComponent(_ref) {
  var version = _ref.version;

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      likedCount = _useState2[0],
      setLikedCount = _useState2[1];

  var handleLikeButtonClick = function handleLikeButtonClick() {
    setLikedCount(function (prev) {
      return prev + 1;
    });
  };

  return React.createElement(
    'div',
    { style: { backgroundColor: 'yellow' } },
    React.createElement(
      'h2',
      null,
      'I am a complex react component'
    ),
    React.createElement(
      'p',
      null,
      'Liked button clicks: ',
      likedCount
    ),
    React.createElement(
      LikeButton,
      { onClick: handleLikeButtonClick, version: version },
      'A sub component like button'
    )
  );
};

ComplexComponent.propTypes = {
  version: PropTypes.string
};

export default ComplexComponent;