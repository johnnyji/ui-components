import React, {Component} from 'react';
import DemoView from '../../demo/index';
import DisabledClickableDemo from './DisabledClickableDemo';
import RegularClickableDemo from './RegularClickableDemo';
import pureRender from 'pure-render-decorator';

@pureRender
export default class ClickableDemo extends Component {

  static displayName = 'ClickableDemo';

  render () {
    const demos = [
      {title: 'Regular Clickable', component: RegularClickableDemo},
      {title: 'Disabled Clickable', component: DisabledClickableDemo}
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }

}
