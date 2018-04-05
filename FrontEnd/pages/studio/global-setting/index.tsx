import * as React from 'react';
import Item from '@components/setting-item';
import { Context as StudioContext } from '@pages/studio';
import ColorInputGroup from '@components/color-input-group';
import CanvasSize from '@container/canvas-size';

export default class GlobalSetting extends React.Component {
  render() {
    return (
      <StudioContext.Consumer>
        {({ updateStudioState, canvasSize, colors }) => ([
          <Item name='屏幕大小' key='pageSize'>
            <CanvasSize updateStudioState={updateStudioState} canvasSize={canvasSize} />
          </Item>,
          <Item name='调色盘' key='colorPicker'>
            <ColorInputGroup updateStudioState={updateStudioState} colors={colors} />
          </Item>
        ])}
      </StudioContext.Consumer>
    );
  }
}