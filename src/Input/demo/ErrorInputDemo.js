import React, {Component} from 'react';
import Immutable from 'immutable';
import Input from '../Input';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';
import validators from '../utils/validators';

@pureRender
export default class ErrorInputDemo extends Component {

  static displayName = 'ErrorInputDemo';

  state = {
    error: null,
    value: ''
  }

  render() {
    const patternMatcher = Immutable.fromJS([
      validators.minMaxLength(3, 10,
        'Must be between 3 and 10 characters. This is also a super long error to show how it would wrap.'),
      validators.noLowerCase()
    ]);

    return (
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.label}>Error on change:</div>
          <Input
            className={styles.input}
            displayErrorOn='change'
            error={this.state.error}
            label='Type here...'
            onUpdate={this._handleUpdate}
            patternMatches={patternMatcher}
            value={this.state.value} />
        </div>
        <div className={styles.content}>
          <div className={styles.label}>Error on blur:</div>
          <Input
            className={styles.input}
            displayErrorOn='blur'
            error={this.state.error}
            label='Type here...'
            onUpdate={this._handleUpdate}
            patternMatches={patternMatcher}
            value={this.state.value} />
        </div>
        <div className={styles.content}>
          <div className={styles.label}>Always show error:</div>
          <Input
            className={styles.input}
            displayError={true}
            error={this.state.error}
            label='Type here...'
            onUpdate={this._handleUpdate}
            patternMatches={patternMatcher}
            value={this.state.value} />
        </div>
        <div className={styles.content}>
          <div className={styles.label}>Warning color:</div>
          <Input
            className={styles.input}
            displayError={true}
            error={this.state.error}
            errorType='warning'
            label='Type here...'
            onUpdate={this._handleUpdate}
            patternMatches={patternMatcher}
            value={this.state.value} />
        </div>
      </div>
    );
  }

  _handleUpdate = (value, error) => {
    this.setState({error, value});
  }
}
