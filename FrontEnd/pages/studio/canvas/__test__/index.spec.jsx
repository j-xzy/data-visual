import React from 'react';
import { mount } from 'enzyme';
import { Canvas } from '../index';
import { Chart } from '@components/chart';
import { TransformTool } from '@components/transform-tool';

const option = {
  series: [
    {
      type: 'pie',
      radius: '55%',
      data: [
        { value: 35, name: '视频' }
      ]
    }
  ]
};

const position = {
  left: 0,
  top: 0,
  zIndex: 0
};

const size = {
  width: 300,
  height: 300
};

describe('<Canvas />', () => {
  let wrapper;

  beforeEach(() => {
    const OriginCanvas = Canvas.DecoratedComponent;
    const identity = el => el;
    wrapper = mount(<OriginCanvas onChartClick={() => { }} connectDropTarget={identity} />);
    wrapper.instance().appendChart(option, position, size);
    wrapper.update();
    wrapper.setProps({ isShowTransformTool: true });
    wrapper.find(Chart).find('.chart-container').prop('onClick')();
    wrapper.update();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('<Chart /> and <TransformTool/> are the same size and position', () => {
    expect(wrapper.find(Chart).prop('position')).toEqual(position);
    expect(wrapper.find(Chart).prop('size')).toEqual(size);
    expect(wrapper.find(TransformTool).prop('size')).toEqual(size);
  });

  test('move', () => {
    wrapper.setProps({canvasScale:1});
    wrapper.find('.transform_tool').simulate('mouseDown', { clientX: 150, clientY: 150 });
    wrapper.simulate('mouseMove', { clientX: 200, clientY: 200 });
    wrapper.simulate('mouseUp');
    wrapper.update();
    console.log(wrapper.find(Chart).prop('position'));
  });
});