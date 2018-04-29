import * as React from 'react';
import { Collapse } from 'antd';
import { barList, pieList, lineList, scatterList } from '@charts';
import { DragableChartPreview } from '@container/draggable-chart-preview';
import { DragableSplit } from '@container/draggable-split';

import './style.styl';

const Panel = Collapse.Panel;

const panelStyle = {
  background: '#000',
  border: 0
};

export default class ComponentPanel extends React.PureComponent {
  render() {
    return (
      <div >
        <div className='component_collapse'>
          <Collapse bordered={false}>
            <Panel header='饼状图' key='1' style={panelStyle}>
              <ul>
                {
                  pieList.map(({ name, imgSrc, option, controls, type, seriesItemTemplate }) => {
                    return <li className='component_panel_li' key={name}><DragableChartPreview seriesItemTemplate={seriesItemTemplate} type={type} controls={controls} imgSrc={imgSrc} option={option} name={name} /></li>;
                  })
                }
              </ul>
            </Panel>
            <Panel header='柱状图' key='2' style={panelStyle}>
              <ul>
                {
                  barList.map(({ name, imgSrc, option, controls, type, seriesItemTemplate }) => {
                    return <li className='component_panel_li' key={name}><DragableChartPreview seriesItemTemplate={seriesItemTemplate} type={type} controls={controls} imgSrc={imgSrc} option={option} name={name} /></li>;
                  })
                }
              </ul>
            </Panel>
            <Panel header='线状图' key='3' style={panelStyle}>
              <ul>
                {
                  lineList.map(({ name, imgSrc, option, controls, type, seriesItemTemplate }) => {
                    return <li className='component_panel_li' key={name}><DragableChartPreview seriesItemTemplate={seriesItemTemplate} type={type} controls={controls} imgSrc={imgSrc} option={option} name={name} /></li>;
                  })
                }
              </ul>
            </Panel>
            <Panel header='散点图' key='4' style={panelStyle}>
              <ul>
                {
                  scatterList.map(({ name, imgSrc, option, controls, type, seriesItemTemplate }) => {
                    return <li className='component_panel_li' key={name}><DragableChartPreview seriesItemTemplate={seriesItemTemplate} type={type} controls={controls} imgSrc={imgSrc} option={option} name={name} /></li>;
                  })
                }
              </ul>
            </Panel>
            <Panel header='地图' key='5' style={panelStyle}>
              <div>这是地图</div>
            </Panel>
          </Collapse>
        </div>
        <div className='split'>
          <DragableSplit mode='vertical' />
          <DragableSplit mode='horizontal' />
        </div>
      </div>
    );
  }
}