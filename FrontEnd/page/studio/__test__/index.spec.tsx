import * as React from 'react';
import * as Enzyme from 'enzyme';
import Studio from '../index';
import Sidebar from '@base/sidebar';

describe('<Studio />', () => {
  test('<Sidebar/> can only contain <Sidebar.Panel/> ', () => {
    const studio = Enzyme.shallow(<Studio />);
    const sidebar = studio.find(Sidebar);
    sidebar.children().forEach((child) => {
      expect(child.type()).toEqual(Sidebar.Panel);
    });
  });
});