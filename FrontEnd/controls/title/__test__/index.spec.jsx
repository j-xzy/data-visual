import React from 'react';
import { Switch, Radio, Select, InputNumber } from 'antd';
import { shallow } from 'enzyme';
import ColorInput from '@components/color-input';
import Title from '../index';

const chart = {
  option: {
    title: {
      show: false,
      text: 'text',
      subtext: 'subtext',
      x: 'center',
      textStyle: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'normal'
      },
      subtextStyle: {
        color: '#dedede',
        fontSize: 12,
        fontWeight: 'normal'
      }
    }
  }
};

describe('<Title />', () => {
  test('handleSwitchChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Title chart={chart} updateChart={updateChart} />);
    root.find(Switch).prop('onChange')(true);
    expect(updateChart.mock.calls[0][0].option.title.show).toBe(true);
  });

  test('handleText', () => {
    const updateChart = jest.fn();
    const root = shallow(<Title chart={chart} updateChart={updateChart} />);

    root.find('.title_input').at(0).prop('onChange')({ target: { value: 'newtext' } });
    expect(updateChart.mock.calls[0][0].option.title.text).toBe('newtext');

    root.find('.title_input').at(1).prop('onChange')({ target: { value: 'newsubtext' } });
    expect(updateChart.mock.calls[1][0].option.title.subtext).toBe('newsubtext');
  });

  test('handleColorChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Title chart={chart} updateChart={updateChart} />);

    root.find(ColorInput).at(0).prop('onColorComplete')('#fff');
    expect(updateChart.mock.calls[0][0].option.title.textStyle.color).toBe('#fff');

    root.find(ColorInput).at(1).prop('onColorComplete')('#888');
    expect(updateChart.mock.calls[1][0].option.title.subtextStyle.color).toBe('#888');
  });

  test('handleInputNumberChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Title chart={chart} updateChart={updateChart} />);

    root.find(InputNumber).at(0).prop('onChange')(20);
    expect(updateChart.mock.calls[0][0].option.title.textStyle.fontSize).toBe(20);

    root.find(InputNumber).at(1).prop('onChange')(30);
    expect(updateChart.mock.calls[1][0].option.title.subtextStyle.fontSize).toBe(30);
  });

  test('handleSelectChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Title chart={chart} updateChart={updateChart} />);

    root.find(Select).at(0).prop('onChange')('bold');
    expect(updateChart.mock.calls[0][0].option.title.textStyle.fontWeight).toBe('bold');

    root.find(Select).at(1).prop('onChange')('bold');
    expect(updateChart.mock.calls[1][0].option.title.subtextStyle.fontWeight).toBe('bold');
  });

  test('handleRadioChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Title chart={chart} updateChart={updateChart} />);

    root.find(Radio.Group).at(0).prop('onChange')({target:{value:'right'}});
    expect(updateChart.mock.calls[0][0].option.title.x).toBe('right');
  });
});