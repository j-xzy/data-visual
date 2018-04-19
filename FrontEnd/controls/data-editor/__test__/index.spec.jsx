import React from 'react';
import { shallow } from 'enzyme';
import DataEditor from '../index';

const chart = {
  seriesItemTemplate: {
    name: '',
    data: [120, 200, 150],
    type: 'bar'
  },
  option: {
    series: [{
      name: '',
      data: [120, 200, 150],
      type: 'bar'
    }
    ]
  }
};

describe('<DataEditor />', () => {
  test('value change', () => {
    const root = shallow(<DataEditor chart={chart} />);
    root.childAt(0).prop('onChange')('new data');
    expect(root.instance().value).toBe('new data');
  });

  test('updateChart', () => {
    const updateChart = jest.fn();
    const root = shallow(<DataEditor type={'bar'} chart={chart} updateChart={updateChart} />);

    root.find('button').simulate('click');
    expect(updateChart.mock.calls[0][0]).toEqual(chart);

    const series = [{
      name: '',
      data: [120],
      type: 'bar'
    }];


    root.childAt(0).prop('onChange')(JSON.stringify(series));
    root.find('button').simulate('click');
    expect(updateChart.mock.calls[1][0]).toEqual({
      seriesItemTemplate: {
        name: '',
        data: [120, 200, 150],
        type: 'bar'
      },
      option: {series}
    });
  });
});