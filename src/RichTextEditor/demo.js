import React, {Component} from 'react';
import RichTextEditor from './index';

const styles = {
  wrapper: {
    height: 600,
    width: 400
  }
};

export default class Demo extends Component {

  static displayName = 'RichTextEditor-demo';
  
  render() {
    return (
      <div style={styles.wrapper}>
        <RichTextEditor />
      </div>
    );
  }

}

