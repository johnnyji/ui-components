import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import {findDOMNode} from 'react-dom';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator';
import styles from './Tooltip.scss';

const PLACEMENTS = ['top', 'right', 'bottom', 'left'];

// TODO: UPDATE COMMENTS!

@pureRender
export default class Tooltip extends Component {

  static displayName = 'Tooltip';

  static propTypes = {
    className: PropTypes.string,
    placement: PropTypes.oneOf(PLACEMENTS).isRequired,
    tooltip: PropTypes.element.isRequired,
    tooltipSpacing: PropTypes.number.isRequired,
    triggers: ImmutablePropTypes.listOf(
      PropTypes.oneOf(['hover', 'click'])
    ).isRequired
  };

  static defaultProps = {
    placement: 'top',
    tooltipSpacing: 3,
    triggers: Immutable.List(['hover'])
  };

  constructor (props) {
    super(props);
    this.state = {
      placement: props.placement,
      shown: false,
      tooltipStyles: {}
    };
  }

  componentDidMount () {
    // const {triggers} = this.props;
    // const anchor = findDOMNode(this);
    window.addEventListener('resize', this._debounceResize);

    // TODO: We don't know if at any given point if the triggers
    // change. How can we ensure we're removing all event listeners
    // on unmount?
    // if (triggers.includes('hover')) {
    //   anchor.addEventListener('mouseenter', this._showTooltip);
    //   anchor.addEventListener('mouseleave', this._hideTooltip);
    // }

    // if (triggers.includes('click')) {
    //   anchor.addEventListener('click', this._toggleTooltip);
    // }
  }

