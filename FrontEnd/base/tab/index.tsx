import * as React from 'react';
import * as classNames from 'classnames';
import { Panel, IPanelProps } from './panel';

import './index.styl';

interface IProps {
  defaultActiveId: any;
  className?: string;
}

interface IState {
  activeId: any;
}

export default class Tab extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.renderHead = this.renderHead.bind(this);
    this.renderTab = this.renderTab.bind(this);
    this.state = {
      activeId: this.props.defaultActiveId
    };
  }

  static Panel = Panel;

  handleTabClick(idx: number) {
    this.setState({ activeId: idx });
  }

  renderHead(c: React.ReactElement<IPanelProps>) {
    const { tab, id } = c.props;
    const cls = classNames('tab_title', {
      'tab_active_title': id === this.state.activeId
    });
    return (
      <div onClick={() => this.handleTabClick(id)} className={cls}>{tab}</div>
    );
  }

  renderTab(c: React.ReactElement<IPanelProps>) {
    const display = c.props.id === this.state.activeId ? 'block' : 'none';
    return (
      <div className='tab_content' style={{ display }}>
        {React.cloneElement(c)}
      </div>
    );
  }

  render() {
    const { children, className } = this.props;
    return (
      <div className={`tab_wrapper ${className}`}>
        <div className='tab_head'>
          {React.Children.map(children, this.renderHead)}
        </div>
        <div className='tab_content_wrapper'>
          {React.Children.map(children, this.renderTab)}
        </div>
      </div>
    );
  }
}