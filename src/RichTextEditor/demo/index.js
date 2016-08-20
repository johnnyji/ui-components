import React, {Component} from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import HighlightEditorDemo from './HighlightEditorDemo';
import pureRender from 'pure-render-decorator';

@pureRender
export default class RichTextEditorDemo extends Component {

  state = {
    selectedIndex: 0
  };

  render () {
    return (
      <Tabs
        onSelect={this._handleSelect}
        selectedIndex={this.state.selectedIndex}>
        <TabList>
          <Tab>Highlight Editor</Tab>
        </TabList>
        <TabPanel><HighlightEditorDemo /></TabPanel>
      </Tabs>
    );
  }

  _handleSelect = (index) => {
    this.setState({selectedIndex: index});
  };
}
