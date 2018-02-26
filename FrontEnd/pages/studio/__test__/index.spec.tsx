import * as React from 'react';
import * as Enzyme from 'enzyme';
import Studio from '../index';
import Leftbar from '@components/leftbar';
import Setting from '@components/setting';
import Canvas from '@components/canvas';

describe('<Studio />', () => {
  test('<Sidebar/> contains <Leftbar/> <Setting/>  <Canvas/>', () => {
    const studio = Enzyme.mount(<Studio />);
    expect(studio.containsAllMatchingElements(
      [<Leftbar />, <Setting />, <Canvas width='1024px' height='800px' />])
    ).toBe(true);
  });
});