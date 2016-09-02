import React, {Component} from 'react';
import Button from '../../Button/Button.js';
import Immutable from 'immutable';
import Tooltip from '../Tooltip';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class RegularTooltipDemo extends Component {

  static displayName = 'RegularTooltipDemo';

  state = {
    placement: 'top'
  };
  
  render() {
    console.log(this.state.placement);
    return (
      <div className={styles.main}>
        <header className={styles.header}>
          {this._renderPlacements()}
        </header>
        <main>
          <Tooltip
            tooltip={<div>Woooahahh dude</div>}
            placement={this.state.placement}
            triggers={Immutable.List(['click'])}>
            <Button>Hover me for a tooltip!</Button>
          </Tooltip>
        </main>
      </div>
    );
  }

  _renderPlacements = () => {
    return ['top', 'right', 'bottom', 'left'].map((placement, i) => {
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
