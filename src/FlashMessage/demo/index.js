import React, {PureComponent} from 'react';
import DemoView from '../../demo/index';
import RegularFlashDemo from './RegularFlashDemo';

export default class FlashDemo extends PureComponent {

  static displayName = 'FlashDemo';

  render () {
    const demos = [
      {title: 'Regular Flash Message', component: RegularFlashDemo}
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }

}
