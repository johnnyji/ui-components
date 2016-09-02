import React, {Component} from 'react';
import DemoView from '../../demo/index';
import ActiveButtonDemo from './ActiveButtonDemo';
import DisabledButtonDemo from './DisabledButtonDemo';
import RegularButtonDemo from './RegularButtonDemo';
import pureRender from 'pure-render-decorator';

@pureRender
export default class ButtonDemo extends Component {

  static displayName = 'ButtonDemo';

  render () {
    const demos = [
      {title: 'Regular Button', component: RegularButtonDemo},
      {title: 'Active Button', component: ActiveButtonDemo},
      {title: 'Disabled Button', component: DisabledButtonDemo}
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }

}
