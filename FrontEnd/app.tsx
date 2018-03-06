import * as React from 'react';
import { Studio } from '@pages/studio';

const style = {
  margin: 0,
  padding: 0,
  height: '100%',
  width: '100%'
};

export default class App extends React.Component {
  render() {
    return (
      <Studio />
    );
  }
}