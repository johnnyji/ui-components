import React, {Component} from 'react';
import DemoView from '../../demo/index';
import RegularInputDemo from './RegularInputDemo';
import pureRender from 'pure-render-decorator';

@pureRender
export default class InputDemo extends Component {

  static displayName = 'InputDemo';

  render () {
    const demos = [
      {title: 'Regular Input', component: RegularInputDemo}
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }

}
