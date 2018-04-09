import React from 'react';
import { mount } from 'enzyme';
import { Canvas, CHART_MINI_SIZE, OFFSET_POSITION } from '../index';
import { Chart } from '@components/chart';
import { TransformTool, SideType } from '@components/transform-tool';

const chart1 = {
  option: {},
  colorFromGlobal: true,
  scale: { x: 1, y: 1, },
  size: { width: 500, height: 500, },
  position: { left: 0, top: 0, },
  imgSrc: '',
  id: 0,
};

const chart2 = {
  option: {},
  colorFromGlobal: true,
  scale: { x: 1, y: 1, },
  size: { width: 300, height: 600, },
  position: { left: 100, top: 200, },
  imgSrc: '',
  id: 1,
};

const chart3 = {
  option: {},
  colorFromGlobal: false,
  scale: { x: 1, y: 1, },
  size: { width: 350, height: 450, },
  position: { left: 120, top: 233, },
  imgSrc: '',
  id: 2,
};

const mousePs = { clientX: 200, clientY: 200 };
const mouseMovePs = { clientX: 300, clientY: 400 };

const sideTypes = [SideType.Right, SideType.Bottom, SideType.Top, SideType.Left, SideType.RightTop, SideType.LeftTop, SideType.LeftBottom, SideType.RightBottom, SideType.Middle];
const sideNames = ['right', 'bottom', 'top', 'left', 'right-top', 'left-top', 'left-bottom', 'right-bottom', 'transform_tool'];
const canvasScales = [0.4, 0.6, 1, 1.6, 3.3];
const charts = [[chart1], [chart1, chart2], [chart1, chart2, chart3]];
const size = { width: 800, height: 800 };
function calculatePositionAndSize(mousePs, mouseMovePs, canvasScale, sideType, chart) {
  const delta = {
    x: (mouseMovePs.clientX - mousePs.clientX) / canvasScale,
    y: (mouseMovePs.clientY - mousePs.clientY) / canvasScale
  };

  let size = { ...chart.size };
  let position = { ...chart.position };

  if (sideType === SideType.Right) {
    size.width = size.width + delta.x;
  }
  if (sideType === SideType.Bottom) {
    size.height = size.height + delta.y;
  }
  if (sideType === SideType.Top) {
    size.height = size.height - delta.y;
    position.top = position.top + delta.y;
  }
  if (sideType === SideType.Left) {
    size.width = size.width - delta.x;
    position.left = position.left + delta.x;
  }
  if (sideType === SideType.RightTop) {
    size.width = size.width + delta.x;
    size.height = size.height - delta.y;
    position.top = position.top + delta.y;
  }

  if (sideType === SideType.LeftTop) {
    size.width = size.width - delta.x;
    size.height = size.height - delta.y;
    position.top = position.top + delta.y;
    position.left = position.left + delta.x;
  }

  if (sideType === SideType.LeftBottom) {
    size.width = size.width - delta.x;
    size.height = size.height + delta.y;
    position.left = position.left + delta.x;
  }

  if (sideType === SideType.RightBottom) {
    size.width = size.width + delta.x;
    size.height = size.height + delta.y;
  }
  if (sideType === SideType.Middle) {
    position.left = position.left + delta.x;
    position.top = position.top + delta.y;
  }

  let chartScale = {
    x: size.width / chart.size.width,
    y: size.height / chart.size.height
  };

  let chartPosition = {
    left: position.left + chart.size.width * (chartScale.x - 1) / 2,
    top: position.top + chart.size.height * (chartScale.y - 1) / 2
  };

  if (size.width < CHART_MINI_SIZE.width || size.height < CHART_MINI_SIZE.height) {
    chartScale = chart.scale;
    chartPosition = chart.position;
  }

  const toolSize = {
    width: chartScale.x * chart.size.width,
    height: chartScale.y * chart.size.height
  };

  const toolPosition = {
    left: chartPosition.left - chart.size.width * (chartScale.x - 1) / 2,
    top: chartPosition.top - chart.size.height * (chartScale.y - 1) / 2
  };

  return { chartScale, chartPosition, toolSize, toolPosition };
}

