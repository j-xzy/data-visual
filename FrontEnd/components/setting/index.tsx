import * as React from 'react';
import Sidebar from '@base/sidebar';
import ComSetting from '@components/com-setting';
import PageSetting from '@components/page-setting';
import { Context as StudioContext } from '@pages/studio';
import './style.styl';

const Panel = Sidebar.Panel;

export default class Setting extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <StudioContext.Consumer>
        {({ updateCanvasPos}: any) => (
          <Sidebar onOpenChangeAfter={() => updateCanvasPos()} className='setting' mode='right' width='360px' height='100%'>
            <Panel title='页面设置'>
              <PageSetting />
            </Panel>
            <Panel title='组件设置'>
              <ComSetting />
            </Panel>
          </Sidebar>
        )}
      </StudioContext.Consumer>
    );
  }
}