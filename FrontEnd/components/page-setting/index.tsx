import * as React from 'react';
import Item from '@components/setting-item';
import PageSize from './size';

export default class PageSetting extends React.Component {
  render() {
    return (
      [
        <Item name='屏幕大小' key='pageSize'>
          <PageSize />
        </Item>
      ]
    );
  }
}