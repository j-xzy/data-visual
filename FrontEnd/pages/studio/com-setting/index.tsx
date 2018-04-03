import * as  React from 'react';
import Tab from '@base/tab';

const Panel = Tab.Panel;

export default class ComSetting extends React.Component {
  render() {
    return (
      <Tab defaultActiveId='样式'>
        <Panel id='样式' tab='样式'>
          <div style={{ color: '#fff' }}>样式</div>
        </Panel>
        <Panel id='数据' tab='数据'>
          <div style={{ color: '#fff' }}>数据</div>
        </Panel>
      </Tab>
    );
  }
}