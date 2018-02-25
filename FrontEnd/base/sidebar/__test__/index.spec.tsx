import * as React from 'react';
import { mount } from 'enzyme';
import Sidebar from '../index';

describe('<Sidebar />', () => {
  test('highlight and switch', () => {
    const wrapper = mount(
      <Sidebar>
        <Sidebar.Panel title='panel1'>
          <div>panel1</div>
        </Sidebar.Panel>
        <Sidebar.Panel title='panel2'>
          <div>panel2</div>
        </Sidebar.Panel>
      </Sidebar>);
    expect(wrapper.find('ul li').at(0).hasClass('bright')).toBe(true);
    expect(wrapper.find('ul li').at(1).hasClass('bright')).toBe(false);
    expect(wrapper.find('.sidebar_panels').contains(<div>panel1</div>)).toBe(true);
    expect(wrapper.find('.sidebar_panels').contains(<div>panel2</div>)).toBe(false);

    wrapper.find('ul li').at(1).simulate('click');

    expect(wrapper.find('ul li').at(0).hasClass('bright')).toBe(false);
    expect(wrapper.find('ul li').at(1).hasClass('bright')).toBe(true);
    expect(wrapper.find('.sidebar_panels').contains(<div>panel1</div>)).toBe(false);
    expect(wrapper.find('.sidebar_panels').contains(<div>panel2</div>)).toBe(true);
  });

  test('side', () => {
    const wrapper_left = mount(
      <Sidebar mode='left'>
        <Sidebar.Panel title='panel1'>
        </Sidebar.Panel>
      </Sidebar>);
    expect(wrapper_left.props().mode).toBe('left');
    expect(wrapper_left.find('.sidebar_container').hasClass('sidebar_container_right')).toBe(false);

    const wrapper_right = mount(
      <Sidebar mode='right'>
        <Sidebar.Panel title='panel1'>
        </Sidebar.Panel>
      </Sidebar>);
    expect(wrapper_right.props().mode).toBe('right');
    expect(wrapper_right.find('.sidebar_container').hasClass('sidebar_container_right')).toBe(true);
  });

  test('collapse', () => {
    const wrapper = mount(
      <Sidebar>
        <Sidebar.Panel title='panel1'>
          <div>panel1</div>
        </Sidebar.Panel>
      </Sidebar>);
      expect(wrapper.find('.sidebar_panels').hasClass('collapse')).toBe(false);
      expect(wrapper.state('isCollapsed')).toBe(false);
      wrapper.find('.arrow').simulate('click');
      expect(wrapper.find('.sidebar_panels').hasClass('collapse')).toBe(true);
      expect(wrapper.state('isCollapsed')).toBe(true);
  });
});