import React from 'react';
import { shallow } from 'enzyme';
import DataEditor from '../index';

const chart = {
  option: {
    series: [
      {
        name: 'name',
        data: [1, 2, 3]
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
    const root = shallow(<DataEditor chart={chart} updateChart={updateChart} />);

    root.find('button').simulate('click');
    expect(updateChart.mock.calls[0][0]).toEqual(chart);

    const newChart = {
      option: {
        series: [
          {
            name: 'name',
            data: [1]
          }
        ]
      }
    };

    root.childAt(0).prop('onChange')(JSON.stringify(newChart));
    root.find('button').simulate('click');
    expect(updateChart.mock.calls[1][0]).toEqual(newChart);
  });
});