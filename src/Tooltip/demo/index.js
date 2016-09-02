import React, {Component} from 'react';
import DemoView from '../../demo/index';
import RegularTooltipDemo from './RegularTooltipDemo';
import pureRender from 'pure-render-decorator';

@pureRender
export default class TooltipDemo extends Component {

  static displayName = 'TooltipDemo';

  render () {
    const demos = [
      {title: 'Tooltip', component: RegularTooltipDemo}
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }

}
