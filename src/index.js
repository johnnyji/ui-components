import 'babel-polyfill';
import {render} from 'react-dom';
import {Router, hashHistory, IndexRoute, Route} from 'react-router';
import React from 'react';
import App from './App';
import Clickable from './Clickable/demo/index';
import ComponentsListing from './ComponentsListing';
import Demo from './Demo';
import Input from './Input/demo/index';
import RichTextEditor from './RichTextEditor/demo/index';
import SignaturePad from './SignaturePad/demo/index';

// Have to use hashHistory due to no server
const routes = (
  <Router history={hashHistory}>
    <Route component={App} path='/'>
      <IndexRoute component={ComponentsListing} />
      <Route component={Demo} path='components'>
        <Route component={Clickable} path='Clickable' />
        <Route component={Input} path='Input' />
        <Route component={RichTextEditor} path='RichTextEditor' />
        <Route component={SignaturePad} path='SignaturePad' />
      </Route>
    </Route>
  </Router>
);

render(routes, document.getElementById('ui-components'));
