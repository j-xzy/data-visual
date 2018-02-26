import * as  React from 'react';
import Sidebar from '@base/sidebar';
import Item from '@components/setting-item';

export default class ComSetting extends React.Component {
  render() {
    return (
      [
        <Item name='1' key='1' />
        ,
        <Item name='2' key='2'/>
      ]
    );
  }
}