import React, {Component} from 'react';
import pureRender from 'pure-render-decorator';

@pureRender
export default class HighlightedWord extends Component {

  static displayName = 'HighlightWord';

  render() {
    return (
      <mark>{this.props.children}</mark>
    );
  }

}
