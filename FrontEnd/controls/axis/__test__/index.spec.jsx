import React from 'react';
import { shallow, mount } from 'enzyme';
import { Switch, InputNumber, Select } from 'antd';
import ColorInput from '@components/color-input';
import Axis from '../index';

const chart = {
  option: {
    xAxis: {
      show: true,
      type: 'category',
      data: ['Mon', 'Tue', 'Wed'],
      name: 'foo',
      nameTextStyle: {
        fontStyle: 'normal',
        color: '#fff',
        fontSize: 12,
        fontWeight: 'normal'
      },
      axisLine: {
        lineStyle: {
          color: '#333',
          type: 'solid',
          width: 1
        }
      }
    },
    yAxis: {
      show: true,
      name: '',
      type: 'value',
      nameTextStyle: {
        color: '#333',
        fontWeight: 'normal',
        fontSize: 12,
        fontStyle: 'normal'
      },
      axisLine: {
        lineStyle: {
          color: '#333',
          type: 'solid',
          width: 1
        }
      }
    },
  }
};

describe('<Axis />', () => {
  test('handleShowChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Axis chart={chart} axisType='xAxis' updateChart={updateChart} />);
    root.find(Switch).at(0).prop('onChange')(false);

    expect(updateChart.mock.calls[0][0].option.xAxis.show).toBe(false);
  });

  test('handleNameChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Axis chart={chart} axisType='xAxis' updateChart={updateChart} />);
    root.find('input').at(1).prop('onChange')({ target: { value: 'bar' } });

    expect(updateChart.mock.calls[0][0].option.xAxis.name).toBe('bar');
  });

  test('handleNameColorChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Axis chart={chart} axisType='xAxis' updateChart={updateChart} />);
    root.find(ColorInput).at(0).prop('onColorChange')('#000');

    expect(root.state().nameColor).toBe('#000');
  });

  test('handleNameColorComplete', () => {
    const updateChart = jest.fn();
    const root = shallow(<Axis chart={chart} axisType='xAxis' updateChart={updateChart} />);
    root.find(ColorInput).at(0).prop('onColorComplete')('red');

    expect(updateChart.mock.calls[0][0].option.xAxis.nameTextStyle.color).toBe('red');
  });

  test('handleNameSizeChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Axis chart={chart} axisType='xAxis' updateChart={updateChart} />);
    root.find(InputNumber).at(0).prop('onChange')(100);

    expect(updateChart.mock.calls[0][0].option.xAxis.nameTextStyle.fontSize).toBe(100);
  });

  test('handleNameWeightChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Axis chart={chart} axisType='xAxis' updateChart={updateChart} />);
    root.find(Select).at(0).prop('onChange')('bold');

    expect(updateChart.mock.calls[0][0].option.xAxis.nameTextStyle.fontWeight).toBe('bold');
  });

  test('handleNameStyleChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Axis chart={chart} axisType='xAxis' updateChart={updateChart} />);
    root.find(Select).at(1).prop('onChange')('italic');

    expect(updateChart.mock.calls[0][0].option.xAxis.nameTextStyle.fontStyle).toBe('italic');
  });

  test('handleAxisColorChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Axis chart={chart} axisType='xAxis' updateChart={updateChart} />);
    root.find(ColorInput).at(1).prop('onColorChange')('blue');

    expect(root.state().axisColor).toBe('blue');
  });

  test('handleAxisColorComplete', () => {
    const updateChart = jest.fn();
    const root = shallow(<Axis chart={chart} axisType='xAxis' updateChart={updateChart} />);
    root.find(ColorInput).at(1).prop('onColorComplete')('yellow');

    expect(updateChart.mock.calls[0][0].option.xAxis.axisLine.lineStyle.color).toBe('yellow');
  });

  test('handleAxisWidth', () => {
    const updateChart = jest.fn();
    const root = shallow(<Axis chart={chart} axisType='xAxis' updateChart={updateChart} />);
    root.find(InputNumber).at(1).prop('onChange')(123);

    expect(updateChart.mock.calls[0][0].option.xAxis.axisLine.lineStyle.width).toBe(123);
  });

  test('handleAxisStyleType', () => {
    const updateChart = jest.fn();
    const root = shallow(<Axis chart={chart} axisType='xAxis' updateChart={updateChart} />);
    root.find(Select).at(2).prop('onChange')('dashed');

    expect(updateChart.mock.calls[0][0].option.xAxis.axisLine.lineStyle.type).toBe('dashed');
  });

  test('handleCategoryChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Axis chart={chart} axisType='xAxis' updateChart={updateChart} />);
    root.find('input').at(0).prop('onChange')({ target: { value: 'a,b,c' } });

    expect(updateChart.mock.calls[0][0].option.xAxis.data).toEqual(['a', 'b', 'c']);
  });

  test('renderCategoryData', () => {
    const updateChart = jest.fn();
    const xAxisRoot = mount(<Axis chart={chart} axisType='xAxis' updateChart={updateChart} />);
    expect(xAxisRoot.html().includes('类目')).toBe(true);

    const yAxisRoot = mount(<Axis chart={chart} axisType='yAxis' updateChart={updateChart} />);
    expect(yAxisRoot.html().includes('类目')).toBe(false);
  });
});