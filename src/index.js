import 'babel-polyfill';
import {render} from 'react-dom';
import {Router, browserHistory, IndexRoute, Route} from 'react-router';
import React from 'react';
import App from './App';
import ComponentsListing from './ComponentsListing';

const routes = (
  <Router history={browserHistory}>
    <Route component={App} path='/'>
      <IndexRoute component={ComponentsListing} />
    </Route>
  </Router>
);

render(routes, document.getElementById('ui-components'));
