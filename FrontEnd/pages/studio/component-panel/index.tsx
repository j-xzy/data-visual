import * as React from 'react';
import { Collapse } from 'antd';
import { barList, pieList } from '@lib/chart';
import { DragableChartPreview } from '@container/draggable-chart-preview';

import './style.styl';

const Panel = Collapse.Panel;

const panelStyle = {
  background: '#000',
  border: 0
};

export default class ComponentPanel extends React.PureComponent {
  render() {
    return (
      <Collapse bordered={false}>
        <Panel header='饼状图' key='1' style={panelStyle}>
          <ul>
            {
              pieList.map(({ name, imgSrc, option }) => {
                return <li className='component_panel_li' key={name}><DragableChartPreview imgSrc={imgSrc} option={option} name={name} /></li>;
              })
            }
          </ul>
        </Panel>
        <Panel header='柱状图' key='2' style={panelStyle}>
          <ul>
            {
              barList.map(({ name, imgSrc, option }) => {
                return <li className='component_panel_li' key={name}><DragableChartPreview imgSrc={imgSrc} option={option} name={name} /></li>;
              })
            }
          </ul>
        </Panel>
        <Panel header='地图' key='3' style={panelStyle}>
          <div>这是地图</div>
        </Panel>
      </Collapse>
    );
  }
}