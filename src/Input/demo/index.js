import React, {Component} from 'react';
import DemoView from '../../demo/index';
import ErrorInputDemo from './ErrorInputDemo';
import DisabledInputDemo from './DisabledInputDemo';
import RegularInputDemo from './RegularInputDemo';
import RequiredInputDemo from './RequiredInputDemo';
import pureRender from 'pure-render-decorator';

@pureRender
export default class InputDemo extends Component {

  static displayName = 'InputDemo';

  render () {
    const demos = [
      {title: 'Regular Input', component: RegularInputDemo},
      {title: 'Disabled Input', component: DisabledInputDemo},
      {title: 'Error Input', component: ErrorInputDemo},
      {title: 'Required Input', component: RequiredInputDemo}
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }

}
