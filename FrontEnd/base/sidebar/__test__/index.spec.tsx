import * as React from 'react';
import { mount } from 'enzyme';
import Sidebar from '../index';

describe('<Sidebar />', () => {
  test('highlight and switch', () => {
    const wrapper = mount(
      <Sidebar isLeft={true} width='350px' height='100%'>
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
      <Sidebar isLeft={true} width='350px' height='100%'>
        <Sidebar.Panel title='panel1'>
        </Sidebar.Panel>
      </Sidebar>);
    expect(wrapper_left.props().isLeft).toBe(true);
    expect(wrapper_left.find('.arrow').hasClass('arrow-left')).toBe(true);
    expect(wrapper_left.find('.arrow').hasClass('arrow-right')).toBe(false);
    expect(wrapper_left.find('.sidebar_container').prop('style').flexDirection).toBe('row');

    const wrapper_right = mount(
      <Sidebar isLeft={false} width='350px' height='100%'>
        <Sidebar.Panel title='panel1'>
        </Sidebar.Panel>
      </Sidebar>);
    expect(wrapper_right.props().isLeft).toBe(false);
    expect(wrapper_right.find('.arrow').hasClass('arrow-left')).toBe(false);
    expect(wrapper_right.find('.arrow').hasClass('arrow-right')).toBe(true);
    expect(wrapper_right.find('.sidebar_container').prop('style').flexDirection).toBe('row-reverse');
  });

  test('collapse', () => {
    const wrapper = mount(
      <Sidebar isLeft={true} width='350px' height='100%'>
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