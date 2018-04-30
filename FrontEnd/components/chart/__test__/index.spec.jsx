import React from 'react';
import { shallow, mount } from 'enzyme';
import { Chart } from '../index';

const option = {
  series: [
    {
      type: 'pie',
      radius: '55%',
      data: [
        { value: 35, name: 'foo' },
        { value: 20, name: 'bar' },
      ]
    }
  ]
};

const scale = {
  x: 1,
  y: 1
};

const size = {
  width: 300,
  height: 300
};

const position = {
  left: 0,
  top: 0,
  zIndex: 0
}

const index = 10;
const id = 123123;

describe('<Chart />', () => {
  test('Click', () => {
    const chartClick = jest.fn();
    const wrapper = shallow(
      <Chart
        option={option} scale={scale} id={id}
        size={size} position={position}
        index={index} onChartClick={chartClick} >
      </Chart>
    );
    wrapper.simulate('click');
    expect(chartClick.mock.calls[0][1]).toBe(id);
  });

  test('Change the size of the Chart will refresh', async () => {
    const chartClick = jest.fn();
    const wrapper = mount(
      <Chart
        option={option} scale={scale}
        size={size} position={position}
        index={index} onChartClick={chartClick} >
      </Chart>
    );
    await wrapper.instance().componentDidMount();
    const lastChart = wrapper.instance().chart;

    wrapper.setProps({ size: { width: 300, height: 300 } });
    let nextChart = wrapper.instance().chart;

    expect(lastChart).toEqual(nextChart);

    wrapper.setProps({ size: { width: 310, height: 300 } });
    nextChart = wrapper.instance().chart;
    expect(lastChart).not.toEqual(nextChart);
  });

  test('mode === "responsive"', () => {
    // todo
  });
});
