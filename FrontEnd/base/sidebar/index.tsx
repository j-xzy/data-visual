import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Panel, PanelProps } from './panel';
import * as classNames from 'classnames';
import './style.styl';

interface SidebarProps {
  width: string;
  height: string;
  isLeft: boolean;
}

interface SidebarState {
  selectKey: number;
  isCollapsed: boolean;
}

export default class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);
    this.renderIconBar = this.renderIconBar.bind(this);
    this.renderPanel = this.renderPanel.bind(this);
    this.collapsePanel = this.collapsePanel.bind(this);
    this.state = {
      selectKey: 0,
      isCollapsed: false
    };
  }

  static Panel = Panel;

  static childContextTypes = {
    collapse: PropTypes.func
  };

  private barNode: HTMLDivElement;

  private barWidth: string;

  getChildContext() {
    return { collapse: this.collapsePanel };
  }

  renderIconBar(c: React.ReactElement<PanelProps>, i: number) {
    const { icon, title } = c.props;
    return (
      <li key={i} className={classNames({ bright: this.state.selectKey === i })}
        onClick={() => this.setState({ selectKey: i, isCollapsed: false })}>
        <span className={icon}>{typeof (icon) === 'undefined' && title}</span>
      </li>
    );
  }

  collapsePanel() {
    this.setState({ isCollapsed: true });
  }

  renderPanel(c: React.ReactElement<PanelProps>, i: number) {
    if (i !== this.state.selectKey)
      return null;
    return c;
  }

  componentDidMount() {
    const style = document.defaultView.getComputedStyle(this.barNode, null);
    this.barWidth = style.width;
  }

  render() {
    const { height, children, isLeft } = this.props;
    const width = this.state.isCollapsed ? this.barWidth : this.props.width;
    const flexDirection = isLeft ? 'row' : 'row-reverse';
    return (
      <div style={{ width: width, height: height, flexDirection }} className='sidebar_container'>
        <div className='sidebar_bar' ref={(node) => this.barNode = node}>
          <ul>
            {React.Children.map(children, this.renderIconBar)}
          </ul>
        </div>
        <div className={classNames('sidebar_panels', { collapse: this.state.isCollapsed })}>
          {React.Children.map(children, this.renderPanel)}
        </div>
      </div>
    );
  }
}