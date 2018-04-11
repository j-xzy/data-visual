import React from 'react';
import { shallow } from 'enzyme';
import { DragableChartPreview } from '../index';

describe('<DragableChartPreview />', () => {
  test('props', () => {
    const OriginDragableChartPreview = DragableChartPreview.DecoratedComponent;
    const identity = el => el,
      option = {},
      imgSrc = '123',
      controls = {};
    const root = shallow(<OriginDragableChartPreview option={option} imgSrc={imgSrc} controls={controls} connectDragSource={identity} connectDragPreview={() => { }} />);
    expect(root.childAt(0).prop('option')).toBe(option);
    expect(root.childAt(0).prop('imgSrc')).toBe(imgSrc);
    expect(root.childAt(0).prop('controls')).toBe(controls);
  });
});
