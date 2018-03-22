import * as React from 'react';
import { mount } from 'enzyme';
import { TransformTool, SideType } from '../index';

const position = {
  top: 0,
  left: 0
};

const size = {
  width: 0,
  height: 0
};

describe('<TransformTool />', () => {
  test('mouseDown', () => {
    const handleTransformMouseDown = jest.fn();
    const onCopyClick = jest.fn();
    const onTrashcanClick = jest.fn();
    const wrapper = mount(
      <TransformTool
        position={position} size={size}
        onCopyClick={onCopyClick} onTrashcanClick={onTrashcanClick}
        handleTransformMouseDown={handleTransformMouseDown} >
      </TransformTool>
    );
    wrapper.find('.transform_tool').simulate('mouseDown');
    expect(handleTransformMouseDown.mock.calls[0][1]).toBe(SideType.Middle);

    wrapper.find('.left-top').simulate('mouseDown');
    expect(handleTransformMouseDown.mock.calls[1][1]).toBe(SideType.LeftTop);

    wrapper.find('.top').simulate('mouseDown');
    expect(handleTransformMouseDown.mock.calls[2][1]).toBe(SideType.Top);

    wrapper.find('.right-top').simulate('mouseDown');
    expect(handleTransformMouseDown.mock.calls[3][1]).toBe(SideType.RightTop);

    wrapper.find('.right').simulate('mouseDown');
    expect(handleTransformMouseDown.mock.calls[4][1]).toBe(SideType.Right);

    wrapper.find('.right-bottom').simulate('mouseDown');
    expect(handleTransformMouseDown.mock.calls[5][1]).toBe(SideType.RightBottom);

    wrapper.find('.bottom').simulate('mouseDown');
    expect(handleTransformMouseDown.mock.calls[6][1]).toBe(SideType.Bottom);
    
    wrapper.find('.left-bottom').simulate('mouseDown');
    expect(handleTransformMouseDown.mock.calls[7][1]).toBe(SideType.LeftBottom);

    wrapper.find('.left').simulate('mouseDown');
    expect(handleTransformMouseDown.mock.calls[8][1]).toBe(SideType.Left);
  });
});