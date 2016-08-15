import 'babel-polyfill';
import {render} from 'react-dom';
import {Router, browserHistory, IndexRoute} from 'react-router';
import React from 'react';
import View from './View';

const routes = (
  <Router history={browserHistory}>
    <IndexRoute component={View} />
  </Router>
);

render(routes, document.getElementById('ui-components'));
