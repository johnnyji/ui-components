import React, {Component} from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import RegularEditorDemo from './RegularEditorDemo';
import HighlightEditorDemo from './HighlightEditorDemo';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class RichTextEditorDemo extends Component {

  state = {
    selectedIndex: 0
  };

  render () {
    return (
      <Tabs
        className={styles.main}
        onSelect={this._handleSelect}
        selectedIndex={this.state.selectedIndex}>
        <TabList>
          <Tab>Regular Editor</Tab>
          <Tab>Highlight Editor</Tab>
        </TabList>
        <TabPanel className={styles.panel}><RegularEditorDemo /></TabPanel>
        <TabPanel className={styles.panel}><HighlightEditorDemo /></TabPanel>
      </Tabs>
    );
  }

  _handleSelect = (index) => {
    this.setState({selectedIndex: index});
  };
}
