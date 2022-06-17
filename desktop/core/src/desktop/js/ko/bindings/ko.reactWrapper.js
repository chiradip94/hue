import * as ko from 'knockout';
import React, { createElement } from 'react';
// import {render} from 'react-dom';
import { createRoot } from 'react-dom/client';

async function loadComponent(name, props, root) {
  // TODO: does this really work when loading react components from an app folder?
  
  const { default: Component } = await import(`../../reactfolder/components/${name}`);
  return Component;
  // root.render(createElement(Component, props));
}

ko.bindingHandlers.reactWrapper = (() => {

  return {
    init: function (el, valueAccessor, allBindings, viewModel, bindingContext) {

      
      const componentName = ko.unwrap(valueAccessor());
      const props = ko.toJS(allBindings.get('props'));


      // The component's react root should only be created once per DOM
      // load so we pass it along via the bindingContext to be reused in the
      //
      
      
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
      // debugger;
      const componentName = ko.unwrap(valueAccessor());
      const props = ko.toJS(allBindings.get('props'));

      // console.info(el);

      // const { reactRoot } = bindingContext.$data;
      // const reactRoot = createRoot(el);
      loadComponent(componentName).then(Component => {
        el.__KO_React_root.render(createElement(Component, props));
        // render(createElement(Component, props), el);
      });
    }
  };
})();

// ko.virtualElements.allowedBindings.reactWrapper = true;
