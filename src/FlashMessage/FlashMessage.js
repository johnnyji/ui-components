import React, {PropTypes, PureComponent} from 'react';
import classNames from 'classnames';
import Clickable from '../Clickable/Clickable';
import Icon from '../Icon/Icon';
import styles from './FlashMessage.scss';
import TransitionGroup from 'react-addons-css-transition-group';
import transitionStyles from './transitionStyles.scss';

export default class FlashMessage extends PureComponent {

  static displayName = 'FlashMessage';

  static propTypes = {
    className: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]).isRequired,
    onDismiss: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['default', 'error', 'warning', 'success']).isRequired
  };

  static defaultProps = {
    color: 'default'
  };

  render() {
    const {className, content, onDismiss, type} = this.props;
    const classes = classNames(
      styles.main,
      className
    );
    const contentClasses = classNames(
      styles.content,
      styles[type]
    );
    const closeButtonClasses = classNames(
      styles.closeButton,
      styles[`closeButton-${type}`]
    );

    return (
      <TransitionGroup
        className={classes}
        component="div"
        onClick={onDismiss}
        transitionName={transitionStyles}
        transitionAppear={true}
        transitionAppearTimeout={100}
        transitionEnterTimeout={100}
        transitionLeaveTimeout={100}>
        <span className={contentClasses}>{content}</span>
        <Clickable className={closeButtonClasses} onClick={onDismiss}>
          <Icon name='close' size={20} />
        </Clickable>
      </TransitionGroup>
    );
  }

}
