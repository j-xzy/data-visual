import React from 'react';
import { shallow } from 'enzyme';
import Layer from '../index';
import LayerItem from '@container/draggable-layer-item';

const root = shallow(<Layer charts={[]} choosedChartIds={[]} updateStudioState={updateStudioState} />);

function updateStudioState(state, callback) {
  root.setProps({ ...state }, () => { typeof callback === 'function' && callback(); })
}

const charts = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

describe('<Layer />', () => {
  beforeEach(() => {
    // init root
    root.setProps({
      charts: [],
      choosedChartIds: []
    });
  });

  test('delete', () => {
    root.setProps({ charts });
    root.setProps({ choosedChartIds: [0, 3, 5] });
    root.find('.layer_delete_wrapper').simulate('click');
    expect(root.instance().props.charts).toEqual([{ id: 1 }, { id: 2 }, { id: 4 }]);
  });

  test('change chart zIndex', () => {
    root.setProps({ charts });

    expect(root.instance().props.charts).toEqual(charts);
    expect(root.instance().state.charts).toEqual([...charts].reverse());

    root.instance().moveChart(1, 4);
    const newChartState = [{ id: 5 }, { id: 3 }, { id: 2 }, { id: 1 }, { id: 4 }, { id: 0 }];

    expect(root.instance().props.charts).toEqual(charts);
    expect(root.instance().state.charts).toEqual(newChartState);

    root.instance().moveDone();

    expect(root.instance().props.charts).toEqual([...newChartState].reverse());
    expect(root.instance().state.charts).toEqual(newChartState);
  });

  test('click layerItem', () => {
    root.setProps({ charts });

    root.instance().handleClick({ ctrlKey: false }, 0);
    expect(root.instance().props.choosedChartIds).toEqual([0]);


    root.instance().handleClick({ ctrlKey: false }, 3);
    expect(root.instance().props.choosedChartIds).toEqual([3]);

    root.instance().handleClick({ ctrlKey: true }, 2);
    expect(root.instance().props.choosedChartIds).toEqual([3, 2]);
  });

  test('top', () => {
    root.setProps({ charts });

    root.instance().handleClick({ ctrlKey: false }, 4);
    root.find('.icon-top').simulate('click');

    expect(root.instance().props.charts).toEqual([{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 5 }, { id: 4 }]);

    root.setProps({ charts, choosedChartIds: [] });
    root.instance().handleClick({ ctrlKey: true }, 0);
    root.instance().handleClick({ ctrlKey: true }, 2);
    root.instance().handleClick({ ctrlKey: true }, 4);
    root.find('.icon-top').simulate('click');

    expect(root.instance().props.charts).toEqual([{ id: 1 }, { id: 3 }, { id: 5 }, { id: 0 }, { id: 2 }, { id: 4 }]);

    root.find('.icon-top').simulate('click');

    expect(root.instance().props.charts).toEqual([{ id: 1 }, { id: 3 }, { id: 5 }, { id: 0 }, { id: 2 }, { id: 4 }]);
  });

  test('bottom', () => {
    root.setProps({ charts });

    root.instance().handleClick({ ctrlKey: false }, 4);
    root.find('.icon-bottom').simulate('click');

    expect(root.instance().props.charts).toEqual([{ id: 4 }, { id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 5 }]);

    root.setProps({ charts, choosedChartIds: [] });
    root.instance().handleClick({ ctrlKey: true }, 0);
    root.instance().handleClick({ ctrlKey: true }, 2);
    root.instance().handleClick({ ctrlKey: true }, 4);
    root.find('.icon-bottom').simulate('click');

    expect(root.instance().props.charts).toEqual([{ id: 0 }, { id: 2 }, { id: 4 }, { id: 1 }, { id: 3 }, { id: 5 }]);

    root.find('.icon-bottom').simulate('click');

    expect(root.instance().props.charts).toEqual([{ id: 0 }, { id: 2 }, { id: 4 }, { id: 1 }, { id: 3 }, { id: 5 }]);
  });

  test('up', () => {
    root.setProps({ charts });

    root.instance().handleClick({ ctrlKey: false }, 2);
    root.find('.icon-up').simulate('click');

    expect(root.instance().props.charts).toEqual([{ id: 0 }, { id: 1 }, { id: 3 }, { id: 2 }, { id: 4 }, { id: 5 }]);

    root.setProps({ charts, choosedChartIds: [] });
    root.instance().handleClick({ ctrlKey: true }, 0);
    root.instance().handleClick({ ctrlKey: true }, 2);
    root.instance().handleClick({ ctrlKey: true }, 4);
    root.find('.icon-up').simulate('click');

    expect(root.instance().props.charts).toEqual([{ id: 1 }, { id: 0 }, { id: 3 }, { id: 2 }, { id: 5 }, { id: 4 }]);

    root.find('.icon-up').simulate('click');

    expect(root.instance().props.charts).toEqual([{ id: 1 }, { id: 3 }, { id: 0 }, { id: 5 }, { id: 2 }, { id: 4 }]);
  });

  test('down', () => {
    root.setProps({ charts });

    root.instance().handleClick({ ctrlKey: false }, 2);
    root.find('.icon-down').simulate('click');

    expect(root.instance().props.charts).toEqual([{ id: 0 }, { id: 2 }, { id: 1 }, { id: 3 }, { id: 4 }, { id: 5 }]);

    root.setProps({ charts, choosedChartIds: [] });
    root.instance().handleClick({ ctrlKey: true }, 0);
    root.instance().handleClick({ ctrlKey: true }, 2);
    root.instance().handleClick({ ctrlKey: true }, 4);
    root.find('.icon-down').simulate('click');

    expect(root.instance().props.charts).toEqual([{ id: 0 }, { id: 2 }, { id: 1 }, { id: 4 }, { id: 3 }, { id: 5 }]);

    root.find('.icon-down').simulate('click');

    expect(root.instance().props.charts).toEqual([{ id: 0 }, { id: 2 }, { id: 4 }, { id: 1 }, { id: 3 }, { id: 5 }]);
  });
});