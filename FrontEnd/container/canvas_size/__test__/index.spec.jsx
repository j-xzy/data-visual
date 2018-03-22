import React from 'react';
import { shallow } from 'enzyme';
import CanvasSize from '../index';

const canvasSize = {
  width: 0,
  height: 0
};

describe('<CanvasSize/ >', () => {
  test('change size', () => {
    const handleSizeChange = jest.fn();
    const wrapper = shallow(
      <CanvasSize
        onCanvasSizeChange={handleSizeChange}
        canvasSize={canvasSize} >
      </CanvasSize>
    );
    wrapper.childAt(0).prop('onChange')(10);
    expect(handleSizeChange.mock.calls[0]).toEqual([10, 0]);
    wrapper.childAt(1).prop('onChange')(20);
    expect(handleSizeChange.mock.calls[1]).toEqual([0, 20]);
  });

  test('<CanvasSize/> only hava two <Input/> ', () => {
    const handleSizeChange = jest.fn();
    const wrapper = shallow(
      <CanvasSize
        onCanvasSizeChange={handleSizeChange}
        canvasSize={canvasSize} >
      </CanvasSize>
    );
    
    expect(wrapper.children().length).toBe(2);
    const InputType = wrapper.childAt(0).type();
    wrapper.children().forEach((child)=>{
      expect(child.type()).toEqual(InputType);
    });
  });
});