import * as React from 'react';
import  * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import App from '../app';
import Com from '@components/com';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  test('App have one Com', () => {
    const wrapper = Enzyme.shallow(<App />);
    expect(wrapper.find(Com)).toHaveLength(1);
  });
});