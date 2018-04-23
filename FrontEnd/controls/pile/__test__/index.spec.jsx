import * as React from 'react';
import { shallow } from 'enzyme';
import { Switch, Select } from 'antd';
import Pile from '../index';

const chart = {
  option: {
    series: [
      {
        stack: 'foo'
      },
      {
        stack: 'bar'
      },
      {
        stack: null
      },
    ]
  }
};

describe('Pile', () => {
  test('handleSeriesChange', () => {
    const root = shallow(<Pile chart={chart} />);
    expect(root.find('input').prop('value')).toBe('foo');

    root.find(Select).prop('onChange')(1);
    root.update();
    expect(root.find('input').prop('value')).toBe('bar');

    root.find(Select).prop('onChange')(2);
    root.update();
    expect(root.find(Switch).prop('checked')).toBe(false);
    expect(root.find('input').length).toBe(0);
  });

  test('handleSwitchChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Pile chart={chart} updateChart={updateChart} />);
    root.find(Switch).prop('onChange')(false);

    expect(updateChart.mock.calls[0][0].option.series[0].stack).toBe(null);
    expect(updateChart.mock.calls[0][0].option.series[1].stack).toBe('bar');
    expect(updateChart.mock.calls[0][0].option.series[2].stack).toBe(null);
  });

  test('handleInputChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Pile chart={chart} updateChart={updateChart} />);
    root.find('input').prop('onChange')({ target: { value: 'bar' } });

    expect(updateChart.mock.calls[0][0].option.series[0].stack).toBe('bar');
  });

  test('series.length = 0', () => {
    let newChart = {
      option: { series: [] }
    };
    const root = shallow(<Pile chart={newChart} />);
    expect(root.html().includes('系列为空')).toBe(true);
  });

  test('select > series.length ', () => {
    const updateChart = jest.fn();
    const root = shallow(<Pile chart={chart} updateChart={updateChart} />);

    root.find(Select).prop('onChange')(2);
    root.update();
    expect(root.find(Select).prop('value')).toBe(2);

    let newChart = {
      option: {
        series: [{ stack: 'foo' }]
      }
    };

    root.setProps({
      chart: newChart
    });
    root.update();
    expect(root.find(Select).prop('value')).toBe(0);
  });

  test('stack === undefined ', () => {
    const updateChart = jest.fn();
    const newChart = {
      option: {
        series: [{}]
      }
    };
    const root = shallow(<Pile chart={newChart} />);

    expect(root.find(Switch).prop('checked')).toBe(false);
    expect(root.find('input').length).toBe(0);
  });
});