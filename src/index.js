import 'babel-polyfill';
import {render} from 'react-dom';
import {Router, hashHistory, IndexRoute, Route} from 'react-router';
import React from 'react';
import App from './App';
import ComponentsListing from './ComponentsListing';
import Demo from './Demo';
import RichTextEditor from './RichTextEditor/demo';

// Have to use hashHistory due to no server
const routes = (
  <Router history={hashHistory}>
    <Route component={App} path='/'>
      <IndexRoute component={ComponentsListing} />
      <Route component={Demo} path='components'>
        <Route component={RichTextEditor} path='RichTextEditor' />
      </Route>
    </Route>
  </Router>
);

render(routes, document.getElementById('ui-components'));
