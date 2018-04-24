import * as React from 'react';
import Item from '@components/setting-item';
import GlobalPalette from '@container/global-palette';
import { Context as StudioContext } from '@pages/studio';

import CanvasSize from '@container/canvas-size';

export default class GlobalSetting extends React.Component {
  render() {
    return (
      <StudioContext.Consumer>
        {({ updateStudioState, canvasSize, colors, charts }) => ([
          <Item name='屏幕大小' key='pageSize'>
            <CanvasSize updateStudioState={updateStudioState} canvasSize={canvasSize} />
          </Item>,
          <Item name='调色盘' key='colorPicker'>
            <GlobalPalette charts={charts} updateStudioState={updateStudioState} colors={colors} />
          </Item>
        ])}
      </StudioContext.Consumer>
    );
  }
}