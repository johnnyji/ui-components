import React, {Component} from 'react';
import DemoView from '../../demo/index';
import DisabledInputDemo from './DisabledInputDemo';
import RegularInputDemo from './RegularInputDemo';
import pureRender from 'pure-render-decorator';

@pureRender
export default class InputDemo extends Component {

  static displayName = 'InputDemo';

  render () {
    const demos = [
      {title: 'Regular Input', component: RegularInputDemo},
      {title: 'Disabled Input', component: DisabledInputDemo}
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }

}
