import React from 'react';
import { shallow } from 'enzyme';
import LayerItem from '../index';

describe('<DragableLayerItem />', () => {
  test('props', () => {
    const OriginLayerItem = LayerItem.DecoratedComponent;
    const identity = el => el;
    const onClick = jest.fn(), onMouseEnter = jest.fn(), onMouseLeave = jest.fn();
    const onCheckChange = jest.fn();
    const root = shallow(<OriginLayerItem checked={false} onCheckChange={onCheckChange} onClick={onClick} onMouseEnter={onMouseEnter} id='id1'
      onMouseLeave={onMouseLeave} connectDropTarget={identity} connectDragSource={identity} />);

    root.prop('onMouseLeave')();
    expect(onMouseLeave.mock.calls.length).toBe(1);

    root.prop('onMouseEnter')();
    expect(onMouseEnter.mock.calls[0][0]).toBe('id1');

    root.prop('onClick')();
    expect(onClick.mock.calls[0][1]).toBe('id1');

    expect(root.childAt(0).prop('checked')).toBe(false);

    root.childAt(0).prop('onCheckChange')(true);
    expect(onCheckChange.mock.calls[0]).toEqual(['id1', true]);
  });
});
