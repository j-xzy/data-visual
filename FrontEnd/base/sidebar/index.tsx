import * as React from 'react';
import './style';

interface PanelProps {
  title?: string;
}

class Panel extends React.Component<PanelProps, undefined> {
  render() {
    return <div>this is panel</div>;
  }
}

export default class Sidebar extends React.Component {
  static Panel = Panel;
  render() {
    console.log('123');
    return <div></div>;
  }
}