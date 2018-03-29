import React from 'react';
import { mount } from 'enzyme';
import { Canvas, OFFSET_POSITION } from '../index';
import { Chart } from '@components/chart';
import { TransformTool, SideType } from '@components/transform-tool';

const option = {
  series: [
    {
      type: 'pie',
      radius: '55%',
      data: [
        { value: 35, name: '视频' }
      ]
    }
  ]
};

const position = {
  left: 0,
  top: 0
};

const size = {
  width: 300,
  height: 300
};

const transformTool = {
  position: { left: 0, top: 0 },
  size: { width: 0, height: 0 }
}

let wrapper;

beforeEach(async () => {
  const OriginCanvas = Canvas.DecoratedComponent;
  const identity = el => el;
  wrapper = mount(<OriginCanvas
    transformTool={transformTool} canvasScale={1}
    charts={[]} updateStudioState={updateStudioState}
    onChartClick={() => { }} connectDropTarget={identity} />);
  wrapper.instance().appendChart(option, { position, size, imgSrc: '' });
  await wrapper.find(Chart).instance().componentDidMount();
  wrapper.update();
  wrapper.find(Chart).find('.chart-container').prop('onClick')();
  wrapper.update();
  function updateStudioState(state) {
    wrapper.setProps({ ...state }, () => { typeof callback === 'function' && callback(); });
  }
});

