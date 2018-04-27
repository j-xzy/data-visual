import * as React from 'react';
import Panel from './panel';
import { Mode } from '@container/draggable-split';

type Size = {
  width?: string;
  height?: string;
};

interface IState {
  firstPanelMode: Mode | 'none';
  secondtPanelMode: Mode | 'none';
  firstPanelSize: Size;
  secondPanelSize: Size;
}

interface IProps {
  mode: Mode | 'none';
}

const baseStyle: React.CSSProperties = {
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%'
};

export default class SplitContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleFirstDrop = this.handleFirstDrop.bind(this);
    this.handleSecondDrop = this.handleSecondDrop.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.state = {
      firstPanelMode: 'none',
      secondtPanelMode: 'none',
      firstPanelSize: { width: '100%', height: '100%' },
      secondPanelSize: { width: '100%', height: '100%' }
    };
  }

  isOnChangeSize = false;
  elRef: React.RefObject<HTMLDivElement> = React.createRef();

  handleFirstDrop(mode: Mode) {
    this.setState({
      firstPanelMode: mode
    });
  }

  handleSecondDrop(mode: Mode) {
    this.setState({
      secondtPanelMode: mode
    });
  }

  handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (e.buttons !== 1 || !this.isOnChangeSize) {
      this.isOnChangeSize = false;
      return;
    }
    let x = e.clientX, y = e.clientY;
    let rect = this.elRef.current.getBoundingClientRect();
    let width = rect.width, height = rect.height,
      top = rect.top, left = rect.left;

    if (this.props.mode === 'horizontal') {
      let ratio = (y - top) / height * 100;
      this.setState({
        firstPanelSize: { height: ratio + '%' },
        secondPanelSize: { height: 100 - ratio + '%' }
      });
    } else {
      let ratio = (x - left) / width * 100;
      this.setState({
        firstPanelSize: { width: ratio + '%' },
        secondPanelSize: { width: 100 - ratio + '%' }
      });
    }
  }

  handleDown() {
    this.isOnChangeSize = true;
  }

  static getDerivedStateFromProps(nextProps: IProps) {
    let size: any = {};
    nextProps.mode === 'horizontal' ? size.height = '50%' : size.width = '50%';
    return {
      firstPanelSize: { ...size },
      secondPanelSize: { ...size }
    };
  }

  render(): JSX.Element {
    let { mode } = this.props;
    let { firstPanelSize, secondPanelSize, firstPanelMode, secondtPanelMode } = this.state;

    let flexDirection: any = mode === 'horizontal' ? 'column' : 'row';

    let middleStyle: React.CSSProperties = {
      position: 'absolute',
      height: 20,
      width: 20,
      background: 'rgba(255,0,0,0.5)',
      top: '0px',
      left: '0px'
    };

    let rect = this.elRef.current ? this.elRef.current.getBoundingClientRect() : { width: '100%', height: '100%' };
    if (mode === 'horizontal') {
      middleStyle.top = firstPanelSize.height;
      middleStyle.width = rect.width;
    } else {
      middleStyle.left = firstPanelSize.width;
      middleStyle.height = rect.height;
    }
    return (
      <div onMouseMove={this.handleMove} ref={this.elRef} style={{ ...baseStyle, flexDirection }} >
        <Panel size={firstPanelSize} borderType={mode === 'vertical' ? 'right' : 'bottom'}
          onDrop={this.handleFirstDrop}>
          {firstPanelMode !== 'none' && <SplitContainer mode={firstPanelMode} />}
        </Panel>
        <MiddleLine style={middleStyle} onDown={this.handleDown} />
        <Panel size={secondPanelSize}
          onDrop={this.handleSecondDrop}>
          {secondtPanelMode !== 'none' && <SplitContainer mode={secondtPanelMode} />}
        </Panel>
      </div>
    );
  }
}

interface IMiddleLineProps {
  onDown: () => void;
  style: React.CSSProperties;
}

function MiddleLine(props: IMiddleLineProps) {
  return (
    <div onMouseDownCapture={props.onDown} style={{ ...props.style, zIndex: 800 }}></div>
  );
}