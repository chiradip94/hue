import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types';

const parseDatasetPropValue = ({ propName, propValue, proptypesDefinition, componentName }) => {
  const type = proptypesDefinition[propName];
  let parsedValue = propValue;
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
      console.warn(`PropType definiton is missing for prop "${propName}" in ${componentName}`);
      break;
    default:
      console.warn(
        `PropType for "${propName}" in ${componentName} not implemented in react prop bridge`
      );
      break;
  }

  return parsedValue;
};

async function render(name, rawPropDataset, root) {  
  const { default: Component } = await import(`../reactComponentsTranspiled/components/${name}`);
  
  const props = {};
  for (let propName in rawPropDataset) {
    const propValue = rawPropDataset[propName];
    const parsedPropValue = parseDatasetPropValue({
      propName,
      propValue,
      proptypesDefinition: Component.propTypes,
      componentName: name
    });
    props[propName] = parsedPropValue;
  }

  root.render(createElement(Component, props));
}

// Find all DOM containers
document.querySelectorAll('[data-reactcomponent]').forEach(domContainer => {
  // Find the react component implementation
  const componentName = domContainer.dataset['reactcomponent'];  
  const rawPropDataset = domContainer.dataset.props ? JSON.parse(domContainer.dataset.props) : {};
  const root = createRoot(domContainer);

  render(componentName, rawPropDataset, root);
});
