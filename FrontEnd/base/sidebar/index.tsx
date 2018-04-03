import * as React from 'react';
import { Panel, IPanelProps } from './panel';
import * as classNames from 'classnames';
import './style.styl';

type SidebarMode = 'left' | 'right';

type OpenState = 'open' | 'close';

type RenderReason = 'other' | 'open' | 'close';

interface IOnOpenChange {
  (state?: OpenState): void;
}

interface ISidebarProps {
  width?: string;
  height?: string;
  mode?: SidebarMode;
  className?: string;
  onOpenChangeBefore?: IOnOpenChange;
  onOpenChangeAfter?: IOnOpenChange;
}

interface ISidebarState {
  selectKey: number;
  isCollapsed: boolean;
}

const ANIMATION_TIME = 300;
const INITIAL_START_TIME = -1;
let startTime: number = INITIAL_START_TIME;

export default class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  constructor(props: ISidebarProps) {
    super(props);
    this.renderIconBar = this.renderIconBar.bind(this);
    this.renderPanel = this.renderPanel.bind(this);
    this.collapsePanel = this.collapsePanel.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
    this.state = {
      selectKey: 0,
      isCollapsed: false
    };
  }

  static defaultProps = {
    mode: 'left',
    width: '100%',
    height: '100%'
  };

  static Panel = Panel;

  private renderReason: RenderReason = 'other';

  private barNode: HTMLDivElement;

  public barWidth: string;

  handleIconClick(idx: number) {
    if (this.state.isCollapsed) {
      this.props.onOpenChangeBefore && this.props.onOpenChangeBefore('open');
      this.renderReason = 'open';
    }

    this.setState({ selectKey: idx, isCollapsed: false });
  }

  renderIconBar(c: React.ReactElement<IPanelProps>, i: number) {
    const { icon, title } = c.props;
    return (
      <li className={classNames(
        { bright: !this.state.isCollapsed && this.state.selectKey === i })}
        onClick={() => this.handleIconClick(i)}>
        <span className={icon}>{typeof (icon) === 'undefined' && title}</span>
      </li>
    );
  }

  collapsePanel(event: React.MouseEvent<HTMLElement>) {
    this.props.onOpenChangeBefore && this.props.onOpenChangeBefore('close');
    this.renderReason = 'close';
    this.setState({ isCollapsed: true });
  }

  renderPanel(c: React.ReactElement<IPanelProps>, i: number) {
    let newProps = {
      collapse: this.collapsePanel,
      isShow: i === this.state.selectKey
    };
    return React.cloneElement(c, newProps as IPanelProps);
  }

  afterAnimation(timeStamp: number) {
    if (startTime === INITIAL_START_TIME) {
      startTime = timeStamp;
    }
    if (timeStamp - startTime > ANIMATION_TIME) {
      this.props.onOpenChangeAfter(this.renderReason as OpenState);
      this.renderReason = 'other';
      startTime = INITIAL_START_TIME;
    } else {
      window.requestAnimationFrame(this.afterAnimation.bind(this));
    }
  }

  componentDidMount() {
    const style = document.defaultView.getComputedStyle(this.barNode, null);
    this.barWidth = style.width;
  }

  componentDidUpdate() {
    const onOpenChangeAfter = this.props.onOpenChangeAfter;
    if (this.renderReason !== 'other' && onOpenChangeAfter) {
      window.requestAnimationFrame(this.afterAnimation.bind(this));
    }
  }

  render() {
    const { height, children, mode, className } = this.props;
    const width = this.state.isCollapsed ? this.barWidth : this.props.width;
    const sidebarCls = classNames('sidebar_container', className, {
      'sidebar_container_right': mode === 'right'
    });

    return (
      <div style={{ width: width, minWidth: width, height: height }} className={sidebarCls}>
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