import * as React from 'react';
import './style.styl';
import { IMoveTransformTool } from '@components/canvas';

interface ITransformProps {
  position: {
    top: string;
    left: string;
  };
  size: {
    width: string;
    height: string;
  };
  moveTransformTool: IMoveTransformTool;
}

export enum SideType { LeftTop, Top, RightTop, Right, RightBottom, Bottom, LeftBottom, Left, Middle }

export class TransformTool extends React.Component<ITransformProps, undefined> {
  constructor(props: ITransformProps) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  isMouseDown = false;
  currentSide: SideType;

  handleMouseDown(e: React.MouseEvent<HTMLDivElement>, type: SideType) {
    e.stopPropagation();
    this.isMouseDown = true;
    this.currentSide = type;
  }

  handleMouseUp(e: React.MouseEvent<HTMLDivElement>) {
    this.isMouseDown = false;
  }

  handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (!this.isMouseDown) return;
    const position = {
      x: e.clientX,
      y: e.clientY
    };
    this.props.moveTransformTool(this.currentSide, position);
  }

  render() {
    let { position: { top, left }, size: { width, height } } = this.props;
    left = parseFloat(left) - parseFloat(width) / 2 + 'px',
      top = parseFloat(top) - parseFloat(height) / 2 + 'px';
    const style = { top, left, width, height };
    return (
      <div className='transform_tool' style={style}
        onMouseDown={(e) => this.handleMouseDown(e, SideType.Middle)}
        onMouseUp={(e) => this.handleMouseUp(e)}
        onMouseMove={(e) => this.handleMouseMove(e)}
      >
        <div className='left-top' onMouseDown={(e) => this.handleMouseDown(e, SideType.LeftTop)}></div>
        <div className='top' onMouseDown={(e) => this.handleMouseDown(e, SideType.Top)}></div>
        <div className='right-top' onMouseDown={(e) => this.handleMouseDown(e, SideType.RightTop)}></div>
        <div className='right' onMouseDown={(e) => this.handleMouseDown(e, SideType.Right)}></div>
        <div className='right-bottom' onMouseDown={(e) => this.handleMouseDown(e, SideType.RightBottom)}></div>
        <div className='bottom' onMouseDown={(e) => this.handleMouseDown(e, SideType.Bottom)}></div>
        <div className='left-bottom' onMouseDown={(e) => this.handleMouseDown(e, SideType.LeftBottom)}></div>
        <div className='left' onMouseDown={(e) => this.handleMouseDown(e, SideType.Left)}></div>
      </div>);
  }
}