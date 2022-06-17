import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types';

import ComplexComponent from './components/ComplexComponent';
import DislikeButton from './components/DislikeButton';
import LikeButton from './components/LikeButton';

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

const parseProps = (name, rawPropDataset, myPropTypes) => {
  const props = {};
  for (let propName in rawPropDataset) {
    const propValue = rawPropDataset[propName];
    const parsedPropValue = parseDatasetPropValue({
      propName,
      propValue,
      proptypesDefinition: myPropTypes,
      componentName: name
    });
    props[propName] = parsedPropValue;
  }
  return props;
}

async function render(name, rawPropDataset, root) {  
  // The dynamic option, not sure how that works with webpack...

  const { default: Component } = await import(`../reactfolder/components/${name}`);
  const props = parseProps(name, rawPropDataset, Component.propTypes);
  root.render(createElement(Component, props));
  
  // static option
  // let myPropTypes;
  // switch (name) {
  //   case 'LikeButton':
  //     myPropTypes = parseProps(name, rawPropDataset, LikeButton.propTypes)
  //     root.render(createElement(LikeButton, myPropTypes));
  //     break;
  //   case 'DislikeButton':
  //     myPropTypes = parseProps(name, rawPropDataset, DislikeButton.propTypes)
  //     root.render(createElement(DislikeButton, myPropTypes));
  //     break;
  //   case 'ComplexComponent':
  //     myPropTypes = parseProps(name, rawPropDataset, ComplexComponent.propTypes)
  //     root.render(createElement(ComplexComponent, myPropTypes));
  //     break;            
  //   default:
  //     break;
  // }

}

// Find all DOM containers
document.querySelectorAll('[data-reactcomponent]').forEach(domContainer => {
  // Find the react component implementation
  const componentName = domContainer.dataset['reactcomponent'];  
  const rawPropDataset = domContainer.dataset.props ? JSON.parse(domContainer.dataset.props) : {};
  const root = createRoot(domContainer);

  render(componentName, rawPropDataset, root);
});
