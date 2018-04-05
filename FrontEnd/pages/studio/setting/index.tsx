import * as React from 'react';
import Sidebar from '@base/sidebar';
import ComSetting from '@pages/studio/com-setting';
import GlobalSetting from '@pages/studio/global-setting';
import { Context as StudioContext } from '@pages/studio';
import './style.styl';

const Panel = Sidebar.Panel;

export default class Setting extends React.Component {
  render() {
    return (
      <StudioContext.Consumer>
        {({ updateCanvasPos}: any) => (
          <Sidebar onOpenChangeAfter={() => updateCanvasPos()} className='setting' mode='right' width='320px' height='100%'>
            <Panel title='全局设置'>
              <GlobalSetting />
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