import React, {Component} from 'react';
import Button from '../../Button/Button';
import Immutable from 'immutable';
import Icon from '../../Icon/Icon';
import Tooltip from '../Tooltip';
import TooltipAnchor from '../TooltipAnchor';
import {PLACEMENTS} from '../config';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

const tooltip1 = (
  <Tooltip>I'm some tooltip giving you info!</Tooltip>
);

const tooltip2 = (
  <Tooltip>
    <Icon name='alert' />
    Oh shit! You did something wrong
  </Tooltip>
);

@pureRender
export default class RegularTooltipDemo extends Component {

  static displayName = 'RegularTooltipDemo';

  state = {
    placement: 'top'
  };
  
  render() {
    return (
      <div className={styles.main}>
        <header className={styles.header}>
          {this._renderPlacements()}
        </header>
        <main className={styles.content}>
          <TooltipAnchor
            tooltip={tooltip1}
            placement={this.state.placement}
            triggers={Immutable.List(['hover'])}>
            <Button>Hover me for a tooltip!</Button>
          </TooltipAnchor>
          <TooltipAnchor
            tooltip={tooltip2}
            placement={this.state.placement}
            triggers={Immutable.List(['click'])}>
            <Button>Click me for a tooltip!</Button>
          </TooltipAnchor>
        </main>
      </div>
    );
  }

  _renderPlacements = () => {
    return PLACEMENTS.map((placement, i) => {
      return (
        <Button
          active={this.state.placement === placement}
          key={i}
          name={placement}
          onClick={this._handleSetPlacement}>
          {placement}
        </Button>
      );
    });
  };

  _handleSetPlacement = (placement) => {
    this.setState({placement});
  };

}
