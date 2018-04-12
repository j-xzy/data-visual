import * as React from 'react';
import * as classNames from 'classnames';
import { Panel, IPanelProps } from './panel';

import './index.styl';

interface IProps {
  defaultActiveId: any;
  className?: string;
  forceUpdate?: boolean;
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
    this.initEvents = this.initEvents.bind(this);
    this.state = {
      activeId: this.props.defaultActiveId
    };

    React.Children.map(this.props.children, this.initEvents);
  }
  static defaultProps = {
    forceUpdate: false
  };

  static Panel = Panel;
  guid = 0;
  events: any = {};

  initEvents(c: React.ReactElement<IPanelProps>) {
    const { id, onTabClick } = c.props;
    if (typeof onTabClick !== 'undefined') {
      this.events[id] = onTabClick;
    }
  }

  handleTabClick(id: number, tab: string) {
    this.setState({ activeId: id }, () => {
      Object.keys(this.events).includes(id.toString()) && this.events[id](id, tab);
    });
  }

  renderHead(c: React.ReactElement<IPanelProps>) {
    const { tab, id } = c.props;
    const cls = classNames('tab_title', {
      'tab_active_title': id === this.state.activeId
    });
    return (
      <div onClick={() => this.handleTabClick(id, tab)} className={cls}>{tab}</div>
    );
  }

  renderTab(c: React.ReactElement<IPanelProps>, idx: number) {
    const display = c.props.id === this.state.activeId ? 'block' : 'none';
    const key = this.props.forceUpdate ? this.guid++ : idx;
    return (
      <div key={key} className='tab_content' style={{ display }}>
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