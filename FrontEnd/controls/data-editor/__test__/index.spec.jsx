import React from 'react';
import { shallow } from 'enzyme';
import DataEditor from '../index';

const chart = {
  option: {
    series: [
      {
        data: 'some data'
      }
    ]
  }
};

describe('<DataEditor />', () => {
  test('value change', () => {
    const root = shallow(<DataEditor chart={chart} />);

    expect(root.childAt(0).prop('value')).toBe('"some data"');
    root.childAt(0).prop('onChange')('new data');
    expect(root.instance().value).toBe('new data');
  });

  test('updateChart', () => {
    const updateChart = jest.fn();
    const root = shallow(<DataEditor chart={chart} updateChart={updateChart} />);

    root.find('button').simulate('click');
    expect(updateChart.mock.calls[0][0]).toEqual(chart);

    root.childAt(0).prop('onChange')(JSON.stringify([1, 2, 3]));
    root.find('button').simulate('click');

    const newChart = {
      option: {
        series: [
          {
            data: [1, 2, 3]
          }
        ]
      }
    };

    expect(updateChart.mock.calls[1][0]).toEqual(newChart);
  });
});