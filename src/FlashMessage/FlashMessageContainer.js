import React, {PropTypes, PureComponent} from 'react';
import {VelocityTransitionGroup, velocityHelpers} from 'velocity-react';
import classNames from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';
import styles from './FlashMessageContainer.scss';
require('velocity-animate/velocity.ui');

const ANIMATIONS = {
  enter: velocityHelpers.registerEffect({
    calls: [
      [{
        transformPerspective: [800, 800],
        transformOriginX: ['50%', '50%'],
        transformOriginY: ['100%', '100%'],
        marginBottom: 8,
        opacity: 1,
        rotateX: [0, 130],
      }, 1, {
        easing: 'ease-out',
        display: 'flex',
      }]
    ],
  }),
  leave: velocityHelpers.registerEffect({
    calls: [
      [{
        transformPerspective: [800, 800],
        transformOriginX: ['50%', '50%'],
        transformOriginY: ['0%', '0%'],
        marginBottom: -30,
        opacity: 0,
        rotateX: -70,
      }, 1, {
        easing: 'ease-out',
        display: 'flex',
      }]
    ],
  })
};

export default class FlashMessageContainer extends PureComponent {

  static displayName = 'FlashMessageContainer';

  static propTypes = {
    className: PropTypes.string,
    animationDuration: PropTypes.number.isRequired,
    items: ImmutablePropTypes.listOf(PropTypes.element).isRequired
  };

  static defaultProps = {
    animationDuration: 200,
    items: List()
  };

  render() {
    const {animationDuration: duration, className, items} = this.props;
    const {enter, leave} = ANIMATIONS;

    const enterAnimation = {
      animation: enter,
      stagger: duration,
      duration,
      backwards: true,
      display: 'flex',
      style: {
        // Keep display none until Velocity sets the display at the beginning of animation
        display: 'none',
      },
    };

    const leaveAnimation = {
      animation: leave,
      stagger: duration,
      duration,
      backwards: true,
    };

    return (
      <VelocityTransitionGroup
        component="div"
        className={classNames(styles.main, className)}
        enter={enterAnimation}
        leave={leaveAnimation}>
        {items}
      </VelocityTransitionGroup>
    );
  }

}
