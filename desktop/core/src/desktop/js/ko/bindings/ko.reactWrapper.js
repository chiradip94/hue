import { objectToString } from '@vue/shared';
import * as ko from 'knockout';
import React, { createElement } from 'react';
// import {render} from 'react-dom';
import { createRoot } from 'react-dom/client';

async function loadComponent(name) {
  // TODO: Contiue here and fix this.
  // We need to support multiple component locations, perhaps add a path to the name?
  // const { default: Component } = await import(`../../reactComponents/${name}`);
  const { default: Component } = await import(`../../apps/editor/components/result/${name}`);

  
  return Component;
}

const getProps = (allBindings) =>  {
  const props = allBindings.get('props'); 

  // Functions are not valid as a React child
  return { ...props, children : ko.toJS(props.children) };  
}

ko.bindingHandlers.reactWrapper = (() => {

  return {
    init: function (el, valueAccessor, allBindings, viewModel, bindingContext) {
      const componentName = ko.unwrap(valueAccessor());
      const props = getProps(allBindings);

      // The component's react root should only be created once per DOM
      // load so we pass it along via the bindingContext to be reused in the
      const reactRoot = createRoot(el);
      el.__KO_React_root = reactRoot;
      loadComponent(componentName).then(Component => {
        reactRoot.render(createElement(Component, props));
      });
      // Tell Knockout that it does not need to update the children
      // of this component, since that is now handled by React
      return { controlsDescendantBindings: true };
    },

    update: function (el, valueAccessor, allBindings, viewModel, bindingContext) {
      const componentName = ko.unwrap(valueAccessor());
      const props = getProps(allBindings);

      loadComponent(componentName).then(Component => {
        el.__KO_React_root.render(createElement(Component, props));
      });    

      // Handle KO observables
      Object.entries(props).forEach(([propName, propValue]) => {
        if (ko.isObservable(propValue)) {
          const koSubscription = propValue.subscribe(() => {
            loadComponent(componentName).then(Component => {
              el.__KO_React_root.render(createElement(Component, {...props, [propName]: propValue()}));
            });          
          });
          koSubscription.disposeWhenNodeIsRemoved(el);          
        }             
      })
    }
  };
})();
