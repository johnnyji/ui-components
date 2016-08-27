import React, {Component} from 'react';
import Folder from '../Folder';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class RegularFolderDemo extends Component {

  static displayName = 'RegularFolderDemo';
  
  render() {
    return (
      <div className={styles.main}>
        <Folder>
          <span className={styles.folderContent}>I am folder!</span>
        </Folder>
      </div>
    );
  }

}

