import _regeneratorRuntime from 'babel-runtime/regenerator';

var render = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(name, rawPropDataset, root) {
    var _ref3, Component, props, propName, propValue, parsedPropValue;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return import('../reactComponentsTranspiled/components/' + name);

          case 2:
            _ref3 = _context.sent;
            Component = _ref3.default;
            props = {};

            for (propName in rawPropDataset) {
              propValue = rawPropDataset[propName];
              parsedPropValue = parseDatasetPropValue({
                propName: propName,
                propValue: propValue,
                proptypesDefinition: Component.propTypes,
                componentName: name
              });

              props[propName] = parsedPropValue;
            }

            root.render(createElement(Component, props));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function render(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

// Find all DOM containers


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types';

var parseDatasetPropValue = function parseDatasetPropValue(_ref) {
  var propName = _ref.propName,
      propValue = _ref.propValue,
      proptypesDefinition = _ref.proptypesDefinition,
      componentName = _ref.componentName;

  var type = proptypesDefinition[propName];
  var parsedValue = propValue;
  switch (type) {
    case PropTypes.string:
      break;
    case PropTypes.number:
      parsedValue = parseInt(propValue, 10);
      break;
    case PropTypes.bool:
      parsedValue = propValue.toLowerCase() === 'true';
      break;
    case undefined:
      console.warn('PropType definiton is missing for prop "' + propName + '" in ' + componentName);
      break;
    default:
      console.warn('PropType for "' + propName + '" in ' + componentName + ' not implemented in react prop bridge');
      break;
  }

  return parsedValue;
};

document.querySelectorAll('[data-reactcomponent]').forEach(function (domContainer) {
  // Find the react component implementation
  var componentName = domContainer.dataset['reactcomponent'];
  var rawPropDataset = domContainer.dataset.props ? JSON.parse(domContainer.dataset.props) : {};
  var root = createRoot(domContainer);

  render(componentName, rawPropDataset, root);
});