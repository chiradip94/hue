import * as React from 'react';
import PropTypes from 'prop-types';

('use strict');

const ReactResult = ({ version, isReal, children, onClick, activeExecutable }) => {
const id = activeExecutable && activeExecutable.id;

// Hello

  return (
    <button
      onClick={e => {
        onClick && onClick(e);
        console.info('ReactResult clicked');
      }}
    >
      {children ? children : 'Like me'} {id}
    </button>
  );
};

ReactResult.propTypes = {
  version: PropTypes.string,
  age: PropTypes.number,
  stuff: PropTypes.object,
  isReal: PropTypes.bool
};

export default ReactResult;