describe('<Canvas />', () => {
  const OriginCanvas = Canvas.DecoratedComponent;
  const identity = el => el;
  const root = mount(<OriginCanvas size={size} updateStudioState={updateStudioState} choosedChartIds={[]} charts={[]} connectDropTarget={identity} />);

  function updateStudioState(state, callback) {
    root.setProps({ ...state }, () => { typeof callback === 'function' && callback(); })
  }

  beforeEach(() => {
    // init root
    root.setProps({
      choosedChartIds: [],
      charts: []
    });
    root.setState({
      transformTools: {}
    });
  });

  afterEach(() => {
    // chart and transformtool are the same size and position
    const count = root.find(TransformTool).length;
    let transformToolStyle = {}, chartStyle = {};
    for (let i = 0; i < count; i++) {
      transformToolStyle = root.find(TransformTool).at(i).childAt(0).prop('style');
      chartStyle = root.find(Chart).at(i).childAt(0).prop('style');
      expect(transformToolStyle).toEqual({
        left: chartStyle.left,
        top: chartStyle.top,
        width: chartStyle.width,
        height: chartStyle.height
      });
    }
  });

  canvasScales.forEach((canvasScale) => {
    sideTypes.forEach((sideType, idx) => {
      charts.forEach((charts) => {
        test(`SideType:${SideType[sideType]},scale:${canvasScale},chartCount:${charts.length}`, async () => {
          const count = charts.length;

          root.setProps({ charts, canvasScale });
          for (let i = 0; i < count; i++) {
            await root.find(Chart).at(i).instance().componentDidMount();
          }

          for (let i = 0; i < count; i++) {
            root.find(Chart).at(i).simulate('click', { ctrlKey: true });
          }

          expect(root.find(TransformTool).length).toBe(count);

          root.find(TransformTool).find(`.${sideNames[idx]}`).at(0).simulate('mousedown', { ...mousePs });

          expect(root.instance().sideType).toBe(sideType);

          root.simulate('mousemove', { ...mouseMovePs });

          let configs = [];
          for (let i = 0; i < count; i++) {
            configs.push(calculatePositionAndSize(mousePs, mouseMovePs, canvasScale, sideType, charts[i]));
          }

          for (let i = 0; i < count; i++) {
            expect(root.find(TransformTool).at(i).childAt(0).prop('style')).toEqual({ ...configs[i].toolPosition, ...configs[i].toolSize });
            expect(root.find(Chart).at(i).childAt(0).prop('style')).toEqual({
              width: charts[i].size.width,
              height: charts[i].size.height,
              left: configs[i].chartPosition.left,
              top: configs[i].chartPosition.top,
              position: 'absolute',
              transform: `scale(${configs[i].chartScale.x},${configs[i].chartScale.y})`,
              zIndex: i
            });
          }

          root.simulate('mouseup'); // update chart's size and position
        });
      });
    });
  });

  test('chart will not rerender when ohter position changes', async () => {
    root.setProps({ charts: [chart1, chart2, chart3], canvasScale: 1 });
    let renderSpys = [];
    for (let i = 0; i < 3; i++) {
      renderSpys[i] = jest.spyOn(root.find(Chart).at(i).instance(), 'render');
      await root.find(Chart).at(i).instance().componentDidMount();
    }

    expect(renderSpys[0].mock.calls.length).toBe(0);
    expect(renderSpys[1].mock.calls.length).toBe(0);
    expect(renderSpys[2].mock.calls.length).toBe(0);

    root.find(Chart).at(0).simulate('click', { ctrlKey: false });
    root.find(TransformTool).find('.transform_tool').simulate('mousedown', { ...mousePs });
    root.simulate('mousemove', { ...mouseMovePs });

    expect(renderSpys[0].mock.calls.length).toBe(1);
    expect(renderSpys[1].mock.calls.length).toBe(0);
    expect(renderSpys[2].mock.calls.length).toBe(0);
  });

  test('chart will rerender when global color changes', async () => {
    root.setProps({ charts: [chart1, chart2, chart3], canvasScale: 1 });
    let renderSpys = [];
    for (let i = 0; i < 3; i++) {
      renderSpys[i] = jest.spyOn(root.find(Chart).at(i).instance(), 'render');
      await root.find(Chart).at(i).instance().componentDidMount();
    }
    expect(renderSpys[0].mock.calls.length).toBe(0);
    expect(renderSpys[1].mock.calls.length).toBe(0);
    expect(renderSpys[2].mock.calls.length).toBe(0);

    root.setProps({ colors: ['red', 'blue'] });

    expect(renderSpys[0].mock.calls.length).toBe(1);
    expect(renderSpys[1].mock.calls.length).toBe(1);
    expect(renderSpys[2].mock.calls.length).toBe(0);  // colorFromGlobal is false
  });

  test('id map index', () => {
  });
});