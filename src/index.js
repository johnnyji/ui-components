import 'babel-polyfill';
import {render} from 'react-dom';
import {Router, hashHistory, IndexRoute, Route} from 'react-router';
import React from 'react';
import App from './App';
import components from './components';
import ComponentsListing from './ComponentsListing';
import Demo from './Demo';

// Have to use hashHistory due to no server
const routes = (
  <Router history={hashHistory}>
    <Route component={App} path='/'>
      <IndexRoute component={ComponentsListing} />
      <Route component={Demo} path='components'>
        {components.map((c, i) => {
          const component = require(`./${c}/demo/index.js`);
          return (
            <Route
              component={component.default || component}
              key={i}
              path={c} />
          );
        })}
      </Route>
    </Route>
  </Router>
);

render(routes, document.getElementById('ui-components'));
