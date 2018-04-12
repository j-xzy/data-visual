import React from 'react';
import { mount } from 'enzyme';
import Tab from '../index';

const Panel = Tab.Panel;

class Foo extends React.Component {
  render() {
    return <div>foo</div>;
  }
}

describe('<Tab />', () => {
  test('Switch tab', () => {
    const root = mount(
      <Tab defaultActiveId='1'>
        <Panel id='1' tab='1'>1</Panel>
        <Panel id='2' tab='2'>2</Panel>
      </Tab>);

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

  test('onTabClick', () => {
    const onTabClick = jest.fn();
    const root = mount(
      <Tab defaultActiveId='1'>
        <Panel id='1' tab='1'>1</Panel>
        <Panel id='2' tab='2' onTabClick={onTabClick}>2</Panel>
      </Tab>);
    expect(onTabClick.mock.calls.length).toBe(0);

    root.find('.tab_title').at(1).simulate('click');

    expect(onTabClick.mock.calls[0]).toEqual(['2', '2']);
  });

  test('forceUpdate', () => {
    // todo
  });
});