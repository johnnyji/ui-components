import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';
import styles from './ProgressBar.scss';

@pureRender
export default class ProgressBar extends Component {

  static displayName = 'ProgressBar';

  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    className: PropTypes.string,
    // TODO: Add more colors
    color: PropTypes.oneOf(['blue']).isRequired,
    total: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  };

  static defaultProps = {
    backgroundColor: '#FFF',
    color: 'blue'
  };
  
  render() {
    const {
      backgroundColor,
      className,
      color,
      total,
      value
    } = this.props;
    const progressBarClasses = classNames(
      styles.bar,
      styles[`bar-${color}`]
    );
    const progressBarPercentage = (value / total) * 100;

    return (
      <div className={classNames(styles.main, className)} style={{backgroundColor}}>
        <div className={progressBarClasses} style={{width: `${progressBarPercentage}%`}} />
      </div>
    );
  }

}
