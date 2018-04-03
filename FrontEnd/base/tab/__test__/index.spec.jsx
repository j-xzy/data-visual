import React from 'react';
import { mount } from 'enzyme';
import Tab from '../index';

const Panel = Tab.Panel;

describe('<Tab />', () => {
  const root = mount(
    <Tab defaultActiveId='1'>
      <Panel id='1' tab='1'>1</Panel>
      <Panel id='2' tab='2'>2</Panel>
    </Tab>);

  test('Switch tab', () => {
    expect(root.find('.tab_title').at(0).prop('className').includes('tab_active_title')).toBe(true);
    expect(root.find('.tab_title').at(1).prop('className').includes('tab_active_title')).toBe(false);

    expect(root.find('.tab_content').at(0).prop('style').display).toBe('block');
    expect(root.find('.tab_content').at(1).prop('style').display).toBe('none');

    root.find('.tab_title').at(1).simulate('click');

    expect(root.find('.tab_title').at(0).prop('className').includes('tab_active_title')).toBe(false);
    expect(root.find('.tab_title').at(1).prop('className').includes('tab_active_title')).toBe(true);

    expect(root.find('.tab_content').at(0).prop('style').display).toBe('none');
    expect(root.find('.tab_content').at(1).prop('style').display).toBe('block');
  });
});