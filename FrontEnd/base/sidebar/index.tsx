import * as React from 'react';

export default class Sidebar extends React.Component {
  render() {
    return <Panel/>;
  }
}

class Panel extends React.Component {
  render() {
    return <div>this is panel</div>;
  }
}