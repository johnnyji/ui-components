import React, {Component} from 'react';
import DemoView from '../../demo/index';
import PlaceholderSignaturePadDemo from './PlaceholderSignaturePadDemo';
import RegularSignaturePadDemo from './RegularSignaturePadDemo';
import pureRender from 'pure-render-decorator';

@pureRender
export default class SignaturePadDemo extends Component {

  static displayName = 'SignaturePadDemo';

  render () {
    const demos = [
      {title: 'Signature Pad', component: RegularSignaturePadDemo},
      {title: 'Signature Pad With Placeholder', component: PlaceholderSignaturePadDemo}
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }
}
