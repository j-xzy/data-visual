import * as React from 'react';
import * as Enzyme from 'enzyme';
import Leftbar from '../index';
import Sidebar from '@base/sidebar';

describe('<Leftbar />', () => {
  test('<Sidebar/> can only contain <Sidebar.Panel/> ', () => {
    const leftbar = Enzyme.shallow(<Leftbar />);
    const sidebar = leftbar.find(Sidebar);
    sidebar.children().forEach((child) => {
      expect(child.type()).toEqual(Sidebar.Panel);
    });
  });
});