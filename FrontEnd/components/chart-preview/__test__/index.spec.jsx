import React from 'react';
import { shallow } from 'enzyme';
import { ChartPreview } from '../index';

describe('<ChartPreview />', () => {
  test('props', () => {
    const root = shallow(<ChartPreview imgSrc='xxx.png' name='normal' />);

    expect(root.find('img').prop('src')).toBe('xxx.png');
    expect(root.find('span').html()).toBe('<span>normal</span>');

    root.setProps({
      imgSrc: 'foo.png',
      name: 'bar'
    });

    expect(root.find('img').prop('src')).toBe('foo.png');
    expect(root.find('span').html()).toBe('<span>bar</span>');
  });
});
