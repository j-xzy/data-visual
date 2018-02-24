import * as React from 'react';
import { Collapse } from 'antd';
import Sidebar from '@base/sidebar';
import './style.styl';

const Panel = Collapse.Panel;

const panelStyle = {
  background: '#000',
  border: 0
};

export default class Studio extends React.Component {
  render() {
    return (
      <div className='studio'>
        <Sidebar isLeft={true} width='270px' height='100%'>
          <Sidebar.Panel title='组件'>
            <Collapse bordered={false}>
              <Panel header='饼状图' key='1' style={panelStyle}>
                <p>这是饼状图</p>
              </Panel>
              <Panel header='柱状图' key='2' style={panelStyle}>
                <div>这是柱状图</div>
              </Panel>
              <Panel header='地图' key='3' style={panelStyle}>
                <div>这是地图</div>
              </Panel>
            </Collapse>
          </Sidebar.Panel>
          <Sidebar.Panel title='图层'>
            <div>this is layer</div>
          </Sidebar.Panel>
        </Sidebar>
        <div className='st_content'></div>
        <div className='st_right_side'>
        </div>
      </div>
    );
  }
}