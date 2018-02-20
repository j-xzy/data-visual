import * as React from 'react';
import Studio from '@page/studio';

const style = {
  margin: 0,
  padding: 0,
  height: '100%',
  width: '100%'
};

export default class App extends React.Component {
  render() {
    return (
      <div style={style}>
        <Studio />
      </div>
    );
  }
}