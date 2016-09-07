import React, {PureComponent, PropTypes} from 'react';
import classNames from 'classnames';
import styles from './Spinner.scss';

export default class Spinner extends PureComponent {

  static displayName = 'Spinner';

  static propTypes = {
    className: PropTypes.string,
    classNameBar: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired
  };

  render() {
    const {className, classNameBar, size, ...restProps} = this.props;
    const classes = classNames(styles.wave, styles[`wave-${size}`], className);

    return (
      <div {...restProps} className={classes}>
        <div className={classNames(styles.rect, styles[`rect-${size}`], styles.rect1, classNameBar)} />
        <div className={classNames(styles.rect, styles[`rect-${size}`], styles.rect2, classNameBar)} />
        <div className={classNames(styles.rect, styles[`rect-${size}`], styles.rect3, classNameBar)} />
        <div className={classNames(styles.rect, styles[`rect-${size}`], styles.rect4, classNameBar)} />
        <div className={classNames(styles.rect, styles[`rect-${size}`], styles.rect5, classNameBar)} />
      </div>
    );
  }

}
