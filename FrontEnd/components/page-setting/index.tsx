import * as React from 'react';
import Item from '@components/setting-item';
import { Context as StudioContext } from '@pages/studio';
import PageSize from './size';

export default class PageSetting extends React.Component {
  render() {
    return (
      <StudioContext.Consumer>
        {({ changeCanvasSize, defaultCanvasSize}) => ([
          <Item name='屏幕大小' key='pageSize'>
            <PageSize changeCanvasSize={changeCanvasSize} defaultCanvasSize={defaultCanvasSize} />
          </Item>
        ])}
      </StudioContext.Consumer>
    );
  }
}