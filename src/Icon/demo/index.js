import React, {Component} from 'react';
import DemoView from '../../demo/index';
import ColoredIconsDemo from './ColoredIconsDemo';
import RegularIconsDemo from './RegularIconsDemo';
import pureRender from 'pure-render-decorator';

@pureRender
export default class IconDemo extends Component {

  static displayName = 'IconDemo';

  render () {
    const demos = [
      {title: 'Regular Icons', component: RegularIconsDemo},
      {title: 'Colored Icons', component: ColoredIconsDemo}
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }

}
