import React, {Component} from 'react';
import DemoView from '../../demo/index';
import IconListDemo from './IconListDemo';
import pureRender from 'pure-render-decorator';

@pureRender
export default class IconDemo extends Component {

  static displayName = 'IconDemo';

  render () {
    const demos = [
      {title: 'Icon List', component: IconListDemo}
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }

}
