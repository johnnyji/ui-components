import React, {Component} from 'react';
import DemoView from '../../demo/index';
import RegularProgressBarDemo from './RegularProgressBarDemo';
import pureRender from 'pure-render-decorator';

@pureRender
export default class ProgressBarDemo extends Component {

  static displayName = 'ProgressBarDemo';

  render () {
    const demos = [
      {title: 'Regular ProgressBar', component: RegularProgressBarDemo}
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }

}