  componentWillReceiveProps (nextProps) {
    // If the placement changes, we need to update the state
    if (nextProps.placement !== this.props.placement) {
      const placement = this._getValidPlacement(nextProps.placement);
      this.setState({placement});
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // When the tooltip is shown, we have access to it's height
    // and width, meaning we need to immediately recalculate it's
    // position to a more accurate one than what we original estimated
    // with `_calculatePosition`
    //
    // When the user changes the placement prop while the tooltip is shown,
    // we need to adjust the new position given the new placement
    if (
      prevProps.children !== this.props.children ||
      !prevState.shown && this.state.shown ||
      ((prevState.placement !== this.state.placement) && this.state.shown)
    ) {
      this.setState({
        tooltipStyles: this._calculatePosition(this.state.placement)
      });
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._debounceResize);
  }

  render () {
    const {shown, tooltipStyles} = this.state;
    const {children, className, tooltip, triggers} = this.props;

    const tooltipTriggers = {
      ...(triggers.includes('hover') ? {onMouseEnter: this._showTooltip, onMouseLeave: this._hideTooltip} : {}),
      ...(triggers.includes('click') ? {onClick: this._toggleTooltip} : {})
    };

    return (
      <div className={classNames(styles.main, className)} {...tooltipTriggers}>
        {children}
        {shown && React.cloneElement(tooltip, {
          ref: 'tooltip',
          style: {background: 'green', position: 'fixed', ...tooltipStyles}
        })}
      </div>
    );
  }

  /**
   * Estimates the position of the tooltip before it renders. This is succeeded by `_adjustTooltipPositon`
   * which will calculate the more accurate position immediately post render of the tooltip
   * @param {String} placement - The directional placement of the tooltip
   * @return {Object} - The tooltip position/style
   */
  _calculatePosition = (placement = this.state.placement) => {
    const {tooltipSpacing} = this.props;

    const anchor = findDOMNode(this);
    const {bottom, height, left, right, top, width} = anchor.getBoundingClientRect();

    // Horizontal and vertical centers of the anchor element
    const centerX = left + (width / 2);
    const centerY = top + (height / 2);

    let tooltipBottom;
    let tooltipLeft;
    let tooltipRight;
    let tooltipTop;

    switch (placement) {
      case 'top': {
        // Shift the tooltip horizontally centered and above the anchor
        tooltipLeft = centerX;
        tooltipBottom = window.innerHeight - (top - tooltipSpacing);
        break;
      }
      case 'left': {
        // Shift the tooltip vertically centered and to the left of the anchor
        tooltipRight = window.innerWidth - (left - tooltipSpacing);
        tooltipTop = centerY;
        break;
      }
      case 'bottom': {
        // Shift the tooltip horizontally centered and below the anchor
        tooltipLeft = centerX;
        tooltipTop = bottom + tooltipSpacing;
        break;
      }
      case 'right': {
        // Shift the tooltip vertically centered and to the right of the anchor
        tooltipLeft = right + tooltipSpacing;
        tooltipTop = centerY;
        break;
      }
      default: {
        break;
      }
    }

    const estimatedPosition = {
      ...(tooltipLeft ? {left: tooltipLeft} : {}),
      ...(tooltipBottom ? {bottom: tooltipBottom} : {}),
      ...(tooltipTop ? {top: tooltipTop} : {}),
      ...(tooltipRight ? {right: tooltipRight} : {})
    };

    // If there's a tooltip rendered, we can generate the most accurate
    // position instead of just estimating, if not we just return the estimated
    // position
    const tooltip = findDOMNode(this.refs.tooltip);
    if (!tooltip) return estimatedPosition;

    const {
      height: tHeight,
      width: tWidth
    } = tooltip.getBoundingClientRect();

    // The tooltip element will have a different `left` and `top` position
    // than the one we already estimated if it's currently mounted. Therefore
    // we need to use the positions from our `estimatedPosition` instead of
    // the ones we extract from the tooltip node
    const tLeft = estimatedPosition.left || estimatedPosition.right - tWidth;
    const tTop = estimatedPosition.top || estimatedPosition.bottom - tHeight;

    const accuratePosition = {};

    switch (placement) {
      case 'top':
      case 'bottom': {
        // Shifts the tooltips weight origin X to the center, thus centering it horizontally
        accuratePosition.left = tLeft - (tWidth / 2);
        break;
      }
      case 'left':
      case 'right': {
        // Shifts the tooltips weight origin Y to the center, thus centering it vertically
        accuratePosition.top = tTop - (tHeight / 2);
        break;
      }
      default: {
        break;
      }
    }

    // Returns the fully accurate styles
    return Object.assign({}, estimatedPosition, accuratePosition);
  };

  /**
   * Debounces the edge detection because window resize fires like crazy
   * @returns {Function} - The debounced function
   */
  _debounceResize = () => debounce(this._handlePlacementUpdate, 10);

  _handlePlacementUpdate = () => {
    this.setState({placement: this._getValidPlacement(this.state.placement)});
  };

  _hideTooltip = () => {
    this.setState({
      shown: false,
      tooltipStyles: {}
    });
  };

  _showTooltip = () => {
    this.setState({
      shown: true,
      tooltipStyles: this._calculatePosition()
    });
  };

  _toggleTooltip = () => {
    if (this.state.shown) {
      this._hideTooltip();
      return;
    }

    this._showTooltip();
  };

  /**
   * Generates a valid placement by detecting potential browser edges
   * @param {String} defaultPlacement - The placement to default to if no valid one is detected
   * @return {String} - The valid placement
   */
  _getValidPlacement = (defaultPlacement) => {
    const {tooltip} = this.refs;

    // If theres no tooltip, we can't edge detect, therefore just return the user's provided
    // placement
    if (!this.refs.tooltip) return defaultPlacement;

    const {bottom, left, right, top, width} = findDOMNode(tooltip).getBoundingClientRect();
    const bottomTouching = bottom >= window.innerHeight;
    const leftTouching = left <= 0 || left < width;
    const rightTouching = right >= window.innerWidth || ((window.innerWidth - right) < width);
    const topTouching = top <= 0;
    const invalidPlacements = [];

    if (leftTouching) invalidPlacements.push('left');
    if (topTouching) invalidPlacements.push('top');
    if (bottomTouching) invalidPlacements.push('bottom');
    if (rightTouching) invalidPlacements.push('right');

    const validPlacements = ['top', 'left', 'bottom', 'right'].filter((p) => !invalidPlacements.includes(p));

    // If there is no valid placements or the user's placement is valid, we just use the user's placement
    if (
      !validPlacements.length ||
      validPlacements.length === PLACEMENTS.length ||
      validPlacements.includes(defaultPlacement)
    ) {
      return defaultPlacement;
    }

    // If the users placement is invalid, we use the first valid placement
    return validPlacements[0];
  };

}
