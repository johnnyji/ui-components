import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';
import styles from './Folder.scss';

@pureRender
export default class Folder extends Component {

  static displayName = 'Folder';

  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const {className, children} = this.props;

    return (
      <div className={classNames(styles.main, className)}>
        <header className={styles.tab}>
          <div className={styles.tabLeft} />
          <div className={styles.tabRight} />
        </header>
        <main className={styles.content}>
          {children}
        </main>
      </div>
    );
  }
}
