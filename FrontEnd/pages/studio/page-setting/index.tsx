import * as React from 'react';
import Item from '@components/setting-item';
import { Context as StudioContext } from '@pages/studio';
import CanvasSize from '@container/canvas_size';

export default class PageSetting extends React.Component {
  render() {
    return (
      <StudioContext.Consumer>
        {({ updateStudioState, canvasSize }) => ([
          <Item name='屏幕大小' key='pageSize'>
            <CanvasSize updateStudioState={updateStudioState} canvasSize={canvasSize} />
          </Item>
        ])}
      </StudioContext.Consumer>
    );
  }
}