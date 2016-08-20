import React, {Component} from 'react';
import RichTextEditor from '../RichTextEditor';
import styles from './index.scss';

export default class RichTextEditorDemo extends Component {

  static displayName = 'RichTextEditorDemo';
  
  render() {
    return (
      <RichTextEditor
        className={styles.Demo__editor} />
    );
  }

}