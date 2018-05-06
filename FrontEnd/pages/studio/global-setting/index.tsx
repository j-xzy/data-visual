import * as React from 'react';
import Item from '@components/setting-item';
import GlobalPalette from '@container/global-palette';
import { Switch, Radio } from 'antd';
import { Context as StudioContext } from '@pages/studio';
import CanvasSize from '@container/canvas-size';

const RadioGroup = Radio.Group;

export default class GlobalSetting extends React.Component {
  render() {
    return (
      <StudioContext.Consumer>
        {({ updateStudioState, canvasSize, colors, charts, isBorder, zoomType }) => (
          <div style={{ height: 'calc(100vh - 106px)' }}>
            <Item name='屏幕大小' key='pageSize'>
              <CanvasSize updateStudioState={updateStudioState} canvasSize={canvasSize} />
            </Item>,
          <Item name='调色盘' key='colorPicker'>
              <GlobalPalette charts={charts} updateStudioState={updateStudioState} colors={colors} />
            </Item>,
          <Item name='显示边框' key='showBorder'>
              <Switch checked={isBorder} onChange={(checked) => updateStudioState({ isBorder: checked })} />
            </Item>,
            <Item name='缩放方式' key='zoomType' >
              <RadioGroup value={zoomType} onChange={(e: any) => updateStudioState({ zoomType: e.target.value })}>
                <Radio value='width' style={{ color: '#fff', marginBottom: '3px', fontSize: '12px' }}>等比缩放宽度铺满</Radio>
                <Radio value='height' style={{ color: '#fff', marginBottom: '3px', fontSize: '12px' }}>等比缩放高度铺满</Radio>
                <Radio value='full' style={{ color: '#fff', fontSize: '12px' }}>全屏铺满</Radio>
              </RadioGroup>
            </Item>,
          </div>
        )}
      </StudioContext.Consumer>
    );
  }
}