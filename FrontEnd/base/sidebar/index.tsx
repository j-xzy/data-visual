import * as React from 'react';
import { Panel, PanelProps } from './panel';
import './style.styl';

interface SidebarProps {
  width: string;
  height: string;
}

export default class Sidebar extends React.Component<SidebarProps, undefined> {
  static Panel = Panel;

  constructor(props: SidebarProps) {
    super(props);
    this.renderIconBar = this.renderIconBar.bind(this);
  }

  renderIconBar(c: React.ReactElement<PanelProps>, i: number) {
  }

  render() {
    const { width, height, children } = this.props;
    return (
      <div style={{ width: width, height: height }} className='sidebar_container'>
        <div className='sidebar_bar'>
          {React.Children.map(children, this.renderIconBar)}
        </div>
        <div className='sidebar_panels'></div>
      </div>
    );
  }
}