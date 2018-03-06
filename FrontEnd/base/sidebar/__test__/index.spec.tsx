import * as React from 'react';
import { mount } from 'enzyme';
import Sidebar from '../index';

describe('<Sidebar />', () => {
  test('highlight and switch', () => {
    const wrapper = mount(
      <Sidebar>
        <Sidebar.Panel className='p1' title='panel1'>
          <div>panel1</div>
        </Sidebar.Panel>
        <Sidebar.Panel className='p2' title='panel2'>
          <div>panel2</div>
        </Sidebar.Panel>
      </Sidebar>);
    expect(wrapper.find('ul li').at(0).hasClass('bright')).toBe(true);
    expect(wrapper.find('ul li').at(1).hasClass('bright')).toBe(false);
    expect(wrapper.find('.p1').at(1).prop('style').display).toBe('block');
    expect(wrapper.find('.p2').at(1).prop('style').display).toBe('none');

    wrapper.find('ul li').at(1).simulate('click');

    expect(wrapper.find('ul li').at(0).hasClass('bright')).toBe(false);
    expect(wrapper.find('ul li').at(1).hasClass('bright')).toBe(true);
    expect(wrapper.find('.p1').at(1).prop('style').display).toBe('none');
    expect(wrapper.find('.p2').at(1).prop('style').display).toBe('block');
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
    const onOpenChange = jest.fn();
    const wrapper = mount(
      <Sidebar onOpenChangeAfter={onOpenChange}>
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