describe('<Canvas /> change size and position', () => {
  afterEach(() => {
    // canvas and transformtool are same size and position
    expect(wrapper.find(Chart).prop('size')).toEqual(wrapper.find(TransformTool).prop('size'));
    expect(wrapper.find(Chart).prop('position')).toEqual(wrapper.find(TransformTool).prop('position'));

    wrapper.unmount();
  });

  test('onWheel', () => {
    wrapper.update();
    expect(wrapper.prop('canvasScale')).toBe(1);
    wrapper.simulate('wheel', { deltaY: 1 });
    expect(wrapper.prop('canvasScale')).toBe(0.95);
    wrapper.simulate('wheel', { deltaY: -1 });
    expect(wrapper.prop('canvasScale')).toBe(1);
  });

  test('move scale:1', () => {
    wrapper.update();
    wrapper.setProps({ canvasScale: 1 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.Middle);
    wrapper.instance().handleCanvasMouseMove({ clientX: 100, clientY: 100 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 1, y: 1 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: -50, top: -50 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 300, height: 300 });
  });

  test('move scale:2', () => {
    wrapper.update();
    wrapper.setProps({ canvasScale: 2 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.Middle);
    wrapper.instance().handleCanvasMouseMove({ clientX: 100, clientY: 100 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 1, y: 1 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: -25, top: -25 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 300, height: 300 });
  });

  test('left-top scale:1', () => {
    wrapper.setProps({ canvasScale: 1 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.LeftTop);
    wrapper.instance().handleCanvasMouseMove({ clientX: 100, clientY: 100 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 350 / 300, y: 350 / 300 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: -50, top: -50 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 350, height: 350 });
  });

  test('left-top scale:2', () => {
    wrapper.setProps({ canvasScale: 2 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.LeftTop);
    wrapper.instance().handleCanvasMouseMove({ clientX: 100, clientY: 100 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 325 / 300, y: 325 / 300 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: -25, top: -25 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 325, height: 325 });
  });

  test('top scale:1', () => {
    wrapper.setProps({ canvasScale: 1 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.Top);
    wrapper.instance().handleCanvasMouseMove({ clientX: 100, clientY: 100 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 1, y: 350 / 300 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: 0, top: -50 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 300, height: 350 });
  });

  test('top scale:2', () => {
    wrapper.setProps({ canvasScale: 2 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.Top);
    wrapper.instance().handleCanvasMouseMove({ clientX: 100, clientY: 100 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 1, y: 325 / 300 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: 0, top: -25 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 300, height: 325 });
  });

  test('right-top scale:1', () => {
    wrapper.setProps({ canvasScale: 1 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.RightTop);
    wrapper.instance().handleCanvasMouseMove({ clientX: 200, clientY: 100 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 350 / 300, y: 350 / 300 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: 0, top: -50 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 350, height: 350 });
  });

  test('right-top scale:2', () => {
    wrapper.setProps({ canvasScale: 2 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.RightTop);
    wrapper.instance().handleCanvasMouseMove({ clientX: 200, clientY: 100 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 325 / 300, y: 325 / 300 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: 0, top: -25 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 325, height: 325 });
  });

  test('right scale:1', () => {
    wrapper.setProps({ canvasScale: 1 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.Right);
    wrapper.instance().handleCanvasMouseMove({ clientX: 200, clientY: 100 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 350 / 300, y: 1 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: 0, top: 0 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 350, height: 300 });
  });

  test('right scale:2', () => {
    wrapper.setProps({ canvasScale: 2 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.Right);
    wrapper.instance().handleCanvasMouseMove({ clientX: 200, clientY: 100 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 325 / 300, y: 1 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: 0, top: 0 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 325, height: 300 });
  });

  test('right-bottom scale:1', () => {
    wrapper.setProps({ canvasScale: 1 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.RightBottom);
    wrapper.instance().handleCanvasMouseMove({ clientX: 200, clientY: 200 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 350 / 300, y: 350 / 300 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: 0, top: 0 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 350, height: 350 });
  });

  test('right-bottom scale:2', () => {
    wrapper.setProps({ canvasScale: 2 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.RightBottom);
    wrapper.instance().handleCanvasMouseMove({ clientX: 200, clientY: 200 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 325 / 300, y: 325 / 300 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: 0, top: 0 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 325, height: 325 });
  });

  test('bottom scale:1', () => {
    wrapper.setProps({ canvasScale: 1 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.Bottom);
    wrapper.instance().handleCanvasMouseMove({ clientX: 200, clientY: 200 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 1, y: 350 / 300 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: 0, top: 0 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 300, height: 350 });
  });

  test('bottom scale:2', () => {
    wrapper.setProps({ canvasScale: 2 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.Bottom);
    wrapper.instance().handleCanvasMouseMove({ clientX: 200, clientY: 200 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 1, y: 325 / 300 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: 0, top: 0 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 300, height: 325 });
  });

  test('left-bottom scale:1', () => {
    wrapper.setProps({ canvasScale: 1 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.LeftBottom);
    wrapper.instance().handleCanvasMouseMove({ clientX: 100, clientY: 200 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 350 / 300, y: 350 / 300 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: -50, top: 0 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 350, height: 350 });
  });

  test('left-bottom scale:2', () => {
    wrapper.setProps({ canvasScale: 2 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.LeftBottom);
    wrapper.instance().handleCanvasMouseMove({ clientX: 100, clientY: 200 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 325 / 300, y: 325 / 300 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: -25, top: 0 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 325, height: 325 });
  });

  test('left scale:1', () => {
    wrapper.setProps({ canvasScale: 1 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.Left);
    wrapper.instance().handleCanvasMouseMove({ clientX: 100, clientY: 200 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 350 / 300, y: 1 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: -50, top: 0 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 350, height: 300 });
  });

  test('left scale:2', () => {
    wrapper.setProps({ canvasScale: 2 });
    wrapper.instance().handleTransformMouseDown({ clientX: 150, clientY: 150 }, SideType.Left);
    wrapper.instance().handleCanvasMouseMove({ clientX: 100, clientY: 200 });

    wrapper.update();

    expect(wrapper.find(Chart).prop('scale')).toEqual({ x: 325 / 300, y: 1 });
    expect(wrapper.find(TransformTool).prop('position')).toEqual({ left: -25, top: 0 });

    wrapper.instance().handleCanvasMouseUp();

    wrapper.update();

    expect(wrapper.find(Chart).prop('size')).toEqual({ width: 325, height: 300 });
  });
});

describe('Canvas /> copy and delete', () => {
  afterEach(() => {
    wrapper.unmount();
  });

  test('copy', () => {
    expect(wrapper.find(Chart).length).toBe(1);
    wrapper.find('.icon-copy').simulate('click');
    wrapper.update();
    expect(wrapper.find(Chart).length).toBe(2);
    expect(wrapper.find(Chart).at(1).prop('position')).toEqual({
      left: position.left + OFFSET_POSITION.left,
      top: position.top + OFFSET_POSITION.top,
    });
    expect(wrapper.find(Chart).at(1).childAt(0).prop('style').zIndex).toBe(1);
    expect(wrapper.find(TransformTool).prop('position')).toEqual({
      left: position.left + OFFSET_POSITION.left,
      top: position.top + OFFSET_POSITION.top
    });
  });

  test('multi copy', () => {
    wrapper.find('.icon-copy').simulate('click');
    wrapper.update();
    expect(wrapper.prop('choosedChartIndex')).toBe(1);

    wrapper.find('.icon-copy').simulate('click');
    wrapper.update();
    expect(wrapper.prop('choosedChartIndex')).toBe(2);

    wrapper.find('.icon-copy').simulate('click');
    wrapper.update();
    expect(wrapper.prop('choosedChartIndex')).toBe(3);
  });

  test('delete', () => {
    expect(wrapper.find(Chart).length).toBe(1);
    wrapper.find('.icon-trashcan').simulate('click');
    wrapper.update();
    expect(wrapper.find(Chart).length).toBe(0);
  });

  test('delete index', async () => {
    wrapper.instance().appendChart(option, { position, size, imgSrc: '' }); // 1
    await wrapper.find(Chart).at(1).instance().componentDidMount();
    wrapper.instance().appendChart(option, { position, size, imgSrc: '' }); // 2
    await wrapper.find(Chart).at(2).instance().componentDidMount();

    expect(wrapper.find(Chart).at(0).prop('index')).toBe(0);
    expect(wrapper.find(Chart).at(1).prop('index')).toBe(1);
    expect(wrapper.find(Chart).at(2).prop('index')).toBe(2);

    wrapper.find(Chart).find('.chart-container').at(1).prop('onClick')();
    wrapper.find('.icon-trashcan').simulate('click');
    expect(wrapper.find(Chart).at(0).prop('index')).toBe(0);
    expect(wrapper.find(Chart).at(1).prop('index')).toBe(1);
  });
});