import * as React from 'react';
import * as Enzyme from 'enzyme';
import Setting from '../index';
import Sidebar from '@base/sidebar';

describe('<Setting />', () => {
  test('<Sidebar/> can only contain <Sidebar.Panel/> ', () => {
    const setting = Enzyme.shallow(<Setting />);
    const sidebar = setting.find(Sidebar);
    sidebar.children().forEach((child) => {
      expect(child.type()).toEqual(Sidebar.Panel);
    });
  });
});