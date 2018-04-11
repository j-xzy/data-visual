import React from 'react';
import { mount } from 'enzyme';
import { Editor, Mode, Theme } from '../index';

describe('<Editor />', () => {
  test('componentDidMount', async () => {
    const root = mount(<Editor mode='json' theme='github' value='foo' onChange={() => { }} />);
    await root.instance().componentDidMount();
    expect(root.instance().editor.getValue()).toBe('foo');
  });

  test('onChange', async () => {
    const onChange = jest.fn();
    const root = mount(<Editor mode='json' theme='github' value='foo' onChange={onChange} />);
    await root.instance().componentDidMount();
    root.instance().editor.setValue('bar');
    expect(onChange.mock.calls[4][0]).toBe('bar')
  });

  test('theme', async () => {
    const onChange = jest.fn();
    const root = mount(<Editor mode='json' theme='github' value='foo' onChange={onChange} />);
    await root.instance().componentDidMount();

    expect(root.instance().editor.getTheme()).toBe('ace/theme/github');

    root.setProps({
      theme: 'dracula',
      mode: 'json'
    });

    await root.instance().componentDidUpdate({
      mode: 'json',
      theme: 'github'
    });

    expect(root.instance().editor.getTheme()).toBe('ace/theme/dracula');

  });
});