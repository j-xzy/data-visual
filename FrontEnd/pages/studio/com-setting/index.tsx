import * as  React from 'react';
import { Collapse } from 'antd';
import update from 'immutability-helper';
import { Context as StudioContext } from '@pages/studio';
import StyleSetting from '@pages/studio/style-setting';
import DataSetting from '@pages/studio/data-setting';
import { idMapIndex } from '@pages/studio/canvas';
import { IChartConfig } from '@components/chart';
import { IUpdateChart } from '@lib/controls';
import Tab from '@base/tab';
const Panel = Tab.Panel;

const panelStyle = {
  background: '#000',
  border: 0,
  color: '#fff'
};

export default class ComSetting extends React.Component<undefined, undefined> {
  constructor(props: undefined) {
    super(undefined);
    this.renderSetting = this.renderSetting.bind(this);
  }

  renderSetting(chart: IChartConfig, colors: string[], updateChart: IUpdateChart) {
    const { controls: { style, data } } = chart;
    return (
      <Tab defaultActiveId='样式'>
        <Panel id='样式' tab='样式'>
          <Collapse bordered={false}>
            {style.map((control, idx) => {
              const { name, Component } = control;
              return (
                <Collapse.Panel key={name} header={name} style={panelStyle}>
                  <Component name={name} updateChart={updateChart} chart={chart} colors={colors} />
                </Collapse.Panel>);
            })}
          </Collapse>
        </Panel>
        <Panel id='数据' tab='数据'>
          {data.map((control, idx) => {
            const { name, Component } = control;
            return <Component key={name} name={name} updateChart={updateChart} chart={chart} colors={colors} />;
          })}
        </Panel>
      </Tab>
    );
  }

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

            return this.renderSetting(chart, colors, updateChart);
          }

          return <div style={{ color: '#fff' }}>todo...</div>;
        }}
      </StudioContext.Consumer>
    );
  }
}