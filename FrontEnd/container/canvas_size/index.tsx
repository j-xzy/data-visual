import * as React from 'react';
import DoubleInput from '@components/double-input';
import { CanvasSizeType, IChangeCanvasSize } from '@pages/studio';

const Input = DoubleInput.Input;

interface IProps {
  canvasSize: CanvasSizeType;
  onCanvasSizeChange: IChangeCanvasSize;
}

export default class CanvasSize extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
  }

  shouldComponentUpdate(nextProps: IProps) {
    const { canvasSize: { width, height } } = nextProps;
    const { canvasSize: { width: lastWidth, height: lastHeight } } = this.props;
    return width !== lastWidth || height !== lastHeight;
  }

  handleWidthChange(width: number) {
    this.props.onCanvasSizeChange(width, this.props.canvasSize.height);
  }

  handleHeightChange(height: number) {
    this.props.onCanvasSizeChange(this.props.canvasSize.width, height);
  }

  render() {
    const { canvasSize: { width, height } } = this.props;
    return (
      <DoubleInput>
        <Input name='宽度' value={width} onChange={(value) => this.handleWidthChange(value)} />
        <Input name='长度' value={height} onChange={(value) => this.handleHeightChange(value)} />
      </DoubleInput>
    );
  }
}