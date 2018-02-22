import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Studio from '../index';
import Sidebar from '@base/sidebar';

Enzyme.configure({ adapter: new Adapter() });

describe('<Studio />', () => {
  test('<Sidebar/> can only contain <Sidebar.Panel/> ', () => {
    const studio = Enzyme.shallow(<Studio />);
    const sidebar = studio.find(Sidebar);
    sidebar.children().forEach((child) => {
      expect(child.type()).toEqual(Sidebar.Panel);
    });
  });
});