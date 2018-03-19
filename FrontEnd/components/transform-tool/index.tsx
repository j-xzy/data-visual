import * as React from 'react';
import './style.styl';

export enum SideType { LeftTop, Top, RightTop, Right, RightBottom, Bottom, LeftBottom, Left, Middle, None }

interface ITransformProps {
  position: {
    top: number;
    left: number;
  };
  size: {
    width: number;
    height: number;
  };
  handleTransformMouseDown: (e: React.MouseEvent<HTMLDivElement>, type: SideType) => void;
}

export class TransformTool extends React.Component<ITransformProps, undefined> {
  constructor(props: ITransformProps) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  handleMouseDown(e: React.MouseEvent<HTMLDivElement>, type: SideType) {
    e.stopPropagation();
    this.props.handleTransformMouseDown(e, type);
  }

  render() {
    const { position: { left, top }, size: { width, height } } = this.props;
    return (
      <div className='transform_tool' style={{ left: left + 'px', top: top + 'px', width: width + 'px', height: height + 'px' }}
        onMouseDown={(e) => this.handleMouseDown(e, SideType.Middle)}
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