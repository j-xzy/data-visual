import React from 'react';
import { shallow } from 'enzyme';
import CanvasSize from '../index';

const canvasSize = {
  width: 0,
  height: 0
};

describe('<CanvasSize/ >', () => {
  test('change size', () => {
    const updateStudioState = jest.fn();
    const wrapper = shallow(
      <CanvasSize
        updateStudioState={updateStudioState}
        canvasSize={canvasSize} >
      </CanvasSize>
    );
    wrapper.childAt(0).prop('onChange')(10);
    expect(updateStudioState.mock.calls[0][0]).toEqual({canvasSize: {height: 0, width: 10}});
    wrapper.childAt(1).prop('onChange')(20);
    expect(updateStudioState.mock.calls[1][0]).toEqual({canvasSize: {height: 20, width: 0}});
  });

  test('<CanvasSize/> only hava two <Input/> ', () => {
    const updateStudioState = jest.fn();
    const wrapper = shallow(
      <CanvasSize
        updateStudioState={updateStudioState}
        canvasSize={canvasSize} >
      </CanvasSize>
    );

    expect(wrapper.children().length).toBe(2);
    const InputType = wrapper.childAt(0).type();
    wrapper.children().forEach((child) => {
      expect(child.type()).toEqual(InputType);
    });
  });
});