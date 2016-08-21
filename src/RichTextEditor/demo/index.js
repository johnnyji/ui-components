import React, {Component} from 'react';
import DemoView from '../../demo/index';
import RegularEditorDemo from './RegularEditorDemo';
import HighlightEditorDemo from './HighlightEditorDemo';
import pureRender from 'pure-render-decorator';

@pureRender
export default class RichTextEditorDemo extends Component {

  render () {
    const demos = [
      {title: 'Regular Editor', component: RegularEditorDemo},
      {title: 'Highlight Editor', component: HighlightEditorDemo}
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }

}
