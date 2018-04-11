import React from 'react';
import { shallow } from 'enzyme';
import { LayerItem } from '../index';

describe('<LayerItem />', () => {
  test('props', () => {
    const root = shallow(<LayerItem imgSrc='xxx.png' checked={false} />);

    expect(root.find('img').prop('src')).toBe('xxx.png');
    expect(root.find('.layer_check').prop('checked')).toBe(false);
  });

  test('onCheckChange', () => {
    const onCheckChange = jest.fn();
    const root = shallow(<LayerItem imgSrc='xxx.png' checked={false} onCheckChange={onCheckChange} />);
    root.find('.layer_check').prop('onChange')();
    expect(onCheckChange.mock.calls[0][0]).toBe(true);
  });
});
