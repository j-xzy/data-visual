import React from 'react';
import { mount } from 'enzyme';
import { Canvas, CHART_MINI_SIZE, OFFSET_POSITION } from '../index';
import { Chart } from '@components/chart';
import { TransformTool, SideType } from '@components/transform-tool';

const chart1 = {
  option: {
    series: [
      {
        type: 'pie',
        radius: '55%',
        data: [
          { value: 35, name: '视频' },
        ]
      }
    ]
  },
  scale: { x: 1, y: 1, },
  size: { width: 500, height: 500, },
  position: { left: 0, top: 0, },
  imgSrc: '',
  id: 0,
};

const mousePs = { clientX: 200, clientY: 200 };
const mouseMovePs = { clientX: 300, clientY: 400 };

const sideTypes = [SideType.Right, SideType.Bottom, SideType.Top, SideType.Left, SideType.RightTop, SideType.LeftTop, SideType.LeftBottom, SideType.RightBottom, SideType.Middle];
const sideNames = ['right', 'bottom', 'top', 'left', 'right-top', 'left-top', 'left-bottom', 'right-bottom', 'transform_tool'];
const canvasScales = [0.4, 0.6, 1, 1.5, 2, 2.3];

function calculatePositionAndSize(mousePs, mouseMovePs, canvasScale, sideType, size, position) {
  const delta = {
    x: (mouseMovePs.clientX - mousePs.clientX) / canvasScale,
    y: (mouseMovePs.clientY - mousePs.clientY) / canvasScale
  };

  size = { ...size };
  position = { ...position };

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
    x: size.width / chart1.size.width,
    y: size.height / chart1.size.height
  };

  let chartPosition = {
    left: position.left + chart1.size.width * (chartScale.x - 1) / 2,
    top: position.top + chart1.size.height * (chartScale.y - 1) / 2
  };

  if (size.width < CHART_MINI_SIZE.width || size.height < CHART_MINI_SIZE.height) {
    chartScale = chart1.scale;
    chartPosition = chart1.position;
  }

  const toolSize = {
    width: chartScale.x * chart1.size.width,
    height: chartScale.y * chart1.size.height
  };

  const toolPosition = {
    left: chartPosition.left - chart1.size.width * (chartScale.x - 1) / 2,
    top: chartPosition.top - chart1.size.height * (chartScale.y - 1) / 2
  };

  return { chartScale, chartPosition, toolSize, toolPosition };
}

describe('<Canvas />', () => {
  const OriginCanvas = Canvas.DecoratedComponent;
  const identity = el => el;
  const root = mount(<OriginCanvas updateStudioState={updateStudioState} choosedChartIds={[]} charts={[]} connectDropTarget={identity} />);

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

  describe('Only one Chart is selected', () => {
    afterEach(() => {
      // chart and transformtool are the same size and position
      const transformToolStyle = root.find(TransformTool).childAt(0).prop('style');
      const chartStyle = root.find(Chart).childAt(0).prop('style');
      expect(transformToolStyle).toEqual({
        left: chartStyle.left,
        top: chartStyle.top,
        width: chartStyle.width,
        height: chartStyle.height
      });
    });

    canvasScales.forEach((canvasScale) => {
      sideTypes.forEach((sideType, idx) => {
        test(`SideType:${SideType[sideType]} scale:${canvasScale}`, async () => {
          root.setProps({ charts: [chart1], canvasScale });
          await root.find(Chart).at(0).instance().componentDidMount();
          root.find(Chart).simulate('click');
          expect(root.find(TransformTool).childAt(0).prop('style')).toEqual({ ...chart1.position, ...chart1.size });

          root.find(TransformTool).find(`.${sideNames[idx]}`).simulate('mousedown', { ...mousePs });
          expect(root.instance().sideType).toBe(sideType);

          root.simulate('mousemove', { ...mouseMovePs });

          const { chartScale, chartPosition, toolSize, toolPosition } = calculatePositionAndSize(mousePs, mouseMovePs, canvasScale, sideType, chart1.size, chart1.position);

          expect(root.find(TransformTool).childAt(0).prop('style')).toEqual({ ...toolPosition, ...toolSize });

          expect(root.find(Chart).childAt(0).prop('style')).toEqual({
            width: chart1.size.width,
            height: chart1.size.height,
            left: chartPosition.left,
            top: chartPosition.top,
            position: 'absolute',
            transform: `scale(${chartScale.x},${chartScale.y})`,
            zIndex: 0
          });

          root.simulate('mouseup'); // update chart's size and position
        });
      });
    });
  });
});