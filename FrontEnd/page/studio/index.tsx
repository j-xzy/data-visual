import * as React from 'react';
import Sidebar from '@base/sidebar';
import './style.styl';

export default class Studio extends React.Component {
  render() {
    return (
      <div className='studio'>
        <div className='st_left_side'>
          <Sidebar width='100%' height='100%'>
            <Sidebar.Panel title='组件' icon='icon-component'>
              <div>this is component</div>
            </Sidebar.Panel>
            <Sidebar.Panel title='图层' icon='icon-layers'>
              <div>this is layer</div>
            </Sidebar.Panel>
          </Sidebar>
        </div>
        <div className='st_content'></div>
        <div className='st_right_side'>
        </div>
      </div>
    );
  }
}