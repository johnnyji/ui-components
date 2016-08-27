import React, {Component} from 'react';
import DemoView from '../../demo/index';
import RegularFolderDemo from './RegularFolderDemo';
import pureRender from 'pure-render-decorator';

@pureRender
export default class FolderDemo extends Component {

  static displayName = 'FolderDemo';

  render () {
    const demos = [
      {title: 'Regular Folder', component: RegularFolderDemo}
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }

}
