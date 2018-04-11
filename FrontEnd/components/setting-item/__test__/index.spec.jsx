import React from 'react';
import { shallow } from 'enzyme';
import Item from '../index';

describe('<SettingItem />', () => {
  test('props', () => {
    const root = shallow(<Item imgSrc='xxx.png' name='normal' ><div>child</div></Item>);
    expect(root.find('.setting-item-name').html()).toBe('<span class="setting-item-name">normal</span>');
    expect(root.find('.setting-item-container').html()).toBe('<div class="setting-item-container"><div>child</div></div>');
  });
});
