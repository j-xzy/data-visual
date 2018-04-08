import * as React from 'react';
import { mount } from 'enzyme';
import LazyLoader from '../index';
import Foo from './foo';

const p = 'same props';

describe('Lazy loader', () => {
  test('load success', async () => {
    const Foo = LazyLoader(() => import('./foo'), (): any => 'loading');
    const root = mount(<Foo p={p} />);

    root.update();

    expect(root.debug().includes('loading')).toBe(true);
    expect(root.debug().includes('loaded')).toBe(false);

    await root.instance().componentWillMount();

    root.update();

    expect(root.debug().includes('loading')).toBe(false);
    expect(root.debug().includes('loaded')).toBe(true);

    // same props
    expect(root.find(Foo).prop('p')).toBe(p);
  });
});