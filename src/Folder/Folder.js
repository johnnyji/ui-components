import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';

@pureRender
export default class Folder extends Component {

  static displayName = 'Folder';

  static propTypes = {
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };

  static defaultProps = {
    height: 150,
    width: 200
  };

  render() {
    const {className, children, contentClassName, height, width} = this.props;
    const styles = {height, width};

    return (
      <div className={classNames(styles.main, className)} style={styles}>
        <header className={styles.tab}>
          <div className={styles.tabLeft} />
          <div className={styles.tabRight} />
        </header>
        <main className={classNames(styles.content, contentClassName)}>
          {children}
        </main>
      </div>
    );
  }
}
