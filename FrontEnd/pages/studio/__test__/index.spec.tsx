import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Studio } from '../index';
import Leftbar from '@components/leftbar';
import Setting from '@components/setting';
import { Canvas, ICanvasProps } from '@components/canvas';

describe('<Studio />', () => {
  test('<Sidebar/> contains <Leftbar/> <Setting/>  <Canvas/>', () => {
    const studio = Enzyme.mount(<Studio />);
    let canvasProps: ICanvasProps;
    expect(studio.containsAllMatchingElements(
      [<Leftbar />, <Setting />, <Canvas {...canvasProps} />])
    ).toBe(true);
  });
});