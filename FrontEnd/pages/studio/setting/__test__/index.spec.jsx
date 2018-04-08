import React from 'react';
import Enzyme from 'enzyme';
import Setting from '../index';
import Sidebar from '@base/sidebar';
import GlobalSetting from '@pages/studio/global-setting';
import ComSetting from '@pages/studio/com-setting'

describe('<Setting />', () => {
  test('<Sidebar/> only contain <Sidebar.Panel/> ', () => {
    const setting = Enzyme.shallow(<Setting />);
    const sidebar = setting.find(Sidebar);
    sidebar.children().forEach((child) => {
       expect(child.type()).toEqual(Sidebar.Panel);
    });
  });

  test('<Setting/> contain <PageSetting /> and <ComSetting />', () => {
    // todo
  });
});