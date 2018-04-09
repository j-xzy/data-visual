import * as  React from 'react';
import update from 'immutability-helper';
import { Context as StudioContext } from '@pages/studio';
import StyleSetting from '@pages/studio/style-setting';
import { idMapIndex } from '@pages/studio/canvas';
import { IChartConfig } from '@components/chart';
import Tab from '@base/tab';

const Panel = Tab.Panel;

export default class ComSetting extends React.Component {
  render() {
    return (
      <StudioContext.Consumer>
        {({ charts, choosedChartIds, colors, updateStudioState }) => {
          if (choosedChartIds.length === 0) {
            return <div style={{ color: '#fff' }}>未选择组件</div>;
          }

          if (choosedChartIds.length === 1) {
            const id = choosedChartIds[0];
            const idx = idMapIndex.get(id);
            const chart = charts[idx];

            function updateChart(chartConfig: IChartConfig, callback?: () => void) {
              updateStudioState({
                charts: update(charts, {
                  [idx]: { $set: chartConfig }
                })
              }, () => { typeof callback === 'function' && callback(); });
            }

            return (
              <Tab defaultActiveId='样式'>
                <Panel id='样式' tab='样式'>
                  <StyleSetting chart={chart} colors={colors} updateChart={updateChart} />
                </Panel>
                <Panel id='数据' tab='数据'>
                  <div style={{ color: '#fff' }}>数据</div>
                </Panel>
              </Tab>
            );
          }

          return <div style={{ color: '#fff' }}>todo...</div>;
        }}
      </StudioContext.Consumer>
    );
  }
}