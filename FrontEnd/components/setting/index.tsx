import * as React from 'react';
import Sidebar from '@base/sidebar';

export default class Setting extends React.Component {
  render() {
    return (
      <Sidebar className='setting' mode='right' width='270px' height='100%'>
        <Sidebar.Panel title='设置'>
          <div>this is settings</div>
        </Sidebar.Panel>
      </Sidebar>
    );
  }
}