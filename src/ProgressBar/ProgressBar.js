import React, {PropTypes, PureComponent} from 'react';
import classNames from 'classnames';
import styles from './ProgressBar.scss';

export default class ProgressBar extends PureComponent {

  static displayName = 'ProgressBar';

  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    className: PropTypes.string,
    // TODO: Add more colors
    color: PropTypes.oneOf(['purple']).isRequired,
    total: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  };

  static defaultProps = {
    backgroundColor: '#FFF',
    color: 'purple'
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
