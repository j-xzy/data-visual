import * as React from 'react';
import { mount } from 'enzyme';
import Sidebar from '../index';

describe('<Sidebar />', () => {
  const wrapper = mount(
    <Sidebar isLeft={true} width='350px' height='100%'>
      <Sidebar.Panel>
        <div>panel1</div>
      </Sidebar.Panel>
      <Sidebar.Panel>
        <div>panel2</div>
      </Sidebar.Panel>
    </Sidebar>);
  test('highlight and switch', () => {
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
  test('collapse panel', () => {
  });
